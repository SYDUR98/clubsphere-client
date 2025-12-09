import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; 

const BrowseClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // State for user input (instant updates)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  
  // State to track joined status
  const [joinedClubs, setJoinedClubs] = useState({});

  // 1. Fetch ALL approved clubs once
  const { data: allClubs = [], isLoading } = useQuery({
    queryKey: ["allClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs`); 
      return res.data;
    },
  });
  
  // 2. Client-Side Filtering Logic
  const filteredClubs = useMemo(() => {
    if (allClubs.length === 0) return [];
    
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCategory = category.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    
    return allClubs.filter(club => {
      const clubName = club.clubName.toLowerCase();
      const clubCategory = club.category.toLowerCase();
      const clubLocation = club.location.toLowerCase();
      
      const matchesSearch = normalizedSearch ? clubName.includes(normalizedSearch) : true;
      const matchesCategory = normalizedCategory ? clubCategory.includes(normalizedCategory) : true;
      const matchesLocation = normalizedLocation ? clubLocation.includes(normalizedLocation) : true;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [allClubs, search, category, location]);

  
  useEffect(() => {
    if (!user?.email || allClubs.length === 0) return;

    const fetchMembershipStatus = async () => {
      const statusPromises = allClubs.map(async (club) => {
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
  }, [allClubs, user?.email, axiosSecure]);

  // 4. Handle join logic
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 
      }
    }
  };

  
  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
  };


  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Browse Clubs</h2>

      {/* Filters */}
      <div key="club-filters" className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search club name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-64"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full md:w-48"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full md:w-48"
        />
      </div>

      {/* Clubs:   */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredClubs.map((club) => ( 
          <motion.div
            key={club._id}
            variants={item} 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="bg-base-100 p-4 rounded-xl shadow-lg border cursor-pointer"
          >
            {/* Card content */}
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold">{club.clubName}</h3>
            <p className="text-sm text-neutral mt-1">{club.description}</p>
            <p className="mt-2 text-sm">
              <strong>Category:</strong> {club.category}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {club.location}
            </p>
            <p className="text-sm">
              <strong>Fee:</strong> {club.membershipFee === 0 ? "Free" : `৳ ${club.membershipFee}`}
            </p>
            <button
              onClick={() => handleJoin(club)}
              disabled={joinedClubs[club._id]}
              className={`btn w-full mt-4 ${joinedClubs[club._id] ? "btn-disabled" : "btn-primary"}`}
            >
              {joinedClubs[club._id] ? "Joined" : "Join Club"}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {filteredClubs.length === 0 && <p className="text-center text-neutral mt-10">No clubs found.</p>}
    </div>
  );
};

export default BrowseClubs;