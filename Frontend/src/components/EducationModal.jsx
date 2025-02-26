import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ICONS } from "@/assets/icons/icons";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import toast from "react-hot-toast";

const EducationModal = ({ editEducation, setEditEducation }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { getUserDetails } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editEducation) {
      setValue("school", editEducation?.school);
      setValue("degree", editEducation?.degree);
      setValue("fieldOfStudy", editEducation.fieldOfStudy);
      setValue("startDate", editEducation.startDate);
      setValue("endDate", editEducation.endDate);
      setValue("description", editEducation.description);
      openModal();
    }
  }, [editEducation]);

  const closeModal = () => {
    setIsOpen(false);
    setEditEducation(null);
    reset();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    console.log("Data :", data);

    try {
      const response = await axios.post(
        `http://localhost:3000/user/${user?.id}/edit-properties`,
        { education: [data] } // Ensure education is an array
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        closeModal(); // Close modal after submission
        getUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <div className="font-bold text-center text-white rounded-lg">
        <button
          type="button"
          onClick={openModal}
          className="p-2 transition-colors duration-200 rounded-full bg-bg hover:bg-gray-200"
        >
          <ICONS.PLUS size={20} className="text-text"/>
          {/* {editEducation ? "Edit Education" : "Add Education"} */}
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
                      {editEducation ? "Edit Education" : "Add Education"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 text-gray-500 rounded-full hover:text-text bg-slate-300"
                    >
                      <ICONS.CLOSE size={20} color="#1B3030" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          School *
                        </label>
                        <input
                          type="text"
                          {...register("school", {
                            required: "School is required",
                          })}
                          placeholder="Ex. Northwestern University"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.school && (
                          <p className="text-sm text-red-500">
                            {errors.school.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Degree *
                        </label>
                        <input
                          type="text"
                          {...register("degree", {
                            required: "Degree is required",
                          })}
                          placeholder="Ex. Bachelors"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.degree && (
                          <p className="text-sm text-red-500">
                            {errors.degree.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Field of Study *
                        </label>
                        <input
                          type="text"
                          {...register("fieldOfStudy", {
                            required: "Field of Study is required",
                          })}
                          placeholder="Ex. Computer Science"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.fieldOfStudy && (
                          <p className="text-sm text-red-500">
                            {errors.fieldOfStudy.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-text">
                            Start Year *
                          </label>
                          <input
                            type="number"
                            {...register("startDate", {
                              required: "Start Year is required",
                            })}
                            placeholder="2022"
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
                            End Year *
                          </label>
                          <input
                            type="number"
                            {...register("endDate", {
                              required: "End Year is required",
                            })}
                            placeholder="2026"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          {errors.endDate && (
                            <p className="text-sm text-red-500">
                              {errors.endDate.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          placeholder="Describe your studies, awards, etc."
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        ></textarea>
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

export default EducationModal;
