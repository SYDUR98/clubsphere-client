import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import FilterBar from "../../components/Shared/FilterBar";
import {
  FaTag,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaCalendarAlt,
  FaInfoCircle,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";
import LoadingPage from "../../components/Shared/LoadingPage";

const BrowseClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [joinedClubs, setJoinedClubs] = useState({});
  const [upcomingEvents, setUpcomingEvents] = useState({});

  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedCategory] = useDebounce(category, 500);
  const [debouncedLocation] = useDebounce(location, 500);

 
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", debouncedSearch, debouncedCategory, debouncedLocation, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (debouncedCategory) params.append("category", debouncedCategory);
      if (debouncedLocation) params.append("location", debouncedLocation);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await axiosSecure.get(`/clubs/display?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  
  useEffect(() => {
    if (!user?.email || clubs.length === 0) return;

    const fetchClubStatusAndEvents = async () => {
      try {
        const res = await axiosSecure.get(`/member/clubs?email=${user.email}`);
        const joinedClubsData = res.data;

        const newUpcomingEvents = {};
        joinedClubsData.forEach((club) => {
          newUpcomingEvents[String(club.clubId)] = club.upcomingEventsCount || 0;
        });
        setUpcomingEvents(newUpcomingEvents);

        const joinedClubIdSet = new Set(joinedClubsData.map((m) => String(m.clubId)));
        const newJoinedClubsStatus = {};
        clubs.forEach((club) => {
          newJoinedClubsStatus[club._id] = joinedClubIdSet.has(String(club._id));
        });
        setJoinedClubs(newJoinedClubsStatus);
      } catch (err) {
        console.error("Failed to fetch club status and events:", err);
        setUpcomingEvents({});
        setJoinedClubs({});
      }
    };

    fetchClubStatusAndEvents();
  }, [clubs, user?.email, axiosSecure]);

 
  const handleJoin = async (club) => {
    if (!user?.email) {
      Swal.fire("Error", "Please login first", "error");
      return;
    }

    try {
      const res = await axiosSecure.post(`/clubs/join/${club._id}`, { userEmail: user.email });

      if (res.data.url) {
        window.location.assign(res.data.url); // Stripe payment redirect
        return;
      }

      Swal.fire("Success", res.data.message, "success");
      setJoinedClubs((prev) => ({ ...prev, [club._id]: true }));
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleDetails = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  
  return (
    <div className="p-6">
      <h2 className="text-4xl md:text-2xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        CLUBS
      </h2>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* Filter/Search */}
      <FilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        location={location} setLocation={setLocation}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {isLoading ? <LoadingPage /> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {clubs.length === 0 && <p className="text-center col-span-3">No clubs found</p>}
          {clubs.map((club) => (
            <motion.div key={club._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="bg-base-100 p-4 rounded-xl shadow-lg border cursor-pointer"
            >
              <img src={club.bannerImage} alt={club.clubName} className="h-40 w-full object-cover rounded mb-3" />
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaTag className="text-primary" /> {club.clubName}
              </h3>
              <p className="text-sm text-neutral mt-1 truncate">{club.description}</p>
              <p className="mt-2 text-sm flex items-center gap-2"><FaTag /> <strong>Category:</strong> {club.category}</p>
              <p className="text-sm flex items-center gap-2"><FaMapMarkerAlt /> <strong>Location:</strong> {club.location}</p>
              <p className="text-sm flex items-center gap-2"><FaMoneyBill /> <strong>Fee:</strong> {club.membershipFee === 0 ? "Free" : `$ ${club.membershipFee}`}</p>
              <p className="text-sm flex items-center gap-2"><FaCalendarAlt /> <strong>Upcoming Events:</strong> {upcomingEvents[club._id] || 0}</p>

              <div className="flex gap-2 mt-4">
                <button onClick={() => handleDetails(club._id)}
                  className="btn flex-1 text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 transition-all">
                  <FaInfoCircle /> Details
                </button>
                <button onClick={() => handleJoin(club)}
                  disabled={joinedClubs[club._id]}
                  className={`btn flex-1 text-white font-semibold text-lg shadow-lg 
                    ${joinedClubs[club._id] 
                      ? "bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 btn-disabled"
                      : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"} 
                      hover:brightness-110 transition-all`}>
                  {joinedClubs[club._id] ? <><FaCheck /> Joined</> : <><FaUserPlus /> Join Club</>}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseClubs;
