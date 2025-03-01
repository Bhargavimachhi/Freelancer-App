import { Offers } from "../Models/Offers.js";
import { Project } from "../Models/Project.js";
import { User } from "../Models/User.js";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1947940",
  key: "97f4daf56e0efc37b28d",
  secret: "0397303033d8667c132f",
  cluster: "ap2",
  useTLS: true,
});
const triggerOfferUpdate = (offerId, state) => {
  pusher.trigger("offers", "offer-updated", { offerId, state });
};

export const CreateOffer = async (req, res) => {
  const project = await Project.findById(req.body.ProjectId);

  if (!project) {
    return res.status(404).json({ message: "Project do not exist" });
  }
  try {
    if (req.body.CollaboratorId) {
      const newOffer = new Offers({
        ...req.body,
        status: "collaborator_approval_pending",
      });
      newOffer.submission.files = Array(project.milestones.length).fill(null);
      await newOffer.save();
      triggerOfferUpdate(newOffer._id, "collaborator_approval_pending");
      return res.status(200).json({
        newOffer,
      });
    } else {
      const newOffer = new Offers(req.body);
      newOffer.submission.files = Array(project.milestones.length).fill(null);
      await newOffer.save();
      triggerOfferUpdate(newOffer._id, "pending");
      return res.status(200).json({
        newOffer,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};

export const AcceptOffer = async (req, res) => {
  const updatedoffer = await Offers.findByIdAndUpdate(
    req.params.offerId,
    {
      status: "accepted",
    },
    { new: true }
  );
  triggerOfferUpdate(updatedoffer._id, "accepted");

  return res.status(200).json({
    updatedoffer,
  });
};

export const MakeOfferInPending = async (req, res) => {
  const offer = await Offers.findById(req.params.offerId);
  offer.status = "pending";
  await offer.save();
  triggerOfferUpdate(offer._id, "accepted");

  return res.status(200).json({
    offer,
  });
};

export const deleteOffer = async (req, res) => {
  try {
    await Offers.findByIdAndDelete(req.params.offerId);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeclineOffer = async (req, res) => {
  const updatedoffer = await Offers.findByIdAndUpdate(
    req.params.offerId,
    {
      status: "declined",
    },
    { new: true }
  );
  triggerOfferUpdate(updatedoffer._id, "declined");

  return res.status(200).json({
    updatedoffer,
  });
};

export const PayOffer = async (req, res) => {
  const updatedoffer = await Offers.findByIdAndUpdate(
    req.params.offerId,
    {
      status: "work_in_progress",
    },
    { new: true }
  );
  triggerOfferUpdate(updatedoffer._id, "work_in_progress");
  // Update the freelancer pending_amount state and withdrawel state
  const freelancer = await User.findOne({
    _id: updatedoffer.FreelancerId,
  });
  const newpendingamount = freelancer.pending_amount + updatedoffer.amount;

  const updatedpendingamount = await User.findOneAndUpdate(
    updatedoffer.FreelancerId,
    {
      pending_amount: newpendingamount,
    }
  );

  return res.status(200).json({
    updatedoffer,
  });
};

export const submitWorkOfOffer = async (req, res) => {
  try {
    const { fileUrl, index } = req.body;
    const { id } = req.params;
    const offer = await Offers.findById(id);
    console.log(offer);
    offer.submission.files[index] = { publicid: fileUrl, url: fileUrl };
    console.log(offer);
    await offer.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sumbitwork = async (req, res) => {
  const { files, notes } = req.body;

  const updatedoffer = await Offers.findByIdAndUpdate(
    req.params.offerId,
    {
      submission: {
        files: files,
        note: notes,
      },
      status: "submitted",
    },
    { new: true }
  );

  triggerOfferUpdate(updatedoffer._id, "submitted");
  return res.status(200).json({
    updatedoffer,
  });
};
export const approvework = async (req, res) => {
  const updatedoffer = await Offers.findByIdAndUpdate(
    req.params.offerId,
    {
      status: "completed",
    },
    { new: true }
  );
  triggerOfferUpdate(updatedoffer._id, "completed");
  //
  const freelancer = await User.findOne({
    _id: updatedoffer.FreelancerId,
  });
  const newpendingamount = freelancer.pending_amount - updatedoffer.amount;
  const newwithdrawelamount =
    freelancer.withdrawable_amount + updatedoffer.amount;

  const updatedpendingamount = await User.findOneAndUpdate(
    updatedoffer.FreelancerId,
    {
      pending_amount: newpendingamount,
      withdrawable_amount: newwithdrawelamount,
    }
  );

  return res.status(200).json({
    message: "Work approved very nice",
    updatedoffer,
  });
};

export const getAllOffersOfClient = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id: id,
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    clientId: userid,
  });
  return res.status(200).json({
    alloffers,
  });
};

export const getAllOffersOfFreelancer = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id: id,
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    $or: [{ FreelancerId: userid }, { CollaboratorId: userid }],
  });
  return res.status(200).json({
    alloffers,
  });
};
