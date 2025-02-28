import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileUp, Download, Wallet, Loader } from "lucide-react";
import toast from "react-hot-toast";
import Pusher from "pusher-js";

import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import emailjs from "emailjs-com";
import { useUserContext } from "@/Context/UserContext";
import { useUser } from "@clerk/clerk-react";

const FreelancerOfferDialog = ({
  offer,
  isOpen,
  onClose,
  project,
  client,
  freelancer,
}) => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerState, setOfferState] = useState(offer.status);
  const { userData } = useUserContext();

  useEffect(() => {
    setOfferState(offer.status);
  }, [offer.status]);

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

  if (!offer) return null;

  const statusColors = {
    pending: "bg-yellow-500",
    accepted: "bg-blue-500",
    waiting_for_payment: "bg-orange-500",
    declined: "bg-red-500",
    work_in_progress: "bg-purple-500",
    submitted: "bg-orange-500",
    completed: "bg-green-500",
  };

  const submitCollaborationProposal = async () => {
    try {
      const user = await axios.get(`http://localhost:3000/user/${offer.FreelancerId}`);
      const res = await axios.post(
        `http://localhost:3000/project/${offer.ProjectId}/add-proposal`,
        {
          Clerk_id : user.data.user.Clerk_id,
          helpedBy: offer.CollaboratorId,
          project : offer.ProjectId,
          description: offer.description,
          price: offer.amount,
        }
      );
      toast.success("Proposal submitted to client!");
      await axios.get(`http://localhost:3000/offer/${offer._id}/remove`);

      // Show alert
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit proposal. Please try again.");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const SERVICE_ID = "service_4qzbxi2";
    const TEMPLATE_ID = "template_n3jo95g";
    const PUBLIC_KEY = "1p_-mKLTByYumPQ9a";

    const templateParams = {
      email: freelancer.email,
      client_name: client.name,
      project_title: project.title,
      project_description: project.description,
      price: offer.amount,
      user: freelancer.name,
    };

    console.log(templateParams);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED to send email...", err);
      }
    );
  };

  const hireFreelancerForProject = async () => {
    try {
      await axios.get(
        `http://localhost:3000/project/${project._id}/freelancer/${freelancer._id}/hire`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    // Decline or accepted route par call.
    try {
      if (newStatus == "accepted") {
        const res = await axios.put(
          `http://localhost:3000/${offer._id}/accept`
        );
        console.log(res.data);
        toast.success("You have accepted the offer");

        onClose();
        window.location.reload();
      } else {
        const res = await axios.put(
          `http://localhost:3000/${offer._id}/decline`
        );
        console.log(res.data);
        toast.success("You have declined the offer");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSubmission = async () => {
    // Sumbit route par call
    if (!files.length) return;
    setIsSubmitting(true);
    try {
      const res = await axios.put(`http://localhost:3000/${offer._id}/sumbit`, {
        files: files,
        notes: note,
      });
      console.log(res.data);
      alert("You have sumbited your work");

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit work:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Offer Details</span>
            <Badge className={statusColors[offerState]}>
              {offerState.replace(/_/g, " ")}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <h3 className="mb-2 font-semibold">Project</h3>
              <p>{project.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Client</h3>
              <p>{client.name}</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Offer Amount</h3>
              <p className="text-lg font-medium">{offer.amount}</p>
            </div>

            {offerState === "accepted" && (
              <Alert>
                <Wallet className="w-4 h-4" />
                <AlertDescription>
                  Waiting for client to make the payment. You will be notified
                  once the payment is received.
                </AlertDescription>
              </Alert>
            )}

            {offer.submission &&
              (offerState === "submitted" || offerState === "completed") && (
                <div>
                  <h3 className="mb-2 font-semibold">Submission</h3>
                  <p className="mb-2 text-sm">{offer.submission.note}</p>
                  <div className="flex flex-wrap gap-2">
                    {offer.submission.files.map((file) => (
                      <Button
                        key={file.public_id}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(file.url)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download File
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            {offerState === "work_in_progress" && (
              <div className="space-y-4">
                {project?.milestones?.map((milestone, index) => {
                  return (
                    <>
                      <h1>
                        {" "}
                        <span>Milestone {index + 1} :</span> {milestone}
                      </h1>
                      <div>
                        {/* <h3 className="mb-2 font-semibold">Submit Work</h3> */}
                        <Input
                          type="file"
                          multiple
                          onChange={(e) =>
                            setFiles(Array.from(e.target.files || []))
                          }
                          className="mb-2"
                        />
                        <Textarea
                          placeholder="Add a note about your submission..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                        <Button>Submit Work</Button>
                      </div>
                    </>
                  );
                })}
                <Button
                  onClick={handleSubmission}
                  disabled={!files.length || isSubmitting}
                  className="w-full"
                >
                  <FileUp className="w-4 h-4 mr-2" />
                  Submit Work
                </Button>
              </div>
            )}
          </div>

          {offerState === "pending" && (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={(e) => {
                  hireFreelancerForProject();
                  handleStatusUpdate("accepted");
                }}
              >
                Accept Offer
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleStatusUpdate("declined")}
              >
                Decline Offer
              </Button>
            </div>
          )}

          {offerState === "collaborator_approval_pending" &&
            offer?.CollaboratorId == userData?._id && (
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    sendEmail(e);
                    submitCollaborationProposal();
                  }}
                >
                  Accept Offer
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleStatusUpdate("declined")}
                >
                  Decline Offer
                </Button>
              </div>
            )}

          {offer.status === "collaborator_approval_pending" &&
            offer?.CollaboratorId != userData?._id && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Loader className="w-3 h-3" />
                Waiting for Collaborator to Accept Offer
              </Badge>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreelancerOfferDialog;
