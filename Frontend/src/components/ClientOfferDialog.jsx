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
import { load } from "@cashfreepayments/cashfree-js";
import Pusher from "pusher-js";

export const ClientOfferDialog = ({
  offer,
  isOpen,
  onClose,
  project,
  freelancer,
}) => {
  const [cashfree, setCashfree] = useState(null);
  const [offerState, setOfferState] = useState(offer.status);

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
  useEffect(() => {
    const initializeSDK = async () => {
      const cashfreeInstance = await load({
        mode: "sandbox",
      });
      setCashfree(cashfreeInstance);
    };

    initializeSDK();
  }, []);

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
  const [orderId, setOrderId] = useState("");

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

  const getSessionId = async () => {
    try {
      console.log(offer.amount);
      let res = await axios.post("http://localhost:3000/payment", {
        amount: offer.amount,
      });

      if (res.data && res.data.payment_session_id) {
        console.log(res.data);
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyPayment = async () => {
    try {
      let res = await axios.post("http://localhost:3000/verify", {
        orderId: orderId,
      });

      if (res && res.data) {
        const res = await axios.put(`http://localhost:3000/${offer._id}/pay`);
        console.log(res.data);
        alert("Payment is done..");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (e) => {
    try {
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async (res) => {
        console.log("payment initialized");
        const res2 = await axios.put(`http://localhost:3000/${offer._id}/pay`);
        console.log(res2.data);
        alert("Payment is done..");
        onClose();
        window.location.reload();

        // verifyPayment(orderId)
      });
    } catch (error) {
      console.log("this is the error ", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl p-6 bg-white rounded-lg shadow-xl sm:max-w-2xl">
        {/* Header Section */}
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
            <span>Offer Details</span>
            <Badge
              className={`${statusColors[offerState]} px-3 py-1 text-sm text-white mr-10`}
            >
              {offerState.replace(/_/g, " ")}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Offer Information */}
        <div className="space-y-6">
          <div className="grid gap-5">
            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Project</h3>
              <p className="text-gray-700">{project.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                {project.description}
              </p>
            </div>

            {/* Freelancer Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Freelancer
              </h3>
              <p className="text-gray-700">{freelancer.name}</p>
              <p className="text-sm text-gray-500">{freelancer.email}</p>
            </div>

            {/* Offer Amount */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Offer Amount
              </h3>
              <p className="text-xl font-medium text-gray-900">
                ₹{offer.amount}
              </p>
            </div>

            {/* Submission Section (if available) */}
            {offer.submission &&
              (offerState === "submitted" || offerState === "completed") && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Submission
                  </h3>
                  <p className="mb-2 text-gray-700">{offer.submission.note}</p>
                  <div className="flex flex-wrap gap-2">
                    {offer.submission.files.map((file) => (
                      <Button
                        key={file.public_id}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border border-blue-500 hover:bg-blue-100"
                        onClick={() => window.open(file.url)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download File
                      </Button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Payment or Completion Actions */}
          {offerState === "accepted" && (
            <Button
              className="flex items-center justify-center w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={handleClick}
            >
              <Wallet className="w-5 h-5 mr-2" />
              Pay Now ₹{offer.amount}
            </Button>
          )}

          {offerState === "submitted" && (
            <div className="flex gap-2">
              <Button
                className="flex-1 py-3 text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleAcceptSubmission}
              >
                Accept & Complete
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
