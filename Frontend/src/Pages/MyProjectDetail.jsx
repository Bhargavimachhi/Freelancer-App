import React from 'react';
import { useState,useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadinPage from '@/components/LoadingPage';
import ProposalCard from '@/components/ProposalCard';



const MyProjectDetail = () => {


  const {id} = useParams();
  const projectid = id;
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [project1,setproject1] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProposals, setAllProposals] = useState([]);
  const [shortlistedProposals, setShortlistedProposals] = useState([]); 

 

   useEffect(() => {
          if (isLoaded && user) {
            setUserId(user.id);
           
          }
        }, [isLoaded, user]);

        useEffect(() =>
           {
          const fetchproject = async () =>{
   
           if (userId) {
               let res = await axios.get(`http://localhost:3000/project/${projectid}`, {
                 Clerk_id: userId
               });
               setproject1(res.data.project);
               console.log(res.data.project);
             

               const res2 = await axios.get(`http://localhost:3000/user/${res.data.project.createdBy}`);
               console.log(res2.data.user);
               
               setCreatedBy(res2.data.user);

              
               setLoading(false);
             }
   
          }
       
           fetchproject();
       
           // return () => chatClient.disconnectUser();
         }, [userId]);


         useEffect(() => {
          const fetchProposals = async () => {
            if (project1) {
              const proposals = await Promise.all(
                project1.proposals.map(async (proposalId) => {
                  const res = await axios.get(`http://localhost:3000/proposal/${proposalId}`);
                  return res.data.proposal;
                })
              );
      
              setAllProposals(proposals.filter((proposal) => !proposal.isShortListed));
              setShortlistedProposals(proposals.filter((proposal) => proposal.isShortListed));
            
            }
          };
      
          fetchProposals();
        }, [project1]);
        

  const openPDF = (publicId) => {
    const url = `https://res.cloudinary.com/dktw0yum9/image/upload/${publicId}.pdf`;
    window.open(url, '_blank');
  };

  if(loading) {
    return <LoadinPage />
  }

 


 


  return (
    <div className="container mx-auto py-8 px-4">
      {/* Main Project Card */}
      {project1 ? (

        <>
         <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{project1.title}</CardTitle>
              <CardDescription className="mt-2">Posted on {Date(project1.postedOn).toString().split("GMT")[0]}</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">&#8377;{project1.price}</p>
              <Badge className="ml-2 capitalize">{project1.experienceLevel}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Project Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Project Description</h3>
              <p className="mb-6">{project1.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project1.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
             
              
              {project1.questions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Screening Questions</h3>
                  <ul className="list-disc pl-6">
                    {project1.questions.map((question, index) => (
                      <li key={index} className="mb-1">{question}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project1?.file && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                  <Button variant="outline" onClick={()=>{
                    openPDF(project1.file)
                  }} className="flex items-center gap-2" >
                    <span className="text-lg">📄</span>
                    <span>{project1.file}</span>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Right Column - Client Info */}
            <div className="w-full md:w-64 shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About the Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    { createdBy?.image &&
                    <Avatar>
                      <AvatarImage src={createdBy.image} alt={createdBy.name} />
                      <AvatarFallback>{createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>}
                    <div>
                      {createdBy?.name && <p className="font-medium">Name : {createdBy.name}</p>}
                      {createdBy?.title && <p className="text-sm text-muted-foreground">{createdBy.title}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {createdBy?.rating && 
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-medium">⭐ {createdBy.rating}/5</span>
                    </div>}

                    { createdBy?.projectsPosted &&
                    <div className="flex justify-between">
                      <span>Projects Posted:</span>
                      <span className="font-medium">{createdBy.projectsPosted}</span>
                    </div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* Fix: Changed to regular Button that opens the dialog via state */}
        
        </CardFooter>
      </Card>

      <div>
    <h2 className="text-2xl font-bold mb-4">Proposals ({project1.proposals.length})</h2>
    
    <Tabs defaultValue="all" className="mb-8">
      <TabsList>
        <TabsTrigger value="all">All Proposals</TabsTrigger>
        <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
      </TabsList>

      {allProposals && shortlistedProposals ? (<>
        <TabsContent value="all" className="space-y-4 mt-4">
        {allProposals.length > 0 ? (
                  allProposals.map((proposal) => (
                    <ProposalCard key={proposal._id} id={proposal._id} clientid={createdBy._id} projectid={project1._id} amount={project1.price} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No shortlisted proposals yet</p>
                )}
      
      </TabsContent>
      <TabsContent value="shortlisted" className="space-y-4 mt-4">
                {shortlistedProposals.length > 0 ? (
                  shortlistedProposals.map((proposal) => (
                    <ProposalCard key={proposal._id} id={proposal._id} clientid={createdBy._id} projectid={project1._id} amount={project1.price}  />
                  ))
                ) : (
                  <p className="text-muted-foreground">No shortlisted proposals yet</p>
                )}
              </TabsContent>
      
      
      </>):(<></>)}
      
     
      
      
    </Tabs>
  </div>
     



        
        </>
      ) : (
        <>
        <h1> No project found with this id..</h1>
        </>

       
      )}

      {/* Proposals Section */}
     
      
      {/* Submit Proposal Dialog */}
      
    </div>
  );
};

export default MyProjectDetail;

