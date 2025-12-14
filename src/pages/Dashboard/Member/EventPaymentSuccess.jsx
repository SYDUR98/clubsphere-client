import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

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
      navigate("/member/events");
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
        navigate("/my-event");
      } catch (err) {
        console.error("Event Payment Confirmation Error:", err);
        Swal.fire(
          "Error",
          err.response?.data?.message || "Event payment confirmation failed",
          "error"
        ); // FIX APPLIED: Use correct absolute path
        navigate("/member/events");
      } finally {
        setLoading(false);
      }
    };

    confirmEventPayment();
  }, [location, navigate, axiosSecure]);

  if (loading)
    return (
       <LoadingPage></LoadingPage>
    );

  return null;
};

export default EventPaymentSuccess;
