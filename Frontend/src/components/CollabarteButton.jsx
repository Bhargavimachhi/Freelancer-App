import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, UserPlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollaborationDialog({project}) {
    console.log(project.tags);
  const [stakePercentage, setStakePercentage] = useState(10);
  const [selectedFreelancers, setSelectedFreelancers] = useState([]);

  const contributors = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      task: "Frontend Development",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sam Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      task: "UI/UX Design",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Maria Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      task: "Backend Development",
      rating: 4.9,
    },
  ];

  const availableFreelancers = [
    {
      id: 101,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "Node.js", "MongoDB"],
      hourlyRate: "$45",
      rating: 4.7,
    },
    {
      id: 102,
      name: "Emma Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      hourlyRate: "$50",
      rating: 4.9,
    },
    {
      id: 103,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Python", "Django", "PostgreSQL"],
      hourlyRate: "$40",
      rating: 4.6,
    },
    {
      id: 104,
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Vue.js", "Firebase", "Tailwind CSS"],
      hourlyRate: "$42",
      rating: 4.8,
    },
  ];

  const toggleFreelancerSelection = (id) => {
    setSelectedFreelancers((prev) =>
      prev.includes(id) ? prev.filter((freelancerId) => freelancerId !== id) : [...prev, id]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Collaborate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Project Collaboration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    We're looking for talented individuals to help redesign our e-commerce platform. The project
                    involves updating the UI, improving user experience, and implementing new features to enhance
                    customer engagement.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Skills Required</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">React</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">UI/UX Design</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Node.js</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">MongoDB</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Figma</span>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Existing Contributors
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full ml-2">
                    {contributors.length} members
                  </span>
                </CardTitle>
                <CardDescription>Meet the team you'll be working with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <Avatar>
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{contributor.name}</h4>
                        <p className="text-sm text-muted-foreground">{contributor.task}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span className="text-sm font-medium">{contributor.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

         

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Collaboration Terms</CardTitle>
                <CardDescription>Review and agree to the project terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Distribution Method</Label>
                  <select
                    id="payment-method"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="profit-share">Profit Share</option>
                    <option value="fixed-payment">Fixed Payment</option>
                    <option value="milestone-based">Milestone-Based Payments</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revision-process">Revision Process</Label>
                  <Textarea
                    id="revision-process"
                    placeholder="Describe the revision and review process..."
                    defaultValue="Up to 3 rounds of revisions. All work will be reviewed by the project lead within 48 hours of submission."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:mr-auto">
            Cancel
          </Button>
          <Button>
            Request to Collaborate
            {selectedFreelancers.length > 0 && ` (${selectedFreelancers.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}