import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../components/Shared/LoadingPage";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role change
  const handleRoleChange = async (email, role) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Make this user a ${role}?`,
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success!", `User role updated`, "success");
      }
    }
  };

  //  Delete user
  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${email}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    }
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="p-6">
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
          MANAGE USERS
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

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl border border-base-300">
        <table className="table table-zebra text-base-content">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge px-3 py-2 
                    ${user.role === "admin" && "badge-success"}
                    ${user.role === "clubManager" && "badge-info"}
                    ${user.role === "member" && "badge-neutral"}
                  `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="text-center space-x-2">
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleChange(user.email, "admin")}
                    className="btn btn-xs btn-success"
                  >
                    Make Admin
                  </button>

                  <button
                    disabled={user.role === "clubManager"}
                    onClick={() => handleRoleChange(user.email, "clubManager")}
                    className="btn btn-xs btn-info"
                  >
                    Make Manager
                  </button>

                  <button
                    disabled={user.role === "member"}
                    onClick={() => handleRoleChange(user.email, "member")}
                    className="btn btn-xs btn-secondary"
                  >
                    Make Member
                  </button>

                  <button
                    onClick={() => handleDelete(user.email)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-neutral py-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
