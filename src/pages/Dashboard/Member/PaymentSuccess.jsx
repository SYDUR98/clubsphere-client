import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      Swal.fire("Error", "Missing session ID", "error");
      navigate("/browse-clubs");
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/payments/confirm", { sessionId });

        Swal.fire("Success", res.data.message || "Payment confirmed!", "success");
        navigate("/browse-clubs");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.response?.data?.message || "Payment failed", "error");
        navigate("/browse-clubs");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [location, navigate, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return null;
};

export default PaymentSuccess;
