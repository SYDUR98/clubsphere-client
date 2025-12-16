import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";
import useAuth from "../../../hooks/useAuth"; 

const EventPaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Prevent API call if authentication is still loading
        if (authLoading) {
            setLoading(true);
            return; 
        }

        // Redirect if user is not logged in after auth load completes
        if (!user) {
             Swal.fire("Error", "Authentication failed. Please log in again.", "error");
             navigate("/login");
             return;
        }

        const query = new URLSearchParams(location.search);
        const sessionId = query.get("session_id");

        if (!sessionId) {
            Swal.fire("Error", "Missing session ID in URL. Cannot confirm payment.", "error");
            navigate("/member/events");
            return;
        }

        const confirmEventPayment = async () => {
            try {
               
                const res = await axiosSecure.post("/payments/confirm/event", {
                    sessionId,
                });

                await Swal.fire(
                    "Success",
                    res.data.message || "Event registration confirmed!",
                    "success"
                );
                // navigate("/my-event");

            } catch (err) {
                console.error("Event Payment Confirmation Error:", err);
                await Swal.fire(
                    "Error",
                    err.response?.data?.message || "Event payment confirmation failed",
                    "error"
                );
                // navigate("/member/events");
                
            } finally {
                setLoading(false);
            }
        };

        confirmEventPayment();
        
    }, [location, navigate, axiosSecure, authLoading, user]); 

   
    if (loading || authLoading)
        return (
            <LoadingPage></LoadingPage>
        );

    return (
    <div className="p-6 text-center mt-20">
        <h2 className="text-2xl font-bold text-info mb-2">Payment Processed</h2>
        <p>Redirecting you to the event listings...</p>
    </div>
  );
}
export default EventPaymentSuccess;