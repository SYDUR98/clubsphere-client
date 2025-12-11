import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import EventFilterBar from "../../../components/Shared/EventFilterBar";

const MyMemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [paidStatus, setPaidStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedClub] = useDebounce(clubFilter, 500);
  const [debouncedLocation] = useDebounce(locationFilter, 500);

  const { data: events = [], isLoading } = useQuery({
    queryKey: [
      "member-events",
      debouncedSearch,
      debouncedClub,
      debouncedLocation,
      dateFrom,
      dateTo,
      paidStatus,
      sortBy,
    ],
    queryFn: async () => {
      if (!user?.email) return [];

      const res = await axiosSecure.get(
        `/member/register/events?email=${user.email}`
      );
      let filtered = res.data;

      // Search & filters
      if (debouncedSearch) {
        filtered = filtered.filter((ev) =>
          ev.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }
      if (debouncedClub) {
        filtered = filtered.filter((ev) =>
          ev.clubName.toLowerCase().includes(debouncedClub.toLowerCase())
        );
      }
      if (debouncedLocation) {
        filtered = filtered.filter((ev) =>
          ev.location.toLowerCase().includes(debouncedLocation.toLowerCase())
        );
      }
      if (dateFrom) {
        filtered = filtered.filter(
          (ev) => new Date(ev.eventDate) >= new Date(dateFrom)
        );
      }
      if (dateTo) {
        filtered = filtered.filter(
          (ev) => new Date(ev.eventDate) <= new Date(dateTo)
        );
      }
      if (paidStatus === "paid") {
        filtered = filtered.filter((ev) => ev.isPaid);
      }
      if (paidStatus === "free") {
        filtered = filtered.filter((ev) => !ev.isPaid);
      }

      // Sorting
      if (sortBy === "newest")
        filtered.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
      if (sortBy === "oldest")
        filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      if (sortBy === "highestFee")
        filtered.sort((a, b) => (b.eventFee || 0) - (a.eventFee || 0));
      if (sortBy === "lowestFee")
        filtered.sort((a, b) => (a.eventFee || 0) - (b.eventFee || 0));

      return filtered;
    },
    keepPreviousData: true,
  });

  const handleDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="p-6 bg-base-100">
      <h2
        className="text-3xl font-extrabold mb-6 text-center
               bg-gradient-to-r from-primary via-secondary to-accent
               bg-clip-text text-transparent"
      >
        My Registered Events
      </h2>

      <EventFilterBar
        search={search}
        setSearch={setSearch}
        club={clubFilter}
        setClub={setClubFilter}
        location={locationFilter}
        setLocation={setLocationFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        paidStatus={paidStatus}
        setPaidStatus={setPaidStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map((ev) => (
          <motion.div
            key={ev._id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className={`bg-base-100 p-5 rounded-xl shadow-lg border border-base-200
                    cursor-pointer transition-all duration-300 hover:shadow-xl`}
          >
            <h3 className="text-xl font-bold text-primary">{ev.title}</h3>
            <p className="text-sm text-neutral mt-1 truncate">
              {ev.description}
            </p>

            <p className="text-sm mt-2">
              <strong className="text-secondary">Club:</strong> {ev.clubName}
            </p>
            <p className="text-sm">
              <strong className="text-secondary">Location:</strong>{" "}
              {ev.location}
            </p>
            <p className="text-sm">
              <strong className="text-secondary">Date:</strong>{" "}
              {new Date(ev.eventDate).toLocaleDateString()}
            </p>

            <p className="text-sm mt-1">
              <strong className="text-secondary">Fee:</strong>{" "}
              {ev.isPaid ? (
                <span className="badge badge-error">৳ {ev.eventFee}</span>
              ) : (
                <span className="badge badge-success">Free</span>
              )}
            </p>

            <p className="text-sm mt-1">
              <strong className="text-secondary">Status:</strong>{" "}
              {ev.isRegistered ? (
                <span className="badge badge-success">Registered</span>
              ) : (
                <span className="badge badge-warning">Not Registered</span>
              )}
            </p>

            <button
              onClick={() => handleDetails(ev._id)}
              className="btn btn-info mt-4 w-full hover:btn-accent transition-colors"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {events.length === 0 && !isLoading && (
        <p className="text-center text-neutral mt-10">No events found.</p>
      )}
    </div>
  );
};

export default MyMemberEvents;
