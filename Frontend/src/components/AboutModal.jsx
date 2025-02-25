import React, { useEffect, Fragment, useState } from "react";
import { ICONS } from "@/assets/icons/icons";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";

const AboutModal = ({ editAbout, setEditAbout }) => {
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
    if (editAbout) {
      setValue("aboutMe", editAbout.aboutMe);
      openModal();
    }
  }, [editAbout]);

  const closeModal = () => {
    setIsOpen(false);
    setEditAbout(null);
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
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        closeModal(); // Close modal after submission
        getUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occured");
      console.error("Error checking user existence:", error);
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
          {/* {editAbout ? "Edit About" : "Add About"} */}
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
                      {editAbout ? "Edit About" : "Add About"}
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
                        Write About *
                      </label>
                      <p className="my-2 text-text">
                        You can write about your years of experience, industry,
                        or skills. People also talk about their achievements or
                        previous job experiences.
                      </p>
                      <textarea
                        rows={7}
                        {...register("aboutMe", {
                          required: "Description is required",
                        })}
                        placeholder="Write about your self..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      ></textarea>
                      {errors.aboutMe && (
                        <p className="text-sm text-red-500">
                          {errors.aboutMe.message}
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

export default AboutModal;
