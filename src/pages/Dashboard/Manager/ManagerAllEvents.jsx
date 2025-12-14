import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const ManagerAllEvents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch events
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["manager-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/all/events");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/manager/all/events/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Event deleted successfully.", "success");
      queryClient.invalidateQueries(["manager-events"]);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosSecure.patch(`/manager/all/events/${id}`, data);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Event updated successfully.", "success");
      queryClient.invalidateQueries(["manager-events"]);
      setSelectedEvent(null);
    },
  });

  // Handlers
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    const updatedData = {
      title: editForm.title,
      location: editForm.location,
      maxAttendees: Number(editForm.maxAttendees),
      eventFee: selectedEvent.isPaid ? Number(editForm.eventFee) : 0,
      eventDate: new Date(editForm.eventDate).toISOString(),
    };
    updateMutation.mutate({ id: selectedEvent._id, data: updatedData });
  };

  if (isLoading)
    return <LoadingPage></LoadingPage>;
  if (isError)
    return <p className="text-center py-10 text-error">Failed to load events.</p>;

  return (
    <div className="p-6 bg-base-100">
        <div>
        <h2
          className="
      text-4xl md:text-3xl font-extrabold mb-8 text-center
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
          MANAGED EVENTS
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


      <div className="overflow-x-auto bg-base-200 shadow-xl rounded-xl">
        <table className="table table-zebra w-full rounded-lg">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Location</th>
              <th>Paid</th>
              <th>Fee</th>
              <th>Max Attendees</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, idx) => (
              <tr key={ev._id} className="hover:bg-base-200 transition-colors">
                <td>{idx + 1}</td>
                <td className="font-medium text-primary">{ev.title}</td>
                <td>{ev.clubName}</td>
                <td>{new Date(ev.eventDate).toLocaleString()}</td>
                <td>{ev.location}</td>
                <td>
                  {ev.isPaid ? (
                    <span className="badge bg-gradient-to-r from-success to-secondary text-white">Paid</span>
                  ) : (
                    <span className="badge bg-gradient-to-r from-info to-accent text-white">Free</span>
                  )}
                </td>
                <td>{ev.isPaid ? `৳${ev.eventFee}` : "-"}</td>
                <td>{ev.maxAttendees || "-"}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setSelectedEvent(ev);
                      setEditForm(ev);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(ev._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>
            <div className="space-y-3">
              <input
                className="input input-bordered w-full"
                name="title"
                value={editForm.title || ""}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                name="eventDate"
                value={
                  editForm.eventDate
                    ? new Date(editForm.eventDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleEditChange}
              />
              <input
                className="input input-bordered w-full"
                name="location"
                value={editForm.location || ""}
                onChange={handleEditChange}
                placeholder="Location"
              />
              {selectedEvent.isPaid && (
                <input
                  type="number"
                  className="input input-bordered w-full"
                  name="eventFee"
                  value={editForm.eventFee || 0}
                  onChange={handleEditChange}
                  placeholder="Event Fee"
                />
              )}
              <input
                type="number"
                className="input input-bordered w-full"
                name="maxAttendees"
                value={editForm.maxAttendees || 0}
                onChange={handleEditChange}
                placeholder="Max Attendees"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-sm btn-success"
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button
                className="btn btn-sm"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerAllEvents;
