import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUserContext } from "@/Context/UserContext";
import AboutModal from "../AboutModal";
import { ICONS } from "@/assets/icons/icons";

const About = () => {
  const { userData } = useUserContext();
  const [editAbout, setEditAbout] = useState(null);

  const handleEdit = (userData) => {
    setEditAbout(userData);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">About</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <AboutModal editAbout={editAbout} setEditAbout={setEditAbout} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between p-4">
          <div>
            <p>{userData?.aboutMe}</p>
          </div>
          {/* Edit Button */}
          <button
            onClick={() => handleEdit(userData)}
            className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
          >
            <ICONS.EDIT size={18} className="text-text" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
