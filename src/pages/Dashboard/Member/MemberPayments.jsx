
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MemberPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["member-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/member/all/payments");
      return res.data.payments;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return <div className="text-center text-error">Failed to load payments</div>;

  return (
    <div className="p-6 bg-base-100">
      <h2
        className="
          text-2xl font-bold mb-4 text-center
          bg-gradient-to-r from-primary via-secondary to-accent
          bg-clip-text text-transparent
        "
      >
        My Payments
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-neutral mt-10">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
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
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td className="text-primary font-medium">{p.amount}</td>
                  <td className="text-base-content">{p.type}</td>
                  <td className="text-base-content">{p.clubName || "-"}</td>
                  <td className="text-base-content">{p.eventId || "-"}</td>
                  <td className="text-base-content">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "completed"
                          ? "badge-success"
                          : p.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
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
