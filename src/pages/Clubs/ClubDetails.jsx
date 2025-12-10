import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isJoined, setIsJoined] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Fetch club details with upcoming events count
  const { data: club = {}, isLoading: clubLoading } = useQuery({
    queryKey: ["club-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}/details`);
      return res.data;
    },
  });

  // Check membership
  useEffect(() => {
    if (!user?.email || !id) return;

    const checkMember = async () => {
      const res = await axiosSecure.get(
        `/clubs/is-member?clubId=${id}&userEmail=${user.email}`
      );
      setIsJoined(res.data.isMember);
    };

    checkMember();
  }, [id, user?.email, axiosSecure]);

  const handleJoin = async () => {
    if (!user?.email) {
      Swal.fire("Error", "Please login first", "error");
      navigate("/login");
      return;
    }

    try {
      const res = await axiosSecure.post(`/clubs/join/${id}`, {
        userEmail: user.email,
      });

      if (res.data.url) {
        window.location.assign(res.data.url);
        return;
      }

      Swal.fire(
        "Success",
        res.data.message || "Joined successfully",
        "success"
      );
      setIsJoined(true);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (clubLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const imageUrl = imgError
    ? "https://via.placeholder.com/800x400?text=Image+Not+Available"
    : club.bannerImage;

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl flex flex-col">
      {/* Club banner */}
      <img
        src={imageUrl}
        alt={club.clubName}
        onError={() => setImgError(true)}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{club.clubName}</h1>
      <p className="text-neutral mb-4">{club.description}</p>

      {/* Club info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
        <p>
          <strong>Category:</strong> {club.category}
        </p>
        <p>
          <strong>Location:</strong> {club.location}
        </p>
        <p>
          <strong>Membership Fee:</strong>{" "}
          {club.membershipFee === 0 ? `Free` : `৳ ${club.membershipFee}`}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`badge px-3 py-2 font-semibold 
            ${club.status === "approved" ? "badge-success" : ""}
            ${club.status === "pending" ? "badge-warning" : ""}
            ${club.status === "rejected" ? "badge-error" : ""}`}
          >
            {club.status}
          </span>
        </p>
        <p>
          <strong>Manager Email:</strong> {club.managerEmail}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(club.createdAt).toLocaleString()}
        </p>
        {club.updatedAt && (
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(club.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Upcoming Events Count */}
      {isJoined && (
        <div className="mt-6">
          <sapn className="text-2xl font-bold mb-2">Upcoming Events:</sapn>
          <span className="text-neutral font-bold text-2xl ml-4">
            {club.upcomingEventsCount || 0}
          </span>
        </div>
      )}

      {/* Join / Visit button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            if (isJoined) {
              navigate(`/dashboard/member/event/clubs/${id}`);
            } else {
              handleJoin();
            }
          }}
          className={`btn ${isJoined ? "btn-info" : "btn-primary"}`}
        >
          {isJoined ? "Visit / Show Events" : "Join Club"}
        </button>
      </div>
    </div>
  );
};

export default ClubDetails;
