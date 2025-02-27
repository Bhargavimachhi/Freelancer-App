import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/Context/UserContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function ProfileData() {
  const { userData } = useUserContext();
  const {user} = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handlewithdraw = async (amount) =>{

    const res = await axios.post("http://localhost:3000/Payout",{
      userid: userData._id,
      amount:amount
    });
    console.log(res.status);
    if(res.status === 200){
      toast.success("Your Payout is being processed.It will be redirected to your account in few days.");
      window.location.reload();
    }
    else{
      toast.error("Error in payout.")
    }

  }
  const handleDialogSubmit = () => {
    handlewithdraw(withdrawAmount);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flow-root">
      <div className="flex flex-col items-center justify-start gap-2 sm:items-start sm:flex-row float-left">
        <div>
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage
              src={
                user?.hasImage
                  ? user?.imageUrl
                  : "https://github.com/shadcn.png"
              }
              alt="Profile picture"
            />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center sm:text-start">
          <h1 className="text-2xl font-semibold">{userData?.fullName}</h1>
          <p className="text-sm">
            {userData?.email}
          </p>
          <p className="mt-1 text-sm">
            {/* temporary skills */}
            Front-end | React JS | Node JS | CE student @GEC-Gn
          </p>
          <div className="flex items-center justify-center gap-2 mt-1 text-sm sm:justify-start">
            <span>Gandhinagar, Gujarat, India</span>
            <Button variant="link" className="h-auto p-0 text-primary">
              Contact info
            </Button>
          </div>
        </div>
      </div>

      <div className="float-right ">
        <Card className="w-[350px] p-3">
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Pending_amount</CardTitle>
                <div className="flex">
                  <Wallet className="mr-2" /> &#8377;{" "}
                  {userData?.pending_amount}
                </div>
              </div>
            </div>
            <hr />
            <div className="grid w-full items-center gap-4 mt-3">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Withdrawable Amount</CardTitle>
                <div className="flex">
                  <Wallet className="mr-2" /> &#8377; {userData?.withdrawable_amount}
                </div>
                <Button variant="outline" onClick={()=> setIsDialogOpen(true)}>Withdraw Money</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 ">
            <Input
              type="number"
              placeholder="Enter amount to withdraw"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Withdraw</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
