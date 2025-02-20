import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ICONS } from "@/assets/icons/icons";

const ProjectModal = () => {
  const [editProject, setEditProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setIsOpen(false);
    setEditProject(null);
    reset();
  };

  const onSubmit = (data) => {
    console.log("Data :", data);
    closeModal(); // Close modal after submission
  };

  const allSkills = [
    "Web Development",
    "Web Application",
    "React.js",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "CSS",
    "HTML",
    "Tailwind CSS",
    "API Development",
    "UI/UX Design",
    "Software Engineering",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
  ];

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(input.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill) => {
    if (!skills.includes(skill) && skills.length < 15) {
      setSkills([...skills, skill]);
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <>
      <div className="font-bold text-center text-white rounded-lg">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-3 text-white transition-all duration-300 ease-in-out rounded-full bg-btn hover:bg-btnhover"
        >
          <ICONS.BRIEFCASE size={20} color="#fff" className="mr-2" />
          {editProject ? "Edit Project" : "Add Project"}
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[50rem] p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-text">
                      {editProject ? "Edit Project" : "Add Project"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 text-gray-500 rounded-full hover:text-text bg-slate-300"
                    >
                      <ICONS.CLOSE size={20} color="#1B3030" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-1">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Project name *
                        </label>
                        <input
                          type="text"
                          {...register("project", {
                            required: "Project name is required",
                          })}
                          placeholder="Ex. Freelancer Platform"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.project && (
                          <p className="text-sm text-red-500">
                            {errors.project.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Description *
                        </label>
                        <textarea
                          {...register("description", {
                            required: "Description is required",
                          })}
                          rows={4}
                          placeholder="Describe your project"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        ></textarea>
                        {errors.description && (
                          <p className="text-sm text-red-500">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Skills *
                        </label>
                        <div>
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type to search skills"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          {input && (
                            <ul className="mt-1 bg-white border border-gray-300 rounded-md">
                              {filteredSkills.map((skill) => (
                                <li
                                  key={skill}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => addSkill(skill)}
                                >
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          )}
                          {/* <textarea
                            {...register("skills", {
                              required: "Skills is required",
                            })}
                            rows={2}
                            className="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
                            readOnly
                            value={skills.join(", ")}
                          />
                          {errors.skills && (
                            <p className="text-sm text-red-500">
                              {errors.skills.message}
                            </p>
                          )} */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 text-sm text-blue-700 transition duration-200 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
                                onClick={() => removeSkill(skill)}
                              >
                                {skill} ✕
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Project Link
                        </label>
                        <input
                          type="text"
                          {...register("link")}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          {...register("startDate", {
                            required: "Start Date is required",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.startDate && (
                          <p className="text-sm text-red-500">
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          End Date *
                        </label>
                        <input
                          type="date"
                          {...register("endDate", {
                            required: "End Date is required",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.startDate && (
                          <p className="text-sm text-red-500">
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 text-white rounded-md bg-btn"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProjectModal;
