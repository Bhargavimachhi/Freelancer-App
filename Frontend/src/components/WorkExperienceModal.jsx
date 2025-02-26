import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ICONS } from "@/assets/icons/icons";

const WorkExperienceModal = ({ editExperience, setEditExperience }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editExperience) {
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

  const onSubmit = (data) => {
    console.log("Data :", data);
    closeModal(); // Close modal after submission
  };

  return (
    <>
      <div className="font-bold text-center text-white rounded-lg">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center px-4 py-3 text-white transition-all duration-300 ease-in-out rounded-full bg-btn hover:bg-btnhover"
        >
          <ICONS.BRIEFCASE size={20} color="#fff" className="mr-2" />
          {editExperience ? "Edit Work Experience" : "Add Work Experience"}
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
                        ? "Edit Work Experience"
                        : "Add Work Experience"}
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
                          Title *
                        </label>
                        <input
                          type="text"
                          {...register("jobTitle", {
                            required: "Title is required",
                          })}
                          placeholder="Ex. Software Engineer"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.jobTitle && (
                          <p className="text-sm text-red-500">
                            {errors.jobTitle.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Company *
                        </label>
                        <input
                          type="text"
                          {...register("companyName", {
                            required: "Company Name is required",
                          })}
                          placeholder="Ex. Microsoft"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-500">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Location *
                        </label>
                        <input
                          type="text"
                          {...register("location", {
                            required: "Location is required",
                          })}
                          placeholder="Ex. London"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.location && (
                          <p className="text-sm text-red-500">
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Country *
                        </label>
                        <input
                          type="text"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          placeholder="Ex. India"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.location && (
                          <p className="text-sm text-red-500">
                            {errors.country.message}
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
