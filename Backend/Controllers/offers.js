import {Offers}  from "../Models/Offers.js";

export const CreateOffer = async (req,res) =>{

    try{

        const { clientId, FreelancerId, ProjectId, amount } = req.body;
      
        const newOffer = new Offers({clientId, FreelancerId, ProjectId, amount});
        await newOffer.save();
      
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
    
    return res.status(200).json({
      updatedoffer
    });

};

export const DeclineOffer = async (req,res)=>{
    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"declined"
      },
    {new:true});
    
    return res.status(200).json({
      updatedoffer
    });


};

export const PayOffer = async (req,res) =>{

    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"work_in_progress"
      },
    {new:true});
    
    return res.status(200).json({
      updatedoffer
    });

};

export const sumbitwork = async (req,res)=>{
    const {files,notes} = req.body;

    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
      submission:{
        files:files,
        notes: notes
      },
      status:"submitted"
    },
  {new:true});
  return res.status(200).json({
    updatedoffer
  });

};
export const approvework = async (req,res)=>{
    const updatedoffer = await Offers.findByIdAndUpdate(req.params.offerId,{
        status:"completed"
      },
    {new:true});
    
    return res.status(200).json({
      message:"Work approved very nice",
      updatedoffer
    });
}