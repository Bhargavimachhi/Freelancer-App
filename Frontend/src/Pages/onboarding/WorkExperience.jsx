import OnboardingNavigation from "@/components/OnboardingNavigation";
import WorkExperienceModal from "@/components/WorkExperienceModal";
import React, { useState } from "react";

const WorkExperience = () => {
  const [editExperience, setEditExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start justify-center min-h-[70vh] gap-2 px-4 mx-auto my-4 max-w-7xl">
        <div className="w-full max-w-2xl my-4 text-start">
          <h2 className="my-4 text-2xl font-semibold text-text md:text-4xl">
            Here’s what you’ve told us about your experience — any more to add?
          </h2>
          <p className="my-4 text-text">
            The more you tell us, the better: freelancers who’ve added their
            work experience are twice as likely to win work.
          </p>
        </div>

        <WorkExperienceModal
          editExperience={editExperience}
          setEditExperience={setEditExperience}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>
      <OnboardingNavigation />
    </>
  );
};

export default WorkExperience;
