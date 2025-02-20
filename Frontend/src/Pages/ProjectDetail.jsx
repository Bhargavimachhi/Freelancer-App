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



const ProjectDetailPage = () => {


  const id = useParams();
  const projectid = id.id;
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [project1,setproject1] = useState(null);

  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [answers, setAnswers] = useState([]);
 

   useEffect(() => {
          if (isLoaded && user) {
            setUserId(user.id);
            console.log(user.id);
           
          }
        }, [isLoaded, user]);

        useEffect(() => {
          const fetchproject = async () =>{
   
           if (userId) {
               const res = await axios.get(`http://localhost:3000/project/${projectid}`, {
                 Clerk_id: userId
               });
               console.log(res.data.project);
               setproject1(res.data.project);
             }
   
          }
       
           fetchproject();
       
           // return () => chatClient.disconnectUser();
         }, [userId]);
        
  
  // Example project data based on your schema
  const project = {
    title: "E-commerce Website Development with React and Node.js",
    description: "Looking for an experienced full-stack developer to build a complete e-commerce platform. The site should include product listings, user authentication, shopping cart, payment integration with Stripe, and an admin dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Full-stack"],
    questions: [
      "How many years of experience do you have with React?",
      "Have you integrated Stripe payment before?",
      "Can you provide examples of e-commerce sites you've built?"
    ],
    experienceLevel: "expert",
    price: 2500,
    file: "project-requirements.pdf",
    createdAt: "2025-02-15",
    // Project creator info
    createdBy: {
      _id: "user123",
      name: "Sarah Johnson",
      title: "Marketing Director at TechBrand",
      image: "/api/placeholder/40/40",
      rating: 4.8,
      projectsPosted: 12
    },
   
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/project/${projectid}/add-proposal`, {
        description: coverLetter,
        price: bidAmount,
        answers: answers,
        Clerk_id: userId
      });
      console.log(res.data);

      // Reset states
      setCoverLetter('');
      setBidAmount('');
      setDeliveryTime('');
      setAnswers([]);

      // Close dialog
      setIsProposalDialogOpen(false);

      // Show alert
      alert('Proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    }

    
  };
  const openPDF = (publicId) => {
    const url = `https://res.cloudinary.com/dktw0yum9/image/upload/${publicId}.pdf`;
    window.open(url, '_blank');
  };


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
              <CardDescription className="mt-2">Posted on {project1.createdAt}</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${project1.price}</p>
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
              
              {project.file && (
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
                    <Avatar>
                      <AvatarImage src={project.createdBy.image} alt={project.createdBy.name} />
                      <AvatarFallback>{project.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.createdBy.name}</p>
                      <p className="text-sm text-muted-foreground">{project.createdBy.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-medium">⭐ {project.createdBy.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects Posted:</span>
                      <span className="font-medium">{project.createdBy.projectsPosted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Member Since:</span>
                      <span className="font-medium">Jan 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* Fix: Changed to regular Button that opens the dialog via state */}
          <Button size="lg" className="w-full md:w-auto" onClick={() => setIsProposalDialogOpen(true)}>
            Submit a Proposal
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Submit a Proposal</DialogTitle>
            <DialogDescription>
              Tell the client why you're the best fit for this project
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter</Label>
              <Textarea id="cover-letter" value={coverLetter} onChange={
                (e) => setCoverLetter(e.target.value)
              } rows={6} placeholder="Introduce yourself and explain why you're qualified for this project..."  />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bid-amount">Your Bid (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <input 
                    id="bid-amount" 
                    type="number" 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-time">Delivery Time</Label>
                <select 
                  id="delivery-time" 
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="3 weeks">3 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Answer Screening Questions</Label>
              {project1.questions.map((question, index) => (
                <div key={index} className="mt-4">
                  <p className="mb-2 font-medium">{question}</p>
                  <Textarea 
                    rows={3} 
                    placeholder="Your answer..." 
                    value={answers[index] || ''}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                </div>
              ))}
             
            </div>
          </div>
          
          <DialogFooter>
          <Button variant="outline" onClick={() => setIsProposalDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



        
        </>
      ) : (
        <>
        <h1> No project found with this id..</h1>
        </>

       
      )}

      {/* Proposals Section */}
      {/* <div>
        <h2 className="text-2xl font-bold mb-4">Proposals ({project.proposals.length})</h2>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Proposals</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            {project.proposals.map((proposal) => (
              <Card key={proposal._id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={proposal.freelancer.image} alt={proposal.freelancer.name} />
                        <AvatarFallback>{proposal.freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{proposal.freelancer.name}</h3>
                        <p className="text-sm text-muted-foreground">{proposal.freelancer.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${proposal.price}</p>
                      <p className="text-sm text-muted-foreground">Delivery: {proposal.timeline}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{proposal.coverLetter}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span>Rating:</span>
                      <span className="font-medium">⭐ {proposal.freelancer.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Completed Projects:</span>
                      <span className="font-medium">{proposal.freelancer.completedProjects}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Submitted:</span>
                      <span className="font-medium">{proposal.submittedAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline">Message</Button>
                  <Button>Hire Freelancer</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="shortlisted" className="h-40 flex items-center justify-center">
            <p className="text-muted-foreground">No shortlisted proposals yet</p>
          </TabsContent>
        </Tabs>
      </div>
       */}
      {/* Submit Proposal Dialog */}
      
    </div>
  );
};

export default ProjectDetailPage;

