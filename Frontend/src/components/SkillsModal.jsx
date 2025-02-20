import React, { Fragment, useState } from "react";
import { ICONS } from "@/assets/icons/icons";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

const SkillsModal = () => {
  const [editSkills, setEditSkills] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState(["Web Development", "Web Application"]);
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
    setEditSkills(null);
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
          {/* <ICONS.BRIEFCASE size={20} color="#fff" className="mr-2" /> */}
          {editSkills ? "Edit Skills" : "Add Skills"}
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
                      {editSkills ? "Edit Skills" : "Add Skills"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 text-gray-500 rounded-full hover:text-text bg-slate-300"
                    >
                      <ICONS.CLOSE size={20} color="#1B3030" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-1"></div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-text">
                        Skills *
                      </label>
                      <div className="my-4">
                        <h3 className="mb-2 font-semibold text-gray-700">
                          Your Skills
                        </h3>
                        <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50">
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
                      <div className="mb-4">
                        <h3 className="mb-2 font-semibold text-gray-700">
                          Add a Skill
                        </h3>
                        <input
                          type="text"
                          placeholder="Type to search skills..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="w-full p-2 mb-2 border rounded-lg"
                        />
                        <div className="flex flex-wrap gap-2">
                          {filteredSkills.map((skill) => (
                            <button
                              key={skill}
                              className="px-3 py-1 text-sm text-gray-700 transition duration-200 bg-gray-100 border rounded-full hover:bg-gray-200"
                              onClick={() => addSkill(skill)}
                            >
                              + {skill}
                            </button>
                          ))}
                        </div>
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

export default SkillsModal;
