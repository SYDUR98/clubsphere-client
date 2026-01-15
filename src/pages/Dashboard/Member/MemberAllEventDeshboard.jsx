import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../components/Shared/LoadingPage";

const MemberAllEventDeshboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myEvents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["member-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/all/events?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <p className="text-center py-10 text-error font-semibold">
        Failed to load events. Try again.
      </p>
    );

  if (myEvents.length === 0)
    return (
      <p className="text-center py-10 text-neutral font-medium">
        You have not registered for any events yet.
      </p>
    );

  return (
    <div className="p-6 bg-base-100 rounded-2xl shadow-xl border border-base-300">

      {/* Heading */}
      <div className="mb-10">
        <h2
          className="text-2xl md:text-4xl font-extrabold text-center
          bg-clip-text text-transparent tracking-wide"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          MY EVENTS
        </h2>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
              <th>Event</th>
            </tr>
          </thead>

          <tbody>
            {myEvents.map((event, i) => (
              <tr key={event.registrationId}>
                <td className="font-semibold text-primary">{i + 1}</td>

                <td className="font-semibold text-primary">
                  {event.title}
                </td>

                <td className="text-secondary font-medium">
                  {event.clubName}
                </td>

                <td className="text-base-content">
                  {new Date(event.eventDate).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`badge badge-md font-bold ${
                      event.status === "registered"
                        ? "badge-info"
                        : event.status === "attended"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </td>

                <td>
                  {event.expired ? (
                    <span className="text-error font-semibold">Expired</span>
                  ) : (
                    <span className="text-success font-semibold">Upcoming</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberAllEventDeshboard;
