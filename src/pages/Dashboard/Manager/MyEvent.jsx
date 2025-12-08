import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm();

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/events/${id}`);
      refetch();
      Swal.fire("Deleted!", "Event deleted successfully.", "success");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    reset(event);
  };

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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Events</h2>

      {events.length === 0 ? (
        <p className="text-center text-neutral">No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Location</th>
                <th>Type / Fee</th>
                <th>Max Attendees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <th>{index + 1}</th>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>
                    {event.isPaid ? `Paid - ৳${event.eventFee}` : "Free"}
                  </td>
                  <td>{event.maxAttendees || "-"}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-error"
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

      {/* Edit Modal */}
      {selectedEvent && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Event</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 mt-4"
            >
              <input
                {...register("title")}
                className="input w-full"
                placeholder="Event Title"
              />
              <textarea
                {...register("description")}
                className="textarea w-full"
                placeholder="Description"
              />
              <input
                {...register("eventDate")}
                type="date"
                className="input w-full"
              />
              <input
                {...register("location")}
                className="input w-full"
                placeholder="Location"
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isPaid")} />
                <label>Paid Event?</label>
              </div>
              {watch("isPaid") && (
                <input
                  {...register("eventFee")}
                  type="number"
                  placeholder="Event Fee"
                  className="input w-full"
                />
              )}
              <input
                {...register("maxAttendees")}
                type="number"
                placeholder="Max Attendees"
                className="input w-full"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyEvent;
