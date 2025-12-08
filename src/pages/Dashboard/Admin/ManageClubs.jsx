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
      <h2 className="text-3xl font-bold text-center mb-6">Manage Clubs</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <td>{index + 1}</td>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td>{club.category}</td>

                <td>
                  <span
                    className={`badge
                      ${club.status === "approved" && "badge-success"}
                      ${club.status === "rejected" && "badge-error"}
                      ${club.status === "pending" && "badge-warning"}
                    `}
                  >
                    {club.status}
                  </span>
                </td>

                <td className="text-center space-x-2">
                  <button
                    disabled={club.status === "approved"}
                    onClick={() =>
                      handleStatusChange(club._id, "approved")
                    }
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    disabled={club.status === "rejected"}
                    onClick={() =>
                      handleStatusChange(club._id, "rejected")
                    }
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clubs.length === 0 && (
          <p className="text-center py-6 text-neutral">
            No clubs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageClubs;
