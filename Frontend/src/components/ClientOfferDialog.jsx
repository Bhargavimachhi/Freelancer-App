import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download } from "lucide-react";




export const ClientOfferDialog = ({ offer, isOpen, onClose,project,freelancer }) => {
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

  const handlePayment = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/${offer._id}/pay`);
     console.log(res.data);
     alert("Payment is done..");
     onClose();
     window.location.reload();

      
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleAcceptSubmission = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/${offer._id}/approve`);
      console.log(res.data);
      alert("Approved the work.. Marking project has complete.");
      onClose();
      window.location.reload();
      
    } catch (error) {
      console.error("Failed to accept submission:", error);
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
              <h3 className="font-semibold mb-2">Freelancer</h3>
              <p>{freelancer.name}</p>
              <p className="text-sm text-muted-foreground">{freelancer.email}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Offer Amount</h3>
              <p className="text-lg font-medium">{offer.amount}</p>
            </div>

           

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
          </div>

          {offer.status === "accepted" && (
            <Button className="w-full" onClick={handlePayment}>
              <Wallet className="w-4 h-4 mr-2" />
              Pay Now {offer.amount}
            </Button>
          )}

          {offer.status === "submitted" && (
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleAcceptSubmission}>
                Accept & Complete
              </Button>
              
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

