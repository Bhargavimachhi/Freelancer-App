import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download } from "lucide-react";
import { ClientOfferDialog } from './ClientOfferDialog';
import Pusher from 'pusher-js';

const OfferCard = ({ offer }) => {
  const [project, setProject] = useState(null);
  const [freelancer, setFreelancer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [offerState, setOfferState] = useState(offer.status);

  useEffect(() => {
   
    const pusher = new Pusher("97f4daf56e0efc37b28d", {
      cluster: "ap2",
    });

    
    const channel = pusher.subscribe("offers");

    // Listen for offer updates
    channel.bind("offer-updated", (data) => {
      if (data.offerId === offer._id) {
        setOfferState(data.state);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [offer._id]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/project/${offer.ProjectId}`);
        console.log("this is project", res.data.project);
        setProject(res.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${offer.FreelancerId}`);
        console.log("This is the user", res.data);
        setFreelancer(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    fetchProject();
  }, [offer.ProjectId, offer.FreelancerId]);

  const statusColors = {
    pending: "bg-yellow-500",
    accepted: "bg-blue-500",
    waiting_for_payment: "bg-orange-500",
    declined: "bg-red-500",
    work_in_progress: "bg-purple-500",
    submitted: "bg-orange-500",
    completed: "bg-green-500",
  };

  const handlePayment = async (offerId) => {
    try {
      // Implement payment logic here
      console.log(`Payment for offer ${offerId}`);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleAcceptSubmission = async (offerId) => {
    try {
      // Implement accept submission logic here
      console.log(`Accept submission for offer ${offerId}`);
    } catch (error) {
      console.error("Failed to accept submission:", error);
    }
  };

  return (
    <>
      {project && freelancer ? (
        <>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsDialogOpen(true)}>
          <CardContent className="p-6 ">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground">by {freelancer.name}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={statusColors[offerState]}>{offerState.replace(/_/g, " ")}</Badge>
                {offer.status === "accepted" && offer.paymentStatus === "unpaid" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" />
                    Payment Required
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg">{offer.amount}</p>
              {offer.paymentStatus === "paid" && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Paid
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        <ClientOfferDialog
        offer={offer}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onPayment={handlePayment}
        onAcceptSubmission={handleAcceptSubmission}
        project={project}
        freelancer={freelancer}
      />
        </>
        
      ) : (
        <p>Loading...</p>
      )}

      
    </>
  );
};



export default OfferCard;