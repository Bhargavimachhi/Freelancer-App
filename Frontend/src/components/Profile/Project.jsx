import React, { useState } from "react";
import { useUserContext } from "@/Context/UserContext";
import ProjectModal from "../ProjectModal";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ICONS } from "@/assets/icons/icons";
import { Link } from "react-router-dom";

const Project = () => {
  const { userData } = useUserContext();
  const [editProject, setEditProject] = useState(null);

  const handleEdit = (project) => {
    setEditProject(project);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">Projects</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <ProjectModal
            editProject={editProject}
            setEditProject={setEditProject}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
            {userData?.projects?.map((project, index) => (
              <div
                key={index}
                className="flex flex-col p-5 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg"
              >
                {/* Project Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    {/* Project Thumbnail Placeholder */}
                    <div className="flex items-center justify-center bg-gray-300 rounded-lg w-14 h-14">
                      <ICONS.BOOKMARK size={24} className="text-gray-500" />
                    </div>

                    {/* Project Details */}
                    <div>
                      <h2 className="text-lg font-semibold text-text">
                        {project?.title}
                      </h2>
                      <p className="text-sm text-text">
                        {project?.description}
                      </p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-300"
                  >
                    <ICONS.EDIT size={20} className="text-text" />
                  </button>
                </div>

                {/* Additional Details */}
                <div className="mt-3">
                  <div className="flex flex-col gap-4 text-sm sm:flex-row text-text">
                    <div>
                      <span className="font-semibold">Start Date :</span>{" "}
                      {project?.startDate}
                    </div>
                    <div>
                      <span className="font-semibold">End Date :</span>{" "}
                      {project?.endDate || "Ongoing"}
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {project?.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-sm font-semibold text-text">
                      Tech Stack :
                    </span>{" "}
                    {project?.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-text"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2 mt-3 text-text sm:flex-row">
                  <span className="font-semibold">Live Visit :</span>{" "}
                  <Link
                    to={project?.link}
                    target="_blank"
                    className="hover:text-btn hover:underline"
                  >
                    {project?.link}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Project;
