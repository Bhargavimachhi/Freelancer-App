import {Offers}  from "../Models/Offers.js";
import { User } from "../Models/User.js";
import Pusher from "pusher";


const pusher = new Pusher({
  appId: "1947940",
  key: "97f4daf56e0efc37b28d",
  secret: "0397303033d8667c132f",
  cluster: "ap2",
  useTLS: true
});
const triggerOfferUpdate = (offerId, state) => {
  pusher.trigger("offers", "offer-updated", { offerId, state });
};

export const CreateOffer = async (req,res) =>{

    try{

        const { clientId, FreelancerId, ProjectId, amount } = req.body;
      
        const newOffer = new Offers({clientId, FreelancerId, ProjectId, amount});
        await newOffer.save();
        triggerOfferUpdate(newOffer._id, "pending");
      
        return res.status(200).json({
          newOffer
        });
      }

       catch(error){
        console.log(error);
       }

};

export const AcceptOffer = async (req,res)=>{

    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"accepted"
      },
    {new:true});
    triggerOfferUpdate(updatedoffer._id, "accepted");
    
    return res.status(200).json({
      updatedoffer
    });

};

export const DeclineOffer = async (req,res)=>{
    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"declined"
      },
    {new:true});
    triggerOfferUpdate(updatedoffer._id, "declined");
    
    return res.status(200).json({
      updatedoffer
    });


};

export const PayOffer = async (req,res) =>{

    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"work_in_progress"
      },
    {new:true});
    triggerOfferUpdate(updatedoffer._id, "work_in_progress");
    // Update the freelancer pending_amount state and withdrawel state
    const freelancer = await User.findOne({
      _id: updatedoffer.FreelancerId
    });
    const newpendingamount = freelancer.pending_amount + updatedoffer.amount;

    const updatedpendingamount = await User.findOneAndUpdate(updatedoffer.FreelancerId,{
      pending_amount: newpendingamount
    });

    return res.status(200).json({
      updatedoffer
    });

};

export const sumbitwork = async (req,res)=>{
    const {files,notes} = req.body;

    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
      submission:{
        files:files,
        note: notes
      },
      status:"submitted"
    },
  {new:true});

  triggerOfferUpdate(updatedoffer._id, "submitted");
  return res.status(200).json({
    updatedoffer
  });

};
export const approvework = async (req,res)=>{
    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"completed"
      },
    {new:true});
    triggerOfferUpdate(updatedoffer._id, "completed");
    // 
    const freelancer = await User.findOne({
      _id: updatedoffer.FreelancerId
    });
    const newpendingamount = freelancer.pending_amount - updatedoffer.amount;
    const newwithdrawelamount = freelancer.withdrawable_amount + updatedoffer.amount;

    const updatedpendingamount = await User.findOneAndUpdate(updatedoffer.FreelancerId,{
      pending_amount: newpendingamount,
      withdrawable_amount:newwithdrawelamount
    });

    
    return res.status(200).json({
      message:"Work approved very nice",
      updatedoffer
    });
}

export const getAllOffersOfClient = async(req,res) => {
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id:id
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    clientId: userid
    
  });
  return res.status(200).json({
    alloffers
  });
};

export const getAllOffersOfFreelancer = async(req,res) => {
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id:id
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    FreelancerId: userid
    
  });
  return res.status(200).json({
    alloffers
  });
};