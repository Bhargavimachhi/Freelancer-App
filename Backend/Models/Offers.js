import mongoose from "mongoose";

let OfferSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  FreelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  CollaboratorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  ProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "collaborator_approval_pending",
      "pending",
      "accepted",
      "declined",
      "work_in_progress",
      "submitted",
      "completed",
    ],
    default: "pending",
  },

  submission: {
    files: [{ public_id: String, url: String }],
    note: { type: String, default: "" },
  },
  description: {
    type: String,
    default: null,
  },
});

export const Offers = mongoose.model("Offers", OfferSchema);
