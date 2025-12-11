// src/pages/admin/AdminPayments.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-error text-center py-10">Failed to load payments.</p>;
  }

  return (
    <div className="p-6 bg-base-100">
      <h2
        className="text-2xl font-extrabold mb-6 text-center
                   bg-gradient-to-r from-primary via-secondary to-accent
                   bg-clip-text text-transparent"
      >
        All Payments
      </h2>

      <div className="overflow-x-auto rounded-xl border border-base-200 shadow-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr className="text-base-content font-semibold">
              <th>#</th>
              <th>User Email</th>
              <th>Amount (৳)</th>
              <th>Type</th>
              <th>Club Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={p._id} className="hover:bg-base-300 transition-colors">
                <td>{index + 1}</td>
                <td className="text-primary font-medium">{p.userEmail}</td>
                <td className="text-success font-semibold">{p.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      p.type === "paid"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {p.type}
                  </span>
                </td>
                <td className="text-secondary">{p.clubName || "-"}</td>
                <td className="text-sm text-black">
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
