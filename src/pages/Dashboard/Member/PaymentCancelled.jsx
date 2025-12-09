
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const PaymentCancelled = () => {
  useEffect(() => {
    Swal.fire("Cancelled", "Payment was cancelled.", "error");
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Payment Cancelled</h2>
      <p>You can try joining the club again.</p>
    </div>
  );
};

export default PaymentCancelled;
