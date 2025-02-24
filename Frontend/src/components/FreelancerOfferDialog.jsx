import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileUp, Download, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

const FreelancerOfferDialog = ({ offer, isOpen, onClose,project,client }) => {
  const [files, setFiles] = useState([]);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleStatusUpdate = async (newStatus) => {

    // Decline or accepted route par call.
    try {
      if(newStatus == "accepted"){
        const res = await axios.put(`http://localhost:3000/${offer._id}/accept`);
        console.log(res.data);
        toast.success("You have accepted the offer");
        onClose();
        window.location.reload();
      }
      else {
        const res = await axios.put(`http://localhost:3000/${offer._id}/decline`);
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
      const res = await axios.put(`http://localhost:3000/${offer._id}/sumbit`,{
        files:files,
        notes:note
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
          <DialogTitle className="flex justify-between items-center">
            <span>Offer Details</span>
            <Badge className={statusColors[offer.status]}>{offer.status.replace(/_/g, " ")}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Project</h3>
              <p>{project.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Client</h3>
              <p>{client.name}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Offer Amount</h3>
              <p className="text-lg font-medium">{offer.amount}</p>
            </div>

            {offer.status === "accepted" && (
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Waiting for client to make the payment. You will be notified once the payment is received.
                </AlertDescription>
              </Alert>
            )}

            {offer.submission && (offer.status === "submitted" || offer.status === "completed") && (
              <div>
                <h3 className="font-semibold mb-2">Submission</h3>
                <p className="text-sm mb-2">{offer.submission.note}</p>
                <div className="flex flex-wrap gap-2">
                  {offer.submission.files.map((file) => (
                    <Button key={file.public_id} variant="outline" size="sm" onClick={() => window.open(file.url)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download File
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {offer.status === "work_in_progress" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Submit Work</h3>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="mb-2"
                  />
                  <Textarea
                    placeholder="Add a note about your submission..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmission} disabled={!files.length || isSubmitting} className="w-full">
                  <FileUp className="w-4 h-4 mr-2" />
                  Submit Work
                </Button>
              </div>
            )}
          </div>

          {offer.status === "pending" && (
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => handleStatusUpdate("accepted")}>
                Accept Offer
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleStatusUpdate("declined")}>
                Decline Offer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreelancerOfferDialog;