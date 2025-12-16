
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const EventPaymentCancelled = () => {
  useEffect(() => {
    Swal.fire("Cancelled", "Payment was cancelled.", "error");
  }, []);

  return (
    <div className="p-6 text-center mt-20">
      <h2 className="text-2xl font-bold text-error">Payment Cancelled</h2>
      <p>You can try register the event again.</p>
    </div>
  );
};

export default EventPaymentCancelled;
