

import { useState } from "react"
import { AlertCircle, CheckCircle2, Trophy, Info, Brain, Briefcase, MessageSquare, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function ProposalAnalysisPage({goodpoints,badpoints,scoringjson}) {
    
  const [isDialogOpen, setIsDialogOpen] = useState(false)
 

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Proposal Analysis</h2>

        {/* Top row with pros and cons */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Positive Points Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5 pb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <CardTitle>Why Choose This Freelancer?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
              
                {goodpoints.map((goodpoint)=>{
                    return(
                     <li className="flex items-start gap-2">
                     <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />
                     <span>{goodpoint}</span>
                   </li>
                    );

                })}
               
              </ul>
            </CardContent>
          </Card>

          {/* Negative Points Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-500/5 pb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Potential Obstacles</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
              {badpoints.map((badpoint)=>{
                    return(
                     <li className="flex items-start gap-2">
                     <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />
                     <span>{badpoint}</span>
                   </li>
                    );

                })}
               
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Bottom full-width score card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-500" />
                <CardTitle>Overall Score</CardTitle>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    See our scoring criteria
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Trophy className="h-5 w-5 text-blue-500" />
                      AI Scoring System
                    </DialogTitle>
                    <DialogDescription>
                      Our AI analyzes proposals based on four key criteria, each weighted to ensure the best match for
                      your project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-500" />
                            <h4 className="font-semibold">Skills Match</h4>
                          </div>
                          <span className="font-semibold text-purple-500">40%</span>
                        </div>
                        <Progress value={40} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
                        <p className="text-sm text-muted-foreground">
                          Evaluates how well the freelancer's skills align with your project requirements
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-blue-500" />
                            <h4 className="font-semibold">Experience Level</h4>
                          </div>
                          <span className="font-semibold text-blue-500">30%</span>
                        </div>
                        <Progress value={30} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                        <p className="text-sm text-muted-foreground">
                          Assesses the freelancer's expertise level against project requirements
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-green-500" />
                            <h4 className="font-semibold">Answering Capabilities</h4>
                          </div>
                          <span className="font-semibold text-green-500">25%</span>
                        </div>
                        <Progress value={25} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
                        <p className="text-sm text-muted-foreground">
                          Evaluates how well the freelancer addressed your specific questions
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-semibold">Pricing</h4>
                          </div>
                          <span className="font-semibold text-yellow-500">5%</span>
                        </div>
                        <Progress value={5} className="h-2 bg-yellow-100" indicatorClassName="bg-yellow-500" />
                        <p className="text-sm text-muted-foreground">
                          Compares the proposed price with your project budget
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ">
                <div className="absolute h-36 w-36 rounded-full bg-white"></div>
                <span className="relative text-5xl font-bold text-blue-500">{scoringjson.final_score}</span>
              </div>
              <div className="mt-6 text-center text-sm text-muted-foreground max-w-2xl">
                <p>
                  {scoringjson.reason_explanation}
                </p>
                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}