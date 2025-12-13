import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EventRegistrations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Manager events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["managerEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/events");
      return res.data;
    },
  });

  // Event registrations
  const { data: registrations = [] } = useQuery({
    queryKey: ["registrations", selectedEventId],
    enabled: !!selectedEventId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/events/${selectedEventId}/registrations`
      );
      return res.data;
    },
  });

  //Cancel registration
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/manager/registrations/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Registration removed", "success");
      queryClient.invalidateQueries({
        queryKey: ["registrations", selectedEventId],
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>

      {/* EVENTS TABLE */}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Title</th>
            <th>Club</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev._id}>
              <td>{ev.title}</td>
              <td>{ev.clubName}</td>
              <td>{new Date(ev.eventDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setSelectedEventId(ev._id)}
                >
                  View Registrations
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* REGISTRATIONS TABLE */}
      {selectedEventId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">
            Event Registrations
          </h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Registered At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r._id}>
                  <td>{r.userEmail}</td>
                  <td>
                    <span className="badge badge-success">
                      registered
                    </span>
                  </td>
                  <td>
                    {new Date(r.registeredAt).toLocaleString()}
                  </td>
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
                  <td colSpan="4" className="text-center">
                    No registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
