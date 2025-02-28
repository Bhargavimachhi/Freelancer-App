import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download } from "lucide-react";
import { ClientOfferDialog } from "./ClientOfferDialog";
import Pusher from "pusher-js";
import LoadingPage from "./LoadingPage";

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
        const res = await axios.get(
          `http://localhost:3000/project/${offer.ProjectId}`
        );
        console.log("this is project", res.data.project);
        setProject(res.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/${offer.FreelancerId}`
        );
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
    <section>
      {project && freelancer ? (
        <main className="p-4">
          <Card
            className="w-full transition-shadow bg-white border rounded-lg cursor-pointer border-btn hover:shadow-xl"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="relative w-full p-6 sm:static">
              {/* Header Section */}
              <div className="flex flex-col justify-between mb-4 sm:flex-row sm:items-center">
                {/* Project Details */}
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">Proposal Submitted by {freelancer.name}</p>
                </div>
                {/* Status Badges */}
                <div className="flex flex-col gap-2 mt-3 sm:items-end sm:mt-0">
                  <Badge
                    className={`${statusColors[offerState]} px-3 py-1 text-sm font-medium text-white absolute sm:static bottom-2 right-2`}
                  >
                    {offerState.replace(/_/g, " ")}
                  </Badge>
                  {offer.status === "accepted" &&
                    offer.paymentStatus === "unpaid" && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-3 py-1 text-red-500 border border-red-500 bg-red-100/30"
                      >
                        <Wallet className="w-4 h-4" />
                        Payment Required
                      </Badge>
                    )}
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <p className="flex gap-1 text-lg font-semibold text-gray-900">
                  <span className="text-text">Price :</span>
                  <span className="font-semibold text-btn">
                    &#8377;{offer.amount}
                  </span>
                </p>
                {offer.paymentStatus === "paid" && (
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-green-600 bg-green-100 border border-green-500"
                  >
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
        </main>
      ) : (
        <LoadingPage />
      )}
    </section>
  );
};

export default OfferCard;
