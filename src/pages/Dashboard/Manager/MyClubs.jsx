import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const MyClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ["my-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/manager/${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This club will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });
    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/clubs/${id}`);
        await refetch();
        Swal.fire("Deleted!", "Club deleted successfully.", "success");
      } catch (err) {
        // console.error("Delete club failed:", err);
        Swal.fire("Error!", err?.response?.data?.message || "Failed to delete club", "error");
      }
    }
  };

  const handleEdit = (club) => {
    setSelectedClub(club);
    // populate form
    reset({
      clubName: club.clubName || "",
      description: club.description || "",
      location: club.location || "",
      bannerImage: club.bannerImage || "",
      category: club.category || "",
    });
  };

  const onSubmit = async (data) => {
    if (!selectedClub) return;
    try {
      await axiosSecure.patch(`/clubs/${selectedClub._id}`, data);
      await refetch();
      Swal.fire("Updated!", "Club updated successfully.", "success");
      setSelectedClub(null);
    } catch (err) {
      console.error("Update club failed:", err);
      Swal.fire("Error!", err?.response?.data?.message || "Failed to update club", "error");
    }
  };

  if (isLoading) return <LoadingPage/>;

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
          MY CLUBS
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


      {clubs.length === 0 ? (
        <p className="text-center">You have not created any clubs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club._id}>
                  <td className="w-32">
                    {club.bannerImage ? (
                      <img
                        src={club.bannerImage}
                        alt={club.clubName}
                        className="h-16 w-28 object-cover rounded"
                      />
                    ) : (
                      <div className="h-16 w-28 bg-gray-200 rounded flex items-center justify-center text-sm">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="font-semibold">{club.clubName}</div>
                    <div className="text-xs text-neutral">{new Date(club.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td>{club.category || "—"}</td>
                  <td>{club.location || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        club.status === "approved"
                          ? "badge-success"
                          : club.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {club.status || "pending"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(club)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {selectedClub && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Club</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
              <label className="label">
                <span className="label-text">Club Name</span>
              </label>
              <input {...register("clubName")} className="input w-full" />

              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea {...register("description")} className="textarea w-full" />

              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input {...register("category")} className="input w-full" />

              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input {...register("location")} className="input w-full" />

              <label className="label">
                <span className="label-text">Banner Image URL</span>
              </label>
              <input {...register("bannerImage")} className="input w-full" />

              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedClub(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyClubs;
