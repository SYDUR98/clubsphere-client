import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  FaArrowLeft,
  FaUserPlus,
  FaDoorOpen,
  FaTag,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaCalendarAlt,
  FaInfoCircle,
  FaImages,
  FaStar,
} from "react-icons/fa";
import LoadingPage from "../../components/Shared/LoadingPage";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isJoined, setIsJoined] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}/details`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!user?.email || !id) return;
    axiosSecure
      .get(`/clubs/is-member?clubId=${id}&userEmail=${user.email}`)
      .then((res) => setIsJoined(res.data.isMember));
  }, [id, user?.email, axiosSecure]);

  const handleJoin = async () => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login first", "info");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      const res = await axiosSecure.post(`/clubs/join/${id}`, {
        userEmail: user.email,
      });
      Swal.fire("Success", res.data.message || "Joined", "success");
      setIsJoined(true);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  if (isLoading) return <LoadingPage />;

  const banner = imgError
    ? "https://via.placeholder.com/900x400?text=No+Image"
    : club.bannerImage;

  return (
    <div className="min-h-screen bg-base-100 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4">

        {/* Banner / Media */}
        <div className="relative">
          <img
            src={banner}
            onError={() => setImgError(true)}
            className="w-full h-[420px] object-cover rounded-2xl border border-base-300 shadow-lg"
            alt={club.clubName}
          />
          <Link
            to="/"
            className="absolute top-4 left-4 btn btn-circle btn-sm bg-base-100/70 backdrop-blur"
          >
            <FaArrowLeft />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description / Overview */}
            <section className="bg-base-100 p-6 rounded-2xl border border-base-300">
              <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {club.clubName}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <FaInfoCircle className="text-primary" />
                <h2 className="text-xl font-bold">Overview</h2>
              </div>

              <p className="text-base-content/80 leading-relaxed">
                {club.description || "No description available."}
              </p>
            </section>

            {/* Gallery / Multiple Media */}
            <section className="bg-base-100 p-6 rounded-2xl border border-base-300">
              <div className="flex items-center gap-2 mb-4">
                <FaImages className="text-secondary" />
                <h2 className="text-xl font-bold">Gallery</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={banner}
                    alt="gallery"
                    className="h-32 w-full object-cover rounded-lg opacity-80 hover:opacity-100 transition"
                  />
                ))}
              </div>
            </section>

            {/* Reviews / Ratings (Optional) */}
            <section className="bg-base-100 p-6 rounded-2xl border border-base-300">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FaStar className="text-yellow-400" /> Reviews & Ratings
              </h2>
              <p className="text-base-content/60 italic">
                No reviews yet. Be the first to review this club.
              </p>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-base-200 p-6 rounded-2xl border border-base-300 sticky top-24">

              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaTag className="text-accent" /> Key Information
              </h3>

              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-2">
                  <FaTag /> {club.category}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {club.location}
                </p>
                <p className="flex items-center gap-2 text-success font-bold">
                  <FaMoneyBill />
                  {club.membershipFee === 0
                    ? "Free"
                    : `৳ ${club.membershipFee}`}
                </p>
                <p className="break-all text-xs opacity-80">
                  Manager: {club.managerEmail}
                </p>
              </div>

              <button
                onClick={() =>
                  isJoined ? navigate(`/event/clubs/${id}`) : handleJoin()
                }
                className={`btn w-full mt-6 text-white ${
                  isJoined
                    ? "bg-gradient-to-r from-green-500 to-teal-500"
                    : "bg-gradient-to-r from-orange-500 to-red-500"
                }`}
              >
                {isJoined ? (
                  <>
                    <FaDoorOpen /> Visit Events
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Join Club
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>

        {/* Related Items */}
        <section className="mt-16 pt-10 border-t border-base-300">
          <h2 className="text-2xl font-bold mb-6">Related Clubs</h2>
          <p className="text-base-content/60 italic">
            More clubs from {club.category} category coming soon...
          </p>
        </section>
      </div>
    </div>
  );
};

export default ClubDetails;
