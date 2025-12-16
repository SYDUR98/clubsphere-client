// src/pages/admin/AdminPayments.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (isError) {
    return (
      <p className="text-error text-center py-10">Failed to load payments.</p>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-base-100">
      <div>
        <h2
          className="
        text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center
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
          ALL PAYMENTS
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

      <div className="overflow-x-auto rounded-xl border border-base-200 shadow-lg">
        <table className="table table-zebra w-full min-w-[640px]">
          <thead className="bg-base-200">
            <tr className="text-base-content font-semibold text-sm md:text-base">
              <th className="px-2 py-1 md:px-4 md:py-2">#</th>
              <th className="px-2 py-1 md:px-4 md:py-2">User Email</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Amount (৳)</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Type</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Club Name</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr
                key={p._id}
                className="hover:bg-base-300 transition-colors text-sm md:text-base"
              >
                <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                <td className="text-primary font-medium px-2 py-1 md:px-4 md:py-2">
                  {p.userEmail}
                </td>
                <td className="text-success font-semibold px-2 py-1 md:px-4 md:py-2">
                  {p.amount}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2">
                  <span
                    className={`badge ${
                      p.type
                        ? p.type === "event"
                          ? "badge-success"
                          : "badge-info"
                        : "badge-primary"
                    }`}
                  >
                    {p.type || "Club"}
                  </span>
                </td>
                <td className="text-secondary px-2 py-1 md:px-4 md:py-2">
                  {p.clubName || "-"}
                </td>
                <td className="text-sm text-black px-2 py-1 md:px-4 md:py-2">
                  {moment(p.createdAt).format("DD MMM YYYY, hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
