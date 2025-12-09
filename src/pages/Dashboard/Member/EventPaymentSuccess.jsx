import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EventPaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      Swal.fire("Error", "Missing session ID", "error"); // FIX APPLIED: Use correct absolute path
      navigate("/dashboard/member/events");
      return;
    }

    const confirmEventPayment = async () => {
      try {
        const res = await axiosSecure.post("/payments/confirm/event", {
          sessionId,
        });

        Swal.fire(
          "Success",
          res.data.message || "Event registration confirmed!",
          "success"
        ); // FIX APPLIED: Use correct absolute path
        navigate("/dashboard/member/events");
      } catch (err) {
        console.error("Event Payment Confirmation Error:", err);
        Swal.fire(
          "Error",
          err.response?.data?.message || "Event payment confirmation failed",
          "error"
        ); // FIX APPLIED: Use correct absolute path
        navigate("/dashboard/member/events");
      } finally {
        setLoading(false);
      }
    };

    confirmEventPayment();
  }, [location, navigate, axiosSecure]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
            {" "}
        <span className="loading loading-spinner loading-lg text-primary"></span>
            {" "}
        <p className="text-gray-600">Confirming your event registration...</p>
            {" "}
      </div>
    );

  return null;
};

export default EventPaymentSuccess;
