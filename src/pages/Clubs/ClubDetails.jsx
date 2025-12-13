import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";

import {
  FaArrowLeft,
  FaUserPlus,
  FaDoorOpen,
  FaTag,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

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
    <div className="relative max-w-4xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl flex flex-col space-y-6">
      {/* Club banner */}
      <img
        src={imageUrl}
        alt={club.clubName}
        onError={() => setImgError(true)}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Club Title & Description */}
      <h1 className="text-3xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        {club.clubName}
      </h1>
      <p className="text-neutral mb-4">{club.description}</p>

      {/* Club Info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
        <p className="flex items-center gap-2">
          <FaTag className="text-primary" />
          <strong>Category:</strong> {club.category}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-secondary" />
          <strong>Location:</strong> {club.location}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBill className="text-success" />
          <strong>Membership Fee:</strong>{" "}
          {club.membershipFee === 0 ? "Free" : `৳ ${club.membershipFee}`}
        </p>
        <p className="flex items-center gap-2">
          <FaCheckCircle className="text-info" />
          <strong>Status:</strong>{" "}
          <span
            className={`badge px-3 py-2 font-semibold text-white ${
              club.status === "approved"
                ? "bg-success"
                : club.status === "pending"
                ? "bg-warning"
                : club.status === "rejected"
                ? "bg-error"
                : "bg-base-300"
            }`}
          >
            {club.status.toUpperCase()}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaUserTie className="text-accent" />
          <strong>Manager Email:</strong> {club.managerEmail}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-neutral" />
          <strong>Created At:</strong>{" "}
          {new Date(club.createdAt).toLocaleString()}
        </p>
        {club.updatedAt && (
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-neutral" />
            <strong>Updated At:</strong>{" "}
            {new Date(club.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Upcoming Events */}
      {isJoined && (
        <div className="flex items-center gap-2 mt-4 text-xl font-bold text-neutral">
          <FaCalendarAlt className="text-primary" />
          <span>Upcoming Events:</span>
          <span className="text-2xl">{club.upcomingEventsCount || 0}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Back Button */}
        <Link
          to="/"
          className="
      btn flex-1 flex items-center justify-center gap-2 text-white font-semibold text-lg
      bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
      hover:brightness-110 transition-all shadow-lg
    "
        >
          <FaArrowLeft /> Back
        </Link>

        {/* Join / Visit Button */}
        <button
          onClick={() => {
            if (isJoined) navigate(`/event/clubs/${id}`);
            else handleJoin();
          }}
          className={`
      btn flex-1 flex items-center justify-center gap-2 text-white font-semibold text-lg shadow-lg
      ${
        isJoined
          ? "bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400"
          : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
      }
      hover:brightness-110 transition-all
    `}
        >
          {isJoined ? (
            <>
              <FaDoorOpen /> Visit / Show Events
            </>
          ) : (
            <>
              <FaUserPlus /> Join Club
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ClubDetails;
