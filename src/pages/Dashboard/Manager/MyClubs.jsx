import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Only for fetching
  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/manager/${user.email}`);
      return res.data;
    },
  });

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This club will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/clubs/${id}`);
      refetch(); // refresh list after delete

      Swal.fire("Deleted!", "Club deleted successfully.", "success");
    }
  };

  //  Open edit modal
  const handleEdit = (club) => {
    setSelectedClub(club);
    reset(club);
  };

  // Update submit
  const onSubmit = async (data) => {
    await axiosSecure.patch(`/clubs/${selectedClub._id}`, data);
    refetch(); // refresh list after update

    Swal.fire("Updated!", "Club updated successfully.", "success");
    setSelectedClub(null);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Clubs</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="bg-base-100 p-4 rounded-xl shadow">
            <img
              src={club.bannerImage}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="text-xl font-bold mt-2">{club.clubName}</h3>
            <p>{club.category}</p>
            <p>{club.location}</p>

            <span
              className={`badge mt-2 ${
                club.status === "approved"
                  ? "badge-success"
                  : club.status === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {club.status}
            </span>

            <div className="mt-4 flex gap-2 flex-wrap">
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

              {club.status === "approved" ? (
                <button className="btn btn-sm btn-success">
                  Create Event
                </button>
              ) : (
                <button disabled className="btn btn-sm btn-disabled">
                  Pending Approval
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/*  Edit Modal */}
      {selectedClub && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Club</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
              <input {...register("clubName")} className="input w-full" />
              <textarea {...register("description")} className="textarea w-full" />
              <input {...register("location")} className="input w-full" />
              <input {...register("bannerImage")} className="input w-full" />

              <div className="flex justify-end gap-2">
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
