import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const JoinClubEvent = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userEmail = user?.email;

  // Fetch club details
  const { data: club = {}, isLoading: clubLoading } = useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}/details`);
      return res.data;
    },
    enabled: !!clubId,
  });

  // Fetch events of this club
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["club-events", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}/events`);
      return res.data;
    },
    enabled: !!clubId && !!userEmail,
  });

  // Register for event mutation
  const registerMutation = useMutation({
    mutationFn: async (eventId) => {
      const res = await axiosSecure.post(`/events/register/${eventId}`, {
        userEmail,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url; // Stripe payment
        return;
      }
      queryClient.invalidateQueries(["club-events", clubId]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data?.message || "Registered!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const handleRegister = (ev) => {
    if (!userEmail) {
      Swal.fire("Please login first.");
      return navigate("/login");
    }

    if (ev.isRegistered) {
      Swal.fire("Already registered!");
      return;
    }

    Swal.fire({
      title: "Confirm Registration",
      text: ev.isPaid
        ? `This event fee is ৳${ev.eventFee}. Continue?`
        : "Register for this free event?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) registerMutation.mutate(ev._id);
    });
  };

  if (clubLoading || eventsLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1
        className="
      text-3xl font-bold mb-6
      bg-gradient-to-r from-primary via-secondary to-accent
      bg-clip-text text-transparent
    "
      >
        Events for {club.clubName}
      </h1>

      {events.length === 0 ? (
        <p className="text-lg text-base-content">No events available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((ev) => (
            <div
              key={ev._id}
              className={`
            p-5 rounded-xl border shadow-sm transition-shadow
            ${
              ev.isRegistered
                ? "bg-green-50 border-green-300"
                : "bg-base-100 border-base-300 hover:shadow-lg"
            }
          `}
            >
              <h2 className="text-xl font-semibold text-primary">{ev.title}</h2>
              <p className="text-sm text-neutral mb-2">{ev.clubName}</p>
              <p className="text-sm mb-3 text-base-content">{ev.description}</p>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3 text-base-content">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(ev.eventDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {ev.location}
                </p>
                <p>
                  <strong>Fee:</strong> {ev.isPaid ? `৳${ev.eventFee}` : "Free"}
                </p>
                <p>
                  <strong>Max Attendees:</strong> {ev.maxAttendees || "-"}
                </p>
              </div>

              <div className="text-right">
                {ev.isRegistered ? (
                  <button className="btn btn-success btn-sm opacity-90 cursor-not-allowed">
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(ev)}
                    className="btn btn-sm w-full
                  bg-gradient-to-r from-primary to-secondary
                  text-white hover:from-secondary hover:to-accent
                  transition-colors"
                    disabled={registerMutation.isLoading}
                  >
                    {registerMutation.isLoading ? "Processing..." : "Register"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="btn w-32 bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-accent transition-colors"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default JoinClubEvent;
