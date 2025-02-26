import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ICONS } from "@/assets/icons/icons";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import toast from "react-hot-toast";

const ReviewsModal = ({ editReviews, setEditReviews }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { getUserDetails, userData } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editReviews) {
      setValue("rating", editReviews?.rating);
      setValue("description", editReviews?.description);
      openModal();
    }
  }, [editReviews]);

  const closeModal = () => {
    setIsOpen(false);
    setEditReviews(null);
    reset();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      const review = {
        createdBy: userData._id, // Ensure user.id is a valid string ObjectId
        rating: data.rating,
        description: data.description,
      };

      const response = await axios.post(
        `http://localhost:3000/user/${user?.id}/edit-properties`,
        {
          reviews: [review],
        }
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
                      {editReviews ? "Edit Reviews" : "Add Reviews"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 text-gray-500 rounded-full hover:text-text bg-slate-300"
                    >
                      <ICONS.CLOSE size={20} color="#1B3030" />
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 mx-auto bg-white"
                  >
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      {/* Rating Field */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Rating *
                        </label>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              {...register("rating", {
                                required: "Rating is required",
                              })}
                              value="1"
                              className="mr-2"
                            />
                            <span>Beginner (1)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              {...register("rating", {
                                required: "Rating is required",
                              })}
                              value="2"
                              className="mr-2"
                            />
                            <span>Elementary (2)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              {...register("rating", {
                                required: "Rating is required",
                              })}
                              value="3"
                              className="mr-2"
                            />
                            <span>Intermediate (3)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              {...register("rating", {
                                required: "Rating is required",
                              })}
                              value="4"
                              className="mr-2"
                            />
                            <span>Proficient (4)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              {...register("rating", {
                                required: "Rating is required",
                              })}
                              value="5"
                              className="mr-2"
                            />
                            <span>Advanced (5)</span>
                          </label>
                        </div>
                        {errors.rating && (
                          <p className="text-sm text-red-500">
                            {errors.rating.message}
                          </p>
                        )}
                      </div>

                      {/* Reviews Field */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-text">
                          Reviews
                        </label>
                        <textarea
                          {...register("description", {
                            required: "Reviews is required",
                          })}
                          placeholder="Write your review here..."
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        ></textarea>
                        {errors.description && (
                          <p className="text-sm text-red-500">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 text-white transition rounded-md bg-btn hover:bg-blue-600"
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

export default ReviewsModal;
