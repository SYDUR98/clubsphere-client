import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MemberClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: joinedClubs = [], isLoading, isError } = useQuery({
    queryKey: ["myJoinedClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/clubs?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
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
        <p className="text-xl font-medium text-base-content mb-4">
          You have not joined any clubs yet.
        </p>
        <button
          onClick={() => navigate("/browse-clubs")}
          className="btn w-40 bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-accent transition-colors"
        >
          Browse Clubs
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3
        className="
          text-2xl font-extrabold mb-6 text-center
          bg-gradient-to-r from-primary via-secondary to-accent
          bg-clip-text text-transparent
        "
      >
        My Joined Clubs ({joinedClubs.length})
      </h3>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Joined On</th>
              <th>Upcoming Events</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {joinedClubs.map((club, index) => (
              <tr key={club.membershipId || index}>
                <td>{index + 1}</td>
                <td className="text-primary font-medium">{club.clubName}</td>
                <td className="text-base-content">{club.location}</td>
                <td>
                  <span
                    className={`badge ${
                      club.status === "active"
                        ? "badge-success"
                        : "badge-warning"
                    } text-white`}
                  >
                    {club.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </td>
                <td className="text-base-content">
                  {new Date(club.joinedAt).toLocaleDateString()}
                </td>
                <td className="text-base-content">{club.upcomingEventsCount || 0}</td>
                <td className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/event/clubs/${club.clubId}`)
                    }
                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-accent transition-colors"
                  >
                    Show Events
                  </button>
                  <button
                    onClick={() => navigate(`/clubs/${club.clubId}`)}
                    className="btn btn-sm btn-outline border-info text-info hover:bg-info hover:text-white transition-colors"
                  >
                    View Club
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberClubs;
