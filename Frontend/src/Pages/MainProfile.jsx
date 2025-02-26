import React, { useState } from "react";
import { Edit2, Eye, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import SkillsModal from "@/components/SkillsModal";
import ProjectModal from "@/components/ProjectModal";
import About from "@/components/Profile/About";
import Experience from "@/components/Profile/Experience";
import Education from "@/components/Profile/Education";
import Project from "@/components/Profile/Project";
import Skills from "@/components/Profile/Skills";
import Reviews from "@/components/Profile/Reviews";

export default function MainProfile() {
  const { user } = useUser();

  return (
    <div>
      {/* Profile Info */}
      <div className="p-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-start gap-2 sm:items-start sm:flex-row">
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
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-sm">{user?.primaryEmailAddress.emailAddress}</p>
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

        {/* About */}
        <About />

        {/* Education */}
        <Education />

        {/* Projects */}
        <Project />

        {/* Skills */}
        <Skills />

        {/* Reviews */}
        <Reviews />

        {/* Other Details */}
        <Experience />
      </div>
    </div>
  );
}
