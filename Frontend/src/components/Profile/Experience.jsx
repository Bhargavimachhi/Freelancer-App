import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import WorkExperienceModal from "../WorkExperienceModal";
import { ICONS } from "@/assets/icons/icons";
import { useUserContext } from "@/Context/UserContext";

const Experience = () => {
  const [editExperience, setEditExperience] = useState(null);
  const { userData } = useUserContext();

  const handleEdit = (userData) => {
    setEditExperience(userData);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex items-start justify-between gap-2 sm:flex-row">
        <CardTitle>Experience</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <WorkExperienceModal
            editExperience={editExperience}
            setEditExperience={setEditExperience}
          />
        </div>
      </CardHeader>
      <CardContent>Work in Progress...</CardContent>
    </Card>
  );
};

export default Experience;
