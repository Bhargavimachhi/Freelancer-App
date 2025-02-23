import React from 'react'
import {Card,CardContent,CardHeader,CardTitle} from "../components/ui/card";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "../components/ui/select";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import  {GiveBadpoints, GiveGoodpoints} from "../../../AIfunctions/AnalyzeProposal.js";
import {ScoreProposal} from "../../../AIfunctions/ScoreProposal.js";
import ProposalAnalysisPage from '@/components/ProposalAnalysis';

const AIFeature = () => {

    const {user,isLoaded} = useUser();

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [comparisonResult, setComparisonResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [goodpoints,setgoodpoints] = useState(null);
    const [badpoints,setbadpoints] = useState(null);
    const [scoringjson,setscoringjson] = useState(null);

     useEffect(() => {
            if (isLoaded && user) {
              setUserId(user.id);
              
            }
          }, [isLoaded, user]);


  
  
    useEffect(() => {
        if(userId){
      fetchProjects();
        }
    }, [userId]);
  
   
    useEffect(() => {
      if (selectedProject) {
        fetchProposals(selectedProject);
      }
    }, [selectedProject]);
  
    const fetchProjects = async () => {
      try {
       
        
        const res = await axios.get(`http://localhost:3000/user/${userId}/projects`);
        console.log(res.data);
        setProjects(res.data);
        console.log(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    const fetchProposals = async (projectId) => {
      try {
        console.log(projectId);
        const res = await axios.get(`http://localhost:3000/project/${projectId._id}/proposals`);
        console.log(res.data.proposals);
        setProposals(res.data.proposals);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
  
    const handleCompare = async () => {
      if (!selectedProject || !selectedProposal) return;
  
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/getuserbyClerkID/${selectedProposal.createdBy}`);
        const freelancer = res.data.requser;

        const projectobject = {
            description: selectedProject.description,
            tags: selectedProject.tags,
            questions: selectedProject.questions,
            experienceLevel:selectedProject.experienceLevel,
            price:selectedProject.price
        }
        const proposalobject = {
            price: selectedProposal.price,
            description: selectedProposal.description,
            answers: selectedProposal.answers
        }
        const freelancerobject = {
            skills : freelancer.skills,
            aboutMe: freelancer.aboutMe,
            expertise: freelancer.expertise,
            rating : freelancer.rating

        };

        const ans = await GiveGoodpoints(projectobject,proposalobject,freelancerobject);
        const ans2 = await GiveBadpoints(projectobject,proposalobject,freelancerobject);
        const ans3 = await ScoreProposal(projectobject,proposalobject,freelancerobject);
        setgoodpoints(ans);
        setbadpoints(ans2);
        setscoringjson(ans3);
        
        


      } catch (error) {
        console.error('Error comparing features:', error);
      } finally {
        setLoading(false);
      }
    };


  return (
    <>
    {projects.length > 0 ? (
      <>
         <Card className="w-full max-w-2xl mx-auto mt-8">
         <CardHeader>
           <CardTitle>AI Feature Comparison</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
           <div className="space-y-2">
             <label className="text-sm font-medium">Select Project</label>
             <Select value={selectedProject} onValueChange={setSelectedProject}>
               <SelectTrigger className="w-full">
                 <SelectValue placeholder="Choose a project" />
               </SelectTrigger>
               <SelectContent>
                 {projects.map((project) => (
                   <SelectItem key={project._id} value={project}>
                     {project.title}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>

           {proposals.length > 0 ? (

            <>
            <div className="space-y-2">
             <label className="text-sm font-medium">Select Proposal</label>
             <Select 
               value={selectedProposal} 
               onValueChange={setSelectedProposal}
               disabled={!selectedProject}
             >
               <SelectTrigger className="w-full">
                 <SelectValue placeholder="Choose a proposal" />
               </SelectTrigger>
               <SelectContent>
                 {proposals.map((proposal) => (
                   <SelectItem key={proposal._id} value={proposal}>
                     {proposal.description} by {proposal.createdBy}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
            
            </>


           ):(<>
           <h1> You have no proposals</h1>
           </>)}
   
           
   
           <Button 
             onClick={handleCompare}
             disabled={!selectedProject || !selectedProposal || loading}
             className="w-full"
           >
             {loading ? 'Comparing...' : 'Compare Features'}
           </Button> 
           {/* {comparisonResult && (
             <div className="mt-6 p-4 border rounded-lg">
               <h3 className="text-lg font-medium mb-2">Comparison Results</h3>
               <div className="space-y-2">
                
                 <pre className="whitespace-pre-wrap">
                   {JSON.stringify(comparisonResult, null, 2)}
                 </pre>
               </div>
             </div>
           )} */}
         </CardContent>
       </Card>
       {goodpoints && badpoints && scoringjson ? (
         <ProposalAnalysisPage goodpoints={goodpoints} badpoints={badpoints} scoringjson={scoringjson}/>
       ) :(<></>)}
      
       </>
    ):(<></>)}
   
    <h1>Cards</h1>
    </>
  )
}

export default AIFeature