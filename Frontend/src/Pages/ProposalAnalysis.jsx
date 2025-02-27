import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import {
  GiveBadpoints,
  GiveGoodpoints,
} from "../../../AIfunctions/AnalyzeProposal.js";
import { ScoreProposal } from "../../../AIfunctions/ScoreProposal.js";
import ProposalAnalysisPage from "@/components/ProposalAnalysis";
import LoadinPage from "@/components/LoadingPage.jsx";
import { useParams } from "react-router-dom";
import AskBadpoints from "../../../AIfunctions/AskQuestion.js";
import { Askgoodpoints } from "../../../AIfunctions/AskQuestion.js";
import { useUserContext } from "@/Context/UserContext.jsx";

export const ProposalAnalysis = () => {
  const { projectId, proposalId } = useParams();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [goodpoints, setgoodpoints] = useState(null);
  const [badpoints, setbadpoints] = useState(null);
  const [scoringjson, setscoringjson] = useState(null);
  const { getScoreDetails } = useUserContext();
  const [scoringCriteria, setScoringDetails] = useState(getScoreDetails());

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project/${projectId}`
        );
        // console.log(res.data.project);
        setSelectedProject(res.data.project);
      } catch (err) {
        console.log("Error fetching project", err);
      }
    };
    const fetchProposal = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/proposal/${proposalId}`
        );
        // console.log(res.data.proposal);
        setSelectedProposal(res.data.proposal);
      } catch (err) {
        console.log("Error fetching proposal", err);
      }
    };
    fetchProject();
    fetchProposal();
  }, []);

  useEffect(() => {
    handleCompare();
  }, [selectedProject, selectedProposal]);

  const handleCompare = async () => {
    if (!selectedProject || !selectedProposal) {
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/user/${selectedProposal.createdBy}`
      );
      const freelancer = res.data.user;

      const projectobject = {
        description: selectedProject.description,
        tags: selectedProject.tags,
        questions: selectedProject.questions,
        experienceLevel: selectedProject.experienceLevel,
        price: selectedProject.price,
      };
      const proposalobject = {
        price: selectedProposal.price,
        description: selectedProposal.description,
        answers: selectedProposal.answers,
      };
      const freelancerobject = {
        skills: freelancer.skills,
        aboutMe: freelancer.aboutMe,
        expertise: freelancer.expertise,
        rating: freelancer.rating,
      };

      const ans = await Askgoodpoints(
        projectobject,
        proposalobject,
        freelancerobject
      );

      const ans2 = await AskBadpoints(
        projectobject,
        proposalobject,
        freelancerobject
      );

      const ans3 = await ScoreProposal(
        projectobject,
        proposalobject,
        freelancerobject,
        scoringCriteria.skillMatch,
        scoringCriteria.experienceLevel,
        scoringCriteria.answeringCapabilities,
        scoringCriteria.pricing
      );

      setgoodpoints(ans);
      setbadpoints(ans2);
      setscoringjson(ans3);
    } catch (error) {
      console.error("Error comparing features:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadinPage />;
  }

  return (
    <>
      <ProposalAnalysisPage
        goodpoints={goodpoints}
        badpoints={badpoints}
        scoringjson={scoringjson}
      />
    </>
  );
};
