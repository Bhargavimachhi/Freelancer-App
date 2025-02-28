import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader, Wallet } from "lucide-react";

import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import axios from "axios";
import FreelancerOfferDialog from "./FreelancerOfferDialog";
import { useUser } from "@clerk/clerk-react";

export function OfferCard({ offer }) {
  const { user } = useUser();
  const [project, setProject] = useState(null);
  const [client, setclient] = useState(null);
  const [freelancer, setFreelancer] = useState(null);
  const [collaborator, setCollaborator] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [offerState, setOfferState] = useState(offer.status);

  useEffect(() => {
    console.log(offer);
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
        const res = await axios.get(
          `http://localhost:3000/project/${offer.ProjectId}`
        );
        setProject(res.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/${offer.clientId}`
        );
        setclient(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchFreelancer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/clerk/${user.id}`
        );
        setFreelancer(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchCollaborator = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/${offer.CollaboratorId}`
        );
        setCollaborator(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    fetchProject();
    fetchFreelancer();
    if(offer.CollaboratorId) {
      fetchCollaborator();
    }
  }, [offer.ProjectId, offer.clientId]);
  const statusColors = {
    pending: "bg-yellow-500",
    accepted: "bg-blue-500",
    waiting_for_payment: "bg-orange-500",
    declined: "bg-red-500",
    work_in_progress: "bg-purple-500",
    submitted: "bg-orange-500",
    completed: "bg-green-500",
    collaborator_approval_pending: "bg-yellow-500"
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
      {project && client ? (
        <>
          <Card
            className="mt-5 transition-shadow cursor-pointer hover:shadow-lg"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.decription}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Offered by {client.name}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={statusColors[offerState]}>
                    {offerState.replace(/_/g, " ")}
                  </Badge>
                  {offer.status === "waiting_for_payment" && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Wallet className="w-3 h-3" />
                      Awaiting Payment
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">{offer.amount}</p>
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
            freelancer={freelancer}
          />
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
}
