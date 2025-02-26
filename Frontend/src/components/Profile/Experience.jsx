import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import WorkExperienceModal from "../WorkExperienceModal";
import { ICONS } from "@/assets/icons/icons";
import { useUserContext } from "@/Context/UserContext";

const Experience = () => {
  const [editExperience, setEditExperience] = useState(null);
  const { userData } = useUserContext();

  const handleEdit = (work) => {
    setEditExperience(work);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">Other Details</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <WorkExperienceModal
            editExperience={editExperience}
            setEditExperience={setEditExperience}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
            {userData?.previousWork?.map((work, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm itemtransition-all hover:shadow-lg"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 text-text">
                      <span className="font-semibold">
                        Total Project Completed :
                      </span>
                      <span>{work?.projectsDone}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-text">
                      <span className="font-semibold">Total Money Earned :</span>
                      <span>${work?.moneyEarned}</span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(work)}
                    className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
                  >
                    <ICONS.EDIT size={18} className="text-text" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Experience;
