import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ICONS } from "@/assets/icons/icons";
import { useUserContext } from "@/Context/UserContext";
import EducationModal from "../EducationModal";

const Education = () => {
  const { userData } = useUserContext();
  const [editEducation, setEditEducation] = useState(null);

  const handleEdit = (education) => {
    setEditEducation(education);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">Education</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <EducationModal
            editEducation={editEducation}
            setEditEducation={setEditEducation}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
            {userData?.education?.map((education, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* University Logo Placeholder */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

                  {/* Education Details */}
                  <div>
                    <h2 className="font-semibold text-text text-md">
                      {education?.school}
                    </h2>
                    <p className="text-sm text-text">
                      {education?.degree} - {education?.fieldOfStudy}
                    </p>
                    <p className="text-sm text-text">
                      {education?.startDate} - {education?.endDate}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-text">
                      <ICONS.BOOKMARK size={18} className="mr-1" />
                      {education?.fieldOfStudy}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(education)}
                  className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
                >
                  <ICONS.EDIT size={18} className="text-text" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
