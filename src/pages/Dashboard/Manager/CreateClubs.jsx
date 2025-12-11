import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CreateClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const clubData = {
      ...data,
      managerEmail: user?.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post("/clubs", clubData);

      Swal.fire({
        icon: "success",
        title: "Club Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      console.log("Created Club:", res.data);
    } catch (err) {
      console.error("Error creating club:", err);
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: err?.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-6">
      {/* Gradient Heading */}
      <h2
        className="
      text-3xl font-extrabold mb-6 text-center
      bg-gradient-to-r from-primary via-secondary to-accent
      bg-clip-text text-transparent
    "
      >
        Create a Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Club Name */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">Club Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("clubName", { required: "Club Name is required" })}
          />
          {errors.clubName && (
            <p className="text-error mt-1 text-sm">{errors.clubName.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-error mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">Category</span>
          </label>
          <select
            className="select select-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="Photography">Photography</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Book">Book</option>
            <option value="Social">Social</option>
          </select>
          {errors.category && (
            <p className="text-error mt-1 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-error mt-1 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Banner Image URL */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">
              Banner Image URL
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("bannerImage", {
              required: "Banner Image URL is required",
            })}
          />
          {errors.bannerImage && (
            <p className="text-error mt-1 text-sm">
              {errors.bannerImage.message}
            </p>
          )}
        </div>

        {/* Membership Fee */}
        <div>
          <label className="label">
            <span className="text-base-content font-medium">
              Membership Fee ($)
            </span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            {...register("membershipFee", {
              required: "Membership fee is required",
              min: { value: 0, message: "Fee cannot be negative" },
            })}
          />
          {errors.membershipFee && (
            <p className="text-error mt-1 text-sm">
              {errors.membershipFee.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="btn bg-primary hover:bg-secondary text-white w-full mt-4 border-0 focus:ring focus:ring-secondary/30"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Club"}
        </button>
      </form>
    </div>
  );
};

export default CreateClubs;
