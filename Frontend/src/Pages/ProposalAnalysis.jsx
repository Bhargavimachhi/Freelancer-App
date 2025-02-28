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
import { AnalyseFlowchart } from "../../../AIfunctions/AnalyzeFlowchart.js";
import {GiveAnalysisofSRS} from "../../../AIfunctions/PDFFucntion.js";

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
  const [flowchart, setflowchart] = useState("");
  const [SRScontent,setSRScontent] = useState("");

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

      const filepath = `https://res.cloudinary.com/dktw0yum9/image/upload/v1740588194/${selectedProposal.file}.jpg`;
      try {
        const Flowcharans = await AnalyseFlowchart(filepath);
        if (Flowcharans) {
          setflowchart(Flowcharans);
        }
      } catch (err) {
        console.log(err);
      }

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
      const content = await GiveAnalysisofSRS(
        projectobject,
        "https://firebasestorage.googleapis.com/v0/b/videohosting-86bc3.appspot.com/o/images%2FExample%20pdf.pdf?alt=media&token=ddffda0e-23ff-4c87-8ccd-67ff0eec579d"
      );


      setgoodpoints(ans);
      setbadpoints(ans2);
      setscoringjson(ans3);
      // setSRScontent(content);
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
        Flowchartexplan={flowchart}
        content={SRScontent}
      />
    </>
  );
};
