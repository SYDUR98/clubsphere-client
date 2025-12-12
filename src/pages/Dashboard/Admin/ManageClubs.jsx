import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/clubs");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Set status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/admin/clubs/${id}`, { status });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Updated!", `Club marked as ${status}`, "success");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Manage Clubs
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra table-auto">
          <thead className="bg-base-200 text-neutral">
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Club Name</th>
              <th className="text-left">Manager Email</th>
              <th className="text-left">Category</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-neutral">
                  No clubs found.
                </td>
              </tr>
            )}

            {clubs.map((club, index) => (
              <tr
                key={club._id}
                className="hover:bg-base-200 transition-colors duration-200"
              >
                <td>{index + 1}</td>
                <td className="font-medium text-primary">{club.clubName}</td>
                <td className="text-sm text-neutral">{club.managerEmail}</td>
                <td className="text-sm text-secondary">{club.category}</td>

                <td>
                  <span
                    className={`badge 
                  ${club.status === "approved" ? "badge-success" : ""}
                  ${club.status === "rejected" ? "badge-error" : ""}
                  ${club.status === "pending" ? "badge-warning" : ""}
                `}
                  >
                    {club.status}
                  </span>
                </td>

                <td className="text-center flex justify-center gap-2">
                  <button
                    disabled={club.status === "approved"}
                    onClick={() => handleStatusChange(club._id, "approved")}
                    className="btn btn-xs btn-success hover:bg-green-600 transition-colors duration-200"
                  >
                    Approve
                  </button>

                  <button
                    disabled={club.status === "rejected"}
                    onClick={() => handleStatusChange(club._id, "rejected")}
                    className="btn btn-xs btn-error hover:bg-red-600 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClubs;
