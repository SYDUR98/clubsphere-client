import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const isPaid = watch("isPaid");

  // Fetch manager's clubs
  const { data: managerClubs = [], isLoading: clubsLoading } = useQuery({
    queryKey: ["manager-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/my");
      // you can filter on backend, but frontend extra check is okay
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const onSubmit = async (data) => {
    // Build payload and normalize values
    const payload = {
      clubId: data.clubId, // should be club _id string
      title: (data.title || "").trim(),
      description: (data.description || "").trim(),
      eventDate: data.eventDate, // send ISO string from input
      location: (data.location || "").trim(),
      isPaid: !!data.isPaid,
      eventFee: data.isPaid ? Number(data.eventFee || 0) : 0,
      maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
    };

    // Quick client-side validation guard (prevents empty strings)
    if (
      !payload.clubId ||
      !payload.title ||
      !payload.description ||
      !payload.eventDate ||
      !payload.location
    ) {
      Swal.fire("Error!", "Please fill all required fields", "error");
      return;
    }

    // Debug: show payload you are sending
    console.log("CreateEvent payload:", payload);

    try {
      const res = await axiosSecure.post("/events", payload);
      console.log("CreateEvent response:", res?.data);
      Swal.fire("Success!", "Event created successfully.", "success");
      reset();
    } catch (err) {
      console.error("CreateEvent error:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create event";
      Swal.fire("Error!", serverMessage, "error");
    }
  };

  if (clubsLoading) return <LoadingPage></LoadingPage>
  

  return (
    <div className="p-6 bg-base-100">
      

        <div>
        <h2
          className="
      text-2xl md:text-4xl font-extrabold mb-8 text-center
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
          CREATE NEW EVENT
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
        {/* Club */}
        <select
          {...register("clubId", { required: true })}
          className="select select-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        >
          <option value="">Select Club for Event</option>
          {managerClubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>
        {errors.clubId && (
          <p className="text-error mt-1 text-sm">Club is required</p>
        )}

        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Event Title"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.title && (
          <p className="text-error mt-1 text-sm">Title is required</p>
        )}

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          placeholder="Event Description"
          className="textarea textarea-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.description && (
          <p className="text-error mt-1 text-sm">Description is required</p>
        )}

        {/* Date/time */}
        <label className="block text-sm text-base-content">
          Event Date &amp; Time
        </label>
        <input
          type="datetime-local"
          {...register("eventDate", { required: true })}
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.eventDate && (
          <p className="text-error mt-1 text-sm">Event date/time is required</p>
        )}

        {/* Location */}
        <input
          {...register("location", { required: true })}
          placeholder="Location (venue or address)"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.location && (
          <p className="text-error mt-1 text-sm">Location is required</p>
        )}

        {/* Paid */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isPaid")}
            className="checkbox checkbox-primary"
          />
          <label className="text-base-content font-medium">Paid Event?</label>
        </div>

        {/* Event Fee (conditional) */}
        {watch("isPaid") && (
          <>
            <input
              type="number"
              {...register("eventFee", { required: true, min: 0 })}
              placeholder="Event Fee"
              className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
            />
            {errors.eventFee && (
              <p className="text-error mt-1 text-sm">Valid fee required</p>
            )}
          </>
        )}

        {/* Max attendees */}
        <input
          type="number"
          {...register("maxAttendees", { min: 1 })}
          placeholder="Max Attendees (optional)"
          className="input input-bordered w-full border-primary focus:border-secondary focus:ring focus:ring-secondary/30"
        />
        {errors.maxAttendees && (
          <p className="text-error mt-1 text-sm">Invalid number</p>
        )}

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
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
