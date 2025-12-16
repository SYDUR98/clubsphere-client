import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const MemberPayments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["member-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/member/all/payments");
      return res.data.payments;
    },
  });

  if (isLoading)
    return (
       <LoadingPage></LoadingPage>
    );

  if (isError)
    return (
      <div className="text-center text-error">Failed to load payments</div>
    );

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
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          MY PAYMENTS
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

      {data.length === 0 ? (
        <p className="text-center text-neutral mt-10">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full rounded-xl shadow-xl">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Amount (৳)</th>
                <th>Type</th>
                <th>Club</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={p._id} className="hover:bg-base-200 transition-colors">
                  <td>{i + 1}</td>
                  <td className="text-primary font-medium">{p.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-sm ${
                        p.eventId
                          ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white" // Event color
                          : "bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 text-white" // Club color
                      }`}
                    >
                      {p.eventId ? "Event" : "Club"}
                    </span>
                  </td>

                  <td
                    className={
                      p.clubName
                        ? "text-green-600 font-semibold"
                        : "text-gray-500"
                    }
                  >
                    {p.clubName || "-"}
                  </td>

                  <td
                    className={
                      p.eventTitle
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }
                  >
                    {p.eventTitle || "-"}
                  </td>

                  <td className="text-base-content">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "completed"
                          ? "bg-gradient-to-r from-success to-secondary text-white"
                          : p.status === "pending"
                          ? "bg-gradient-to-r from-warning to-accent text-white"
                          : "bg-gradient-to-r from-error to-secondary text-white"
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberPayments;
