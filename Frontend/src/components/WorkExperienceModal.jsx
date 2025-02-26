import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ICONS } from "@/assets/icons/icons";
import { useUserContext } from "@/Context/UserContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const WorkExperienceModal = ({ editExperience, setEditExperience }) => {
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
    if (editExperience) {
      setValue("projectsDone", editExperience?.projectsDone);
      setValue("moneyEarned", editExperience?.moneyEarned);
      setIsOpen(true);
    }
  }, [editExperience]);

  const closeModal = () => {
    setIsOpen(false);
    setEditExperience(null);
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
        { previousWork: [data] } // Ensure data is an array
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
          <ICONS.PLUS size={20} className="text-text" />
          {/* {editExperience ? "Edit Work Experience" : "Add Work Experience"} */}
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
                      {editExperience
                        ? "Edit others Details"
                        : "Add others Details"}
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
                          Total Project Completed *
                        </label>
                        <input
                          type="number"
                          {...register("projectsDone", {
                            required: "Field is required",
                          })}
                          placeholder="Ex. 10"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.projectsDone && (
                          <p className="text-sm text-red-500">
                            {errors.projectsDone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Total Money Earned *
                        </label>
                        <input
                          type="number"
                          {...register("moneyEarned", {
                            required: "Field is required",
                          })}
                          placeholder="Ex. $100"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.moneyEarned && (
                          <p className="text-sm text-red-500">
                            {errors.moneyEarned.message}
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        <div className="mr-5">
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
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-text">
                        Description *
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        placeholder="Describe your work experience"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      ></textarea>
                      {errors.description && (
                        <p className="text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
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

export default WorkExperienceModal;
