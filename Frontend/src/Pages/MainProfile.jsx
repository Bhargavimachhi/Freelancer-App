import React from "react";
import { useUser } from "@clerk/clerk-react";
import About from "@/components/Profile/About";
import Experience from "@/components/Profile/Experience";
import Education from "@/components/Profile/Education";
import Project from "@/components/Profile/Project";
import Skills from "@/components/Profile/Skills";
import Reviews from "@/components/Profile/Reviews";
import Navigate from "@/helpers/Navigate";
import { ProfileData } from "./ProfileData";

export default function MainProfile() {
  const { user } = useUser();

  return (
    <div>
      <Navigate
        name={"My Profile"}
        item={user?.fullName}
        path={"main-profile"}
      />
      {/* Profile Info */}
      <div className="p-4 mx-auto max-w-7xl">
        <ProfileData />

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
