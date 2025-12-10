import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const JoinClubEvent = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userEmail = user?.email;

  
  const { data: club = {}, isLoading: clubLoading } = useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}/details`);
      return res.data;
    },
    enabled: !!clubId,
  });

 
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["club-events", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}/events`);
      return res.data;
    },
    enabled: !!clubId && !!userEmail,
  });

 
  const registerMutation = useMutation({
    mutationFn: async (eventId) => {
      const res = await axiosSecure.post(`/events/register/${eventId}`, {
        userEmail,
      });
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url; // Stripe payment redirect
        return;
      }

      queryClient.invalidateQueries(["club-events", clubId]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data?.message || "Registration successful!",
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

  const handleRegister = (eventObj) => {
    if (!userEmail) {
      Swal.fire("Please login first.");
      return navigate("/login");
    }

    if (eventObj.isRegistered) {
      Swal.fire("Already registered!");
      return;
    }

    Swal.fire({
      title: "Confirm Registration",
      text: eventObj.isPaid
        ? `This event fee is ৳${eventObj.eventFee}. Continue?`
        : "Register for this free event?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        registerMutation.mutate(eventObj._id);
      }
    });
  };

  if (clubLoading || eventsLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Events for {club.clubName}
      </h1>

      {events.length === 0 ? (
        <p className="text-lg text-neutral">No events available.</p>
      ) : (
        <div className="space-y-6">
          {events.map((ev) => (
            <div
              key={ev._id}
              className={`p-5 rounded-lg border shadow-sm
                ${
                  ev.isRegistered
                    ? "bg-green-50 border-green-300"
                    : "bg-base-100 border-base-300 hover:shadow-md"
                }`}
            >
              <h2 className="text-xl font-semibold">{ev.title}</h2>
              <p className="text-neutral">{ev.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-sm">
                <p><strong>Date:</strong> {new Date(ev.eventDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {ev.location}</p>
                <p><strong>Fee:</strong> {ev.isPaid ? `৳${ev.eventFee}` : "Free"}</p>
                <p><strong>Registered:</strong> {ev.registrationCount}</p>
              </div>

              <div className="mt-4 text-right">
                {ev.isRegistered ? (
                  <button className="btn btn-success btn-sm" disabled>
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(ev)}
                    className="btn btn-primary btn-sm"
                  >
                    {registerMutation.isLoading ? "Processing..." : "Register"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinClubEvent;
