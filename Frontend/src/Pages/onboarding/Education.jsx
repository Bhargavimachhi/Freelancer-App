import EducationModal from "@/components/EducationModal";
import React, { useState } from "react";

const Education = () => {
  const [editEducation, setEditEducation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center min-h-[60vh] gap-2 px-4 mx-auto my-4 max-w-7xl">
      <div className="w-full max-w-2xl my-4 text-start">
        <h2 className="my-4 text-2xl font-semibold text-text md:text-4xl">
          And here’s what we picked up on your education – is it right?{" "}
        </h2>
        <p className="my-4 text-text">
          Again, this is worth taking a moment on. People who include their
          education get seen three times more.
        </p>
      </div>

      <EducationModal
        editEducation={editEducation}
        setEditEducation={setEditEducation}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Education;
