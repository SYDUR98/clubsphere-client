// src/pages/dashboard/manager/MyEvent.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // Fetch manager's own events
  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events/my");
      return res.data; // Ensure each event has clubName or clubId populated
    },
  });

  // Delete an event
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/events/${id}`);
        refetch();
        Swal.fire("Deleted!", "Event deleted successfully.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete event", "error");
      }
    }
  };

  // Edit an event (open modal)
  const handleEdit = (event) => {
    const formattedEvent = {
      ...event,
      eventDate: new Date(event.eventDate).toISOString().split("T")[0],
      clubName: event.clubName || event.clubId?.clubName || "Unknown",
    };
    setSelectedEvent(formattedEvent);
    reset(formattedEvent);
  };

  // Update event
  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/events/${selectedEvent._id}`, data);
      Swal.fire("Updated!", "Event updated successfully", "success");
      setSelectedEvent(null);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update event", "error");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center
                     bg-gradient-to-r from-primary via-secondary to-accent
                     bg-clip-text text-transparent">
        My Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-neutral">No events found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-base-200">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Event Date</th>
                <th>Location</th>
                <th>Type / Fee</th>
                <th>Max Attendees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="hover:bg-base-100 transition-colors">
                  <th>{index + 1}</th>
                  <td className="text-primary font-semibold">{event.title}</td>
                  <td className="text-neutral">{event.description}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>
                    {event.isPaid ? (
                      <span className="badge badge-error">Paid - ৳{event.eventFee}</span>
                    ) : (
                      <span className="badge badge-success">Free</span>
                    )}
                  </td>
                  <td>{event.maxAttendees || "-"}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="btn btn-sm btn-primary hover:btn-accent transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-error hover:btn-warning transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Event Modal */}
      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={onSubmit}
          register={register}
          watch={watch}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MyEvent;

// ------------------------
// EditEventModal Component
// ------------------------
const EditEventModal = ({ event, onClose, onSubmit, register, watch, handleSubmit }) => {
  const isPaid = watch("isPaid", event.isPaid || false);

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg text-primary">Edit Event</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
          {/* Club Name fixed */}
          <input
            {...register("clubName")}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />

          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Event Title"
          />
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          />
          <input
            {...register("eventDate", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
          <input
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="Location"
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isPaid")} className="checkbox checkbox-primary" />
            <label className="text-neutral font-medium">Paid Event?</label>
          </div>
          {isPaid && (
            <input
              {...register("eventFee", { required: true })}
              type="number"
              placeholder="Event Fee"
              className="input input-bordered w-full"
            />
          )}

          <input
            {...register("maxAttendees")}
            type="number"
            placeholder="Max Attendees (Optional)"
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button type="submit" className="btn btn-primary hover:btn-accent">
              Save
            </button>
            <button type="button" className="btn btn-outline btn-neutral" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
