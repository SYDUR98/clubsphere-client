import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const CreateEventModal = ({ clubId, clubName, isOpen, onClose, onCreated }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      managerEmail: "", 
      isPaid: false,
    },
  });

  useEffect(() => {
    if (user?.email) setValue("managerEmail", user.email);
  }, [user, setValue]);

  const [loading, setLoading] = useState(false);
  const isPaid = watch("isPaid", false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const payload = {
        ...data,
        clubId,
        clubName, // attach fixed club name
        managerEmail: user?.email || data.managerEmail || null,
      };

      await axiosSecure.post("/events", payload);

      Swal.fire("Success!", "Event created successfully", "success");
      reset();
      onCreated();
      onClose();
      navigate("/dashboard/manager/my-events");
    } catch (err) {
      console.error("Create event error:", err);
      Swal.fire("Error!", err?.response?.data?.message || "Failed to create event", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-lg bg-base-100 text-base-content shadow-2xl rounded-box">
        <h3 className="font-bold text-2xl text-center mb-2">Create Event</h3>
        <p className="text-center text-neutral mb-4">Fill the details to create a new event</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Fixed Club Name */}
          <input
            value={clubName}
            readOnly
            className="input w-full border-base-300 bg-base-200 cursor-not-allowed"
          />

          {/* Manager Email */}
          <input
            {...register("managerEmail")}
            readOnly
            className="input w-full border-base-300 bg-base-200 cursor-not-allowed"
          />

          {/* Title */}
          <input
            {...register("title", { required: true })}
            placeholder="Event Title"
            className={`input w-full ${errors.title ? "border-error" : "border-base-300"}`}
          />
          {errors.title && (
            <p className="text-error-content bg-error/20 p-2 rounded-md text-sm">
              Title is required
            </p>
          )}

          {/* Description */}
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className={`textarea w-full ${errors.description ? "border-error" : "border-base-300"}`}
          />
          {errors.description && (
            <p className="text-error-content bg-error/20 p-2 rounded-md text-sm">
              Description is required
            </p>
          )}

          {/* Event Date */}
          <input
            type="date"
            {...register("eventDate", { required: true })}
            className={`input w-full ${errors.eventDate ? "border-error" : "border-base-300"}`}
          />
          {errors.eventDate && (
            <p className="text-error-content bg-error/20 p-2 rounded-md text-sm">
              Event date is required
            </p>
          )}

          {/* Location */}
          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className={`input w-full ${errors.location ? "border-error" : "border-base-300"}`}
          />
          {errors.location && (
            <p className="text-error-content bg-error/20 p-2 rounded-md text-sm">
              Location is required
            </p>
          )}

          {/* Paid toggle */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isPaid")} className="checkbox checkbox-primary" />
            <label className="text-base-content font-medium">Paid Event?</label>
          </div>

          {/* Event Fee */}
          {isPaid && (
            <>
              <input
                type="number"
                {...register("eventFee", { required: true })}
                placeholder="Event Fee"
                className={`input w-full ${errors.eventFee ? "border-error" : "border-base-300"}`}
              />
              {errors.eventFee && (
                <p className="text-error-content bg-error/20 p-2 rounded-md text-sm">
                  Event fee is required
                </p>
              )}
            </>
          )}

          {/* Max Attendees */}
          <input
            type="number"
            {...register("maxAttendees")}
            placeholder="Max Attendees (Optional)"
            className="input w-full border-base-300"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateEventModal;
