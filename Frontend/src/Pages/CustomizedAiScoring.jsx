import { useState } from "react";
import Alert from "@mui/material/Alert";
import {
  AlertCircle,
  CheckCircle2,
  Trophy,
  Info,
  Brain,
  Briefcase,
  MessageSquare,
  Coins,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";

export const CustomizedAiScoring = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const score = JSON.parse(localStorage.getItem("score"));
  const [formData, setFormData] = useState(
    score
      ? score
      : {
          skillMatch: 40,
          experienceLevel: 30,
          answeringCapability: 25,
          pricing: 5,
        }
  );

  const handleSubmit = () => {
    let total =
      Number(formData.skillMatch) +
      Number(formData.answeringCapability) +
      Number(formData.experienceLevel) +
      Number(formData.pricing);

    if (total != 100) {
      toast.error("Criteria total should be 100");
    } else {
      localStorage.setItem("score", JSON.stringify(formData));
      toast.success("Ai Scoring Criteria Set Successfully");
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Info />
            Adjust Scoring Criteria
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Trophy className="w-5 h-5 text-blue-500" />
              AI Scoring System
            </DialogTitle>
            <DialogDescription>
              Our AI analyzes proposals based on four key criteria, each
              weighted to ensure the best match for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <h4 className="font-semibold">Skills Match</h4>
                  </div>
                  <input
                    type="Number"
                    value={formData.skillMatch}
                    className="border-solid border-[2px] border-purple-100"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        skillMatch: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <Progress
                  value={40}
                  className="h-2 bg-purple-100"
                  indicatorClassName="bg-purple-500"
                />
                <p className="text-sm text-muted-foreground">
                  Evaluates how well the freelancer's skills align with your
                  project requirements
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold">Experience Level</h4>
                  </div>
                  <input
                    type="Number"
                    className="border-solid border-[2px] border-blue-100"
                    value={formData.experienceLevel}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        experienceLevel: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <Progress
                  value={30}
                  className="h-2 bg-blue-100"
                  indicatorClassName="bg-blue-500"
                />
                <p className="text-sm text-muted-foreground">
                  Assesses the freelancer's expertise level against project
                  requirements
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold">Answering Capabilities</h4>
                  </div>
                  <input
                    type="Number"
                    className="border-solid border-[2px] border-green-100"
                    value={formData.answeringCapability}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        answeringCapability: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <Progress
                  value={25}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-500"
                />
                <p className="text-sm text-muted-foreground">
                  Evaluates how well the freelancer addressed your specific
                  questions
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-semibold">Pricing</h4>
                  </div>
                  <input
                    type="Number"
                    className="border-solid border-[2px] border-yellow-100"
                    value={formData.pricing}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        pricing: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <Progress
                  value={5}
                  className="h-2 bg-yellow-100"
                  indicatorClassName="bg-yellow-500"
                />
                <p className="text-sm text-muted-foreground">
                  Compares the proposed price with your project budget
                </p>
              </div>
            </div>
          </div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
