import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SkillsModal from "../SkillsModal";
import { useUserContext } from "@/Context/UserContext";
import { ICONS } from "@/assets/icons/icons";

const Skills = () => {
  const { userData } = useUserContext();
  const [editSkills, setEditSkills] = useState(null);

  const handleEdit = (userData) => {
    setEditSkills(userData);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">Top Skills</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <SkillsModal editSkills={editSkills} setEditSkills={setEditSkills} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex items-center justify-between p-4 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              {userData?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-lg text-text"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-center text-text">No skills added yet.</p>
              )}
            </div>
            {/* Edit Button */}
            <button
              onClick={() => handleEdit(userData)}
              className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
            >
              <ICONS.EDIT size={18} className="text-text" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
