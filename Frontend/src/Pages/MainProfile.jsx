import React, { useState } from "react";
import { Edit2, Eye, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkExperienceModal from "@/components/WorkExperienceModal";
import EducationModal from "@/components/EducationModal";
import { useUser } from "@clerk/clerk-react";
import AboutModal from "@/components/AboutModal";
import SkillsModal from "@/components/SkillsModal";
import ProjectModal from "@/components/ProjectModal";

export default function MainProfile() {
  const [editExperience, setEditExperience] = useState(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editEducation, setEditEducation] = useState(null);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const { user } = useUser();

  return (
    <div className="">
      {/* Header Banner */}
      <div className="relative h-32 bg-zinc-900">
        <div className="absolute bottom-0 transform translate-y-1/2 left-4">
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
        <Button
          size="icon"
          variant="ghost"
          className="absolute text-white top-4 right-4"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-16 pb-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
          <div>
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-sm text-muted-foreground">
              {user?.primaryEmailAddress.emailAddress}
            </p>
            <p className="mt-1 text-sm">
              {/* temporary skills */}
              Front-end | React JS | Node JS | CE student @GEC-Gn
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>Gandhinagar, Gujarat, India</span>
              <Button variant="link" className="h-auto p-0 text-primary">
                Contact info
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Open to</Button>
            <Button variant="outline">Add profile section</Button>
            <Button variant="outline">Enhance profile</Button>
            <Button variant="outline">Resources</Button>
          </div>
        </div>

        {/* Analytics */}
        {/* <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Analytics</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  27 profile views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover who's viewed your profile
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  64 post impressions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check out who's engaging with your posts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  16 search appearances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See how often you appear in search results
                </p>
              </CardContent>
            </Card>
          </div>
        </div> */}

        {/* About */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>About</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <AboutModal />
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          {/* <CardContent>Coming soon...</CardContent> */}
        </Card>

        {/* Experience */}
        <Card className="mt-8">
          <CardHeader className="flex items-start justify-between gap-2 sm:flex-row">
            <CardTitle>Experience</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <WorkExperienceModal
                editExperience={editExperience}
                setEditExperience={isExperienceModalOpen}
                isOpen={isExperienceModalOpen}
                setIsOpen={setIsExperienceModalOpen}
              />
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          {/* <CardContent>Coming soon...</CardContent> */}
        </Card>

        {/* Education */}
        <Card className="mt-8">
          <CardHeader className="flex items-start justify-between gap-2 sm:flex-row">
            <CardTitle>Education</CardTitle>

            <div className="flex items-center justify-center gap-2">
              <EducationModal
                editEducation={editEducation}
                setEditEducation={setEditEducation}
                isOpen={isEducationModalOpen}
                setIsOpen={setIsEducationModalOpen}
              />
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          {/* <CardContent>Coming soon...</CardContent> */}
        </Card>

        {/* Projects */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <ProjectModal />
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          {/* <CardContent>Coming soon...</CardContent> */}
        </Card>

        {/* Skills */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <SkillsModal />
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          {/* <CardContent>Coming soon...</CardContent> */}
        </Card>
      </div>
    </div>
  );
}

{
  /* Activity */
}
{
  /* <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Activity</CardTitle>
              <p className="text-sm text-muted-foreground">567 followers</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Create a post</Button>
              <Button size="icon" variant="ghost">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button variant="outline" className="rounded-full">
                Posts
              </Button>
              <Button variant="ghost" className="rounded-full">
                Comments
              </Button>
              <Button variant="ghost" className="rounded-full">
                Videos
              </Button>
              <Button variant="ghost" className="rounded-full">
                Images
              </Button>
            </div>
            <div className="space-y-6">
              {/* Post 1 */
}
{
  /*   <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">Mayur Kapadi</p>
                      <p className="text-sm text-muted-foreground">
                        Front-end | React JS | Node JS | CE student
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="mt-2">
                    Excited to share that I've officially become a Postman API
                    Fundamentals Student Expert! 🎓
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <Button variant="ghost" size="sm" className="flex gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="flex gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="flex gap-2">
                      <Eye className="w-4 h-4" />
                      Report
                    </Button>
                    <Button variant="ghost" size="sm" className="flex gap-2">
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */
}
