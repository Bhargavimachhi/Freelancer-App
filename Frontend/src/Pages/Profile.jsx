import LoadinPage from "@/components/LoadingPage";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useForm } from "react-hook-form";

const Profile = () => {

  const { user } = useUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  if(!user) {
    return <LoadinPage />
  }

  return (
    <section className="mx-auto mt-4 max-w-7xl">
      <div className="p-2">
        <h2 className="mb-4 text-2xl font-semibold">Publish your profile.</h2>
        <p className="mb-6 text-gray-600">
          A professional photo helps you build trust with your clients. To keep
          things safe and simple, they’ll pay you through us - which is why we
          need your personal information.
        </p>
      </div>
      <div className="flex flex-col p-2 sm:p-6 md:flex-row">
        {/* Left Section - Upload Photo */}
        <div className="flex flex-col items-start p-6 rounded-lg sm:items-center md:w-1/3">
          <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full">
            <span className="text-text">Upload</span>
          </div>
          <button className="px-4 py-2 mt-4 text-white rounded-lg bg-btn">
            + Upload photo
          </button>
        </div>

        {/* Right Section - Form */}
        <div className="w-full p-2 mt-6 rounded-lg sm:p-6 md:w-2/3 md:mt-0 md:ml-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {/* <div>
              <label className="block text-gray-700">Date of Birth *</label>
              <input
                type="date"
                {...register("dob", { required: "Date of Birth is required" })}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dob.message}
                </p>
              )}
            </div> */}

            {/* <div>
              <label className="block text-gray-700">Country *</label>
              <select
                {...register("country", { required: "Country is required" })}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              >
                <option value="">Select Country</option>
                <option value="India">
                  India
                </option>
                <option value="USA">USA</option>
              </select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div> */}

            <div>
              <label className="block text-gray-700">Name *</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                value={user?.fullName}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Contact</label>
              <input
                type="text"
                {...register("contact")}
                value={user?.contact}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
            </div>

            <div>
              <label className="block text-gray-700">About me</label>
              <textarea
                type="text"
                {...register("bio")}
                value={user?.aboutMe}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
            </div>

            {/* <div>
              <label className="block text-gray-700">State/Province</label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div> */}

            {/* <div>
              <label className="block text-gray-700">ZIP/Postal Code</label>
              <input
                type="text"
                {...register("zip", { required: "Zip code is required" })}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.zip.message}
                </p>
              )}
            </div> */}

            {/* <div>
              <label className="block text-gray-700">Phone *</label>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full p-2 mt-2 border rounded-md border-btn"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div> */}

            <div className="flex sm:justify-end sm:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-500 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
