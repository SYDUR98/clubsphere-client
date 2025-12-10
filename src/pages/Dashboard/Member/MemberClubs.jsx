import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MemberClubs = () => {
  const { user } = useAuth();
  const axiosSecure  = useAxiosSecure()
  const navigate = useNavigate();

  const {
    data: joinedClubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myJoinedClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/clubs?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-error">
        Error loading clubs. Please try again.
      </p>
    );
  }

  if (joinedClubs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-neutral mb-4">
          You have not joined any clubs yet.
        </p>
        <button
          onClick={() => navigate("/browse-clubs")}
          className="btn btn-primary"
        >
          Browse Clubs
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">
        My Joined Clubs ({joinedClubs.length})
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {joinedClubs.map((club) => (
          <div
            key={club.membershipId}
            className="card bg-base-100 shadow-xl border border-primary/50"
          >
            <div className="card-body">
              <h2 className="card-title text-xl text-primary">{club.clubName}</h2>
              <p className="text-sm text-neutral-content">
                Location: {club.location}
              </p>

              <div className="mt-3">
                <p className="text-xs font-semibold">
                  Status:{" "}
                  <span
                    className={`badge ${
                      club.status === "active"
                        ? "badge-success"
                        : "badge-warning"
                    } text-white ml-2`}
                  >
                    {club.status.toUpperCase()}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Joined On: {new Date(club.joinedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Upcoming Events: {club.upcomingEventsCount || 0}
                </p>
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/member/event/clubs/${club.clubId.toString()}`)
                  }
                  className="btn btn-sm btn-primary"
                >
                  Show Events ({club.upcomingEventsCount || 0})
                </button>
                <button
                  onClick={() => navigate(`/clubs/${club.clubId.toString()}`)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  View Club
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberClubs;
