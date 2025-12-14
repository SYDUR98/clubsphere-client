import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

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
      <LoadingPage></LoadingPage>
    );

  return null;
};

export default PaymentSuccess;
