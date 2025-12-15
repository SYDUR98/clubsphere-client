import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const EventRegistrations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedEventId, setSelectedEventId] = useState("");

  //  Manager events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["managerEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/events");
      return res.data;
    },
  });

  //  Event registrations
  const { data: registrations = [], isLoading: regLoading } = useQuery({
    queryKey: ["registrations", selectedEventId],
    enabled: !!selectedEventId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/events/${selectedEventId}/registrations`
      );
      return res.data;
    },
  });

  // 🔹 Cancel registration
  const cancelMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.delete(`/manager/registrations/${id}`),
    onSuccess: () => {
      Swal.fire("Cancelled!", "Registration removed", "success");
      queryClient.invalidateQueries({
        queryKey: ["registrations", selectedEventId],
      });
    },
  });

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
          EVENT REGISTRATIONS
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

      {/*  EVENT DROPDOWN */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Select Event</label>
        <select
          className="select select-bordered w-full"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">-- Select an Event --</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title} ({ev.clubName})
            </option>
          ))}
        </select>
      </div>

      {/*  REGISTRATIONS TABLE */}
      {selectedEventId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Registered Members</h3>

          {regLoading ? (
            <p>Loading registrations...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Email</th>
                    <th>Status</th>
                    <th>Registered At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, index) => (
                    <tr key={r._id}>
                      <td>{index + 1}</td>
                      <td>{r.userEmail}</td>
                      <td>
                        <span className="badge badge-success">registered</span>
                      </td>
                      <td>{new Date(r.registeredAt).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => cancelMutation.mutate(r._id)}
                          className="btn btn-xs btn-error"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}

                  {registrations.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No registrations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
