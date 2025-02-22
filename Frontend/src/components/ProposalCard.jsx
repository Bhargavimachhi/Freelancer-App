import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import axios from 'axios';
import { Avatar,AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {toast} from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription,DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const ProposalCard = ({id,clientid,projectid,amount}) => {
  const navi = useNavigate();

 

    const [proposal,setproposal] = useState(null);
    const[user,setuser] = useState(null);
    const [showHireDialog,setShowHireDialog] = useState(false);


    useEffect(() => {
        const fetchProposal = async () => {
          const res = await axios.get(`http://localhost:3000/proposal/${id}`);
          console.log(res.data.proposal);
          setproposal(res.data.proposal);
        };
    
        fetchProposal();
      }, [id]);
    
      useEffect(() => {
        const fetchUser = async () => {
          if (proposal) {
            const res = await axios.get(`http://localhost:3000/getuserbyClerkID/${proposal.createdBy}`);
            console.log(res.data.requser);
            setuser(res.data.requser);
          }
        };
    
        fetchUser();
      }, [proposal]);
    console.log(id);



    const handleShortList = async ()=>{

      const res = await axios.put(`http://localhost:3000/shortListProposal/${proposal._id}`);
      if(res.data.message === "The proposal is shortlisted."){
        toast.success("Proposal is shortlisted");
          
      }

    }

    const handleHiring = async () =>{

      toast.loading("Starting the process..");
      console.log(
        clientid,user._id,projectid,amount
      )

      const res = await axios.post("http://localhost:3000/CreateOffer",{
        clientId:clientid,
        FreelancerId:user._id,
        ProjectId:projectid,
        amount: amount

      });
      if(res.data.newOffer){
        toast.success("New Offer is created..");
        navi("/myoffers");

      }

      
    }


  return (


    <>

    {proposal && user ? (<>

        <Card key={id} >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {/* <AvatarImage src={proposal.freelancer.image} alt={proposal.freelancer.name} /> */}
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        {/* <p className="text-sm text-muted-foreground">{proposal.freelancer.title}</p> */}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${proposal.price}</p>
                      <p className="text-sm text-muted-foreground">Delivery: 3d ays</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{proposal.description}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span>Rating:</span>
                      <span className="font-medium">⭐ {user.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Completed Projects:</span>
                      <span className="font-medium">{user.completedProjects}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Submitted:</span>
                      <span className="font-medium">{proposal.submittedAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline">Message</Button>
                  {/* <Button>Shortlist Freelancer</Button> */}
                  {proposal.isShortListed ? (
                    <Button onClick={()=>setShowHireDialog(true)}>Hire Freelancer</Button>
                  ) : (
                    <Button onClick={handleShortList}>Shortlist FreeLancer</Button>
                  )}

                  
                </CardFooter>
                <h1>Card</h1>
              </Card>
              <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Hiring</DialogTitle>
            <DialogDescription>
              Are you sure you want to hire this freelancer? This will start an offer process in the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHireDialog(false)}>
              Cancel
            </Button>
            <Button onClick={()=> handleHiring()} >Hire Freelancer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
    </>):(<>
    <h1> No projects found..</h1>
    
    </>)}


   

    
    
    
    </>

  )

};


export default ProposalCard