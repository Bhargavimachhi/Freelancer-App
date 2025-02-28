import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Users, UserPlus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useUserContext } from "@/Context/UserContext";

export default function CollaborationDialog({ project }) {
  const [stakePercentage, setStakePercentage] = useState(0);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const { userData } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amount) {
      toast.error("Enter Amount");
      return;
    }
    if (!stakePercentage) {
      toast.error("Enter Your Stake Percenage out of 100");
      return;
    }
    if (stakePercentage < 0 || stakePercentage > 100) {
      toast.error("Your Stack Percentage Should be between 0 and 100");
      return;
    }
    if (!description) {
      toast.error("Enter Description");
      return;
    }
    try {
      let res;
      try {
        res = await axios.get(`http://localhost:3000/user/email/${email}`);
        if (res.status != 200) {
          toast.error("Email does not exist");
          return;
        }
      } catch (err) {
        toast.error("Email does not exist");
        return;
      }

      res = await axios.post(`http://localhost:3000/CreateOffer`, {
        clientId: project.createdBy,
        FreelancerId: userData._id,
        CollaboratorId: res.data.user._id,
        ProjectId: project._id,
        description: description,
        status: "collaborator_approval_pending",
        freelancerStack: stakePercentage,
        amount: amount
      });
      toast.success("Offer Generated to collaborator");
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate offer");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700 mr-4"
        >
          Collaborate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Project Collaboration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4 items-stretch">
            <TabsTrigger value="overview" className="mr-5">
              Overview
            </TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Skills Required</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, index) => {
                      return (
                        <Badge
                          key={index}
                          className="px-3 py-1 text-gray-800 bg-gray-200 rounded-md"
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {project.milestones.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      Milestones
                    </h3>
                    <ul className="pl-6 text-gray-700 list-disc">
                      {project.milestones.map((milestone, index) => (
                        <li key={index} className="mb-1">
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.questions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      Screening Questions
                    </h3>
                    <ul className="pl-6 text-gray-700 list-disc">
                      {project.questions.map((question, index) => (
                        <li key={index} className="mb-1">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Add Contributor
                </CardTitle>
                <CardDescription>
                  Enter Email of User you want to work with
                </CardDescription>
              </CardHeader>
              <form
                onSubmit={() => {
                  handleSubmit();
                }}
              >
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter Email Of User"
                      className="h-10"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    ></Input>
                  </div>
                </CardContent>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">
                      Payment Distribution Method
                    </Label>
                    <select
                      id="payment-method"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="profit-share">Profit Share</option>
                      <option value="fixed-payment">Fixed Payment</option>
                      <option value="milestone-based">
                        Milestone-Based Payments
                      </option>
                    </select>
                    <div className="flex">
                      <div className="mr-5">
                        Your Bid (INR)
                        <Input
                          type="Number"
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="mr-5">
                        Define your stake of Bid out of 100
                        <Input
                          type="Number"
                          value={stakePercentage}
                          onChange={(e) => {
                            setStakePercentage(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        Amount You will get :
                        <Input value={(amount * stakePercentage) / 100} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="revision-process">Revision Process</Label>
                    <Textarea
                      id="revision-process"
                      placeholder="Describe the revision and review process..."
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                      required
                    />
                  </div>
                  <Button onClick={handleSubmit}>Request to Collaborate</Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
