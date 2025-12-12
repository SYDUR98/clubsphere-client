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
      <h2
        className="
      text-3xl font-extrabold mb-4 text-center
      bg-gradient-to-r from-primary via-secondary to-accent
      bg-clip-text text-transparent
    "
      >
        Create New Club
      </h2>

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
          className="btn w-full bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:from-secondary hover:to-accent transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Club"}
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
