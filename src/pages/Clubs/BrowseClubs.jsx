import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import FilterBar from "../../components/Shared/FilterBar";

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

      const res = await axiosSecure.get(`/clubs?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // joined clubs
  useEffect(() => {
    if (!user?.email || clubs.length === 0) return;

    const fetchMembershipStatus = async () => {
      const statusPromises = clubs.map(async (club) => {
        const check = await axiosSecure.get(
          `/clubs/is-member?clubId=${club._id}&userEmail=${user.email}`
        );
        return { clubId: club._id, isMember: check.data.isMember };
      });

      const statusResults = await Promise.all(statusPromises);
      setJoinedClubs((prev) => {
        const newState = { ...prev };
        statusResults.forEach((item) => {
          newState[item.clubId] = item.isMember;
        });
        return newState;
      });
    };

    fetchMembershipStatus();
  }, [clubs, user?.email, axiosSecure]);

  // upcoming events
  useEffect(() => {
    if (!user?.email || clubs.length === 0) return;

    const fetchUpcomingEvents = async () => {
      try {
        const res = await axiosSecure.get(`/member/clubs?email=${user.email}`);
        const eventsData = {};
        res.data.forEach((club) => {
          eventsData[club.clubId] = club.upcomingEventsCount || 0;
        });
        setUpcomingEvents(eventsData);
      } catch (err) {
        console.error("Failed to fetch upcoming events", err);
      }
    };

    fetchUpcomingEvents();
  }, [clubs, user?.email, axiosSecure]);

  const handleJoin = async (club) => {
    if (!user?.email) {
      Swal.fire("Error", "Please login first", "error");
      return;
    }

    try {
      const res = await axiosSecure.post(`/clubs/join/${club._id}`, {
        userEmail: user.email,
      });

      if (res.data.url) {
        window.location.assign(res.data.url);
        return;
      }

      Swal.fire("Success", res.data.message, "success");
      setJoinedClubs((prev) => ({ ...prev, [club._id]: true }));
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  const handleDetails = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Browse Clubs</h2>

      <FilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        location={location} setLocation={setLocation}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <motion.div
            key={club._id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="bg-base-100 p-4 rounded-xl shadow-lg border cursor-pointer"
          >
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold">{club.clubName}</h3>
            <p className="text-sm text-neutral mt-1 truncate">{club.description}</p>
            <p className="mt-2 text-sm"><strong>Category:</strong> {club.category}</p>
            <p className="text-sm"><strong>Location:</strong> {club.location}</p>
            <p className="text-sm"><strong>Fee:</strong> {club.membershipFee === 0 ? "Free" : `৳ ${club.membershipFee}`}</p>
            <p className="text-sm"><strong>Upcoming Events:</strong> {upcomingEvents[club._id] || 0}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleDetails(club._id)} className="btn btn-info flex-1">Details</button>
              <button
                onClick={() => handleJoin(club)}
                disabled={joinedClubs[club._id]}
                className={`btn flex-1 ${joinedClubs[club._id] ? "btn-disabled" : "btn-primary"}`}
              >
                {joinedClubs[club._id] ? "Joined" : "Join Club"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {clubs.length === 0 && !isLoading && (
        <p className="text-center text-neutral mt-10">No clubs found.</p>
      )}
    </div>
  );
};

export default BrowseClubs;
