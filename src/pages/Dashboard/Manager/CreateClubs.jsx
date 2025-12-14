//mni
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateClub = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const clubData = {
      ...data,
      membershipFee: Number(data.membershipFee),
      // managerEmail and status handled by backend
    };

    try {
      const res = await axiosSecure.post("/clubs", clubData);
      Swal.fire(
        "Success!",
        "Club created (Pending Admin Approval).",
        "success"
      );
      reset();
    } catch (err) {
      Swal.fire(
        "Error!",
        err?.response?.data?.message || "Failed to create club",
        "error"
      );
    }
  };

  return (
    <div className="p-6">
      <div>
        <h2
          className="
      text-4xl md:text-2xl font-extrabold mb-8 text-center
      bg-clip-text text-transparent
      tracking-wide
    "
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite", // slow & smooth
          }}
        >
          CREATE NEW CLUB
        </h2>

        {/* Inline keyframes */}
        <style>
          {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
        </style>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg mx-auto"
      >
        <input
          {...register("clubName", { required: "Name is required" })}
          placeholder="Club Name"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.clubName && (
          <p className="text-error mt-1 text-sm">{errors.clubName.message}</p>
        )}

        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          className="textarea textarea-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />

        <select
          {...register("category", { required: "Category is required" })}
          className="select select-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        >
          <option value="">Select Category</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Robotics">Robotics</option>
          <option value="Programming">Programming</option>
          <option value="Sports">Language</option>
          <option value="Sports">Math</option>
          <option value="Sports">Yoga</option>
          <option value="Sports">Gym</option>
          <option value="Sports">Adventure</option>
          <option value="Sports">Music</option>
          <option value="Sports">Web Development</option>
          {/* ... other categories */}
        </select>

        <input
          {...register("location", { required: "Location is required" })}
          placeholder="Location (City/Area)"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />

        <input
          {...register("bannerImage", { required: "URL is required" })}
          placeholder="Banner Image URL"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />

        <input
          type="number"
          {...register("membershipFee", {
            required: true,
            valueAsNumber: true,
            min: 0,
          })}
          placeholder="Membership Fee (0 for free)"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />

        <button
          type="submit"
          className="
    btn w-full
    text-white font-semibold shadow-md
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    hover:brightness-110 hover:shadow-lg
    transition-all duration-300
  "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Club"}
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
