import React, { Fragment, useEffect, useState } from "react";
import { ICONS } from "@/assets/icons/icons";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useUserContext } from "@/Context/UserContext";

const SkillsModal = ({ editSkills, setEditSkills }) => {
  const { user } = useUser();
  const { getUserDetails } = useUserContext();
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

  useEffect(() => {
    if (editSkills) {
      setValue("skills", editSkills?.skills);
      openModal();
    }
  }, [editSkills]);

  const closeModal = () => {
    setIsOpen(false);
    setEditSkills(null);
    reset();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    data.skills = skills; // Ensure skills is added as an array
    console.log("Final Data Sent:", data); // Debugging

    try {
      const response = await axios.post(
        `http://localhost:3000/user/${user?.id}/edit-properties`,
        data // Send complete user data, including skills
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        closeModal();
        getUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error updating user data:", error);
    }
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
          onClick={openModal}
          className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
        >
          <ICONS.PLUS size={20} className="text-text" />
          {/* {editSkills ? "Edit Skills" : "Add Skills"} */}
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
                        <textarea
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
                        )}
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
