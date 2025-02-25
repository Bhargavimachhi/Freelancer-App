import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"

import Pusher from "pusher-js";
import { useState,useEffect } from "react";
import axios from "axios";
import FreelancerOfferDialog from "./FreelancerOfferDialog";


export function OfferCard({ offer}) {

    const [project, setProject] = useState(null);
      const [client, setclient] = useState(null);
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [offerState, setOfferState] = useState(offer.status);
      
        useEffect(() => {
         
          const pusher = new Pusher("97f4daf56e0efc37b28d", {
            cluster: "ap2",
          });
      
          
          const channel = pusher.subscribe("offers");
      
        
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
            setProject(res.data.project);
          } catch (error) {
            console.error("Error fetching project:", error);
          }
        };
    
        const fetchUser = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/user/${offer.
clientId}`);
            setclient(res.data.user);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
    
        fetchUser();
        fetchProject();
      }, [offer.ProjectId, offer.clientId]);
  const statusColors = {
    pending: "bg-yellow-500",
    accepted: "bg-blue-500",
    waiting_for_payment: "bg-orange-500",
    declined: "bg-red-500",
    work_in_progress: "bg-purple-500",
    submitted: "bg-orange-500",
    completed: "bg-green-500",
  }

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

    {project && client ? (
        <>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow mt-5" onClick={()=>setIsDialogOpen(true)} >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground">by {client.name}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={statusColors[offerState]}>{offerState.replace(/_/g, " ")}</Badge>
              {offer.status === "waiting_for_payment" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  Awaiting Payment
                </Badge>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-lg">{offer.amount}</p>
          </div>
        </CardContent>
      </Card>

       <FreelancerOfferDialog
              offer={offer}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onPayment={handlePayment}
              onAcceptSubmission={handleAcceptSubmission}
              project={project}
              client={client}
            />
        
        </>


    ):(
        <h1>Loading..</h1>
        
        )}

</>
  
  )
}
