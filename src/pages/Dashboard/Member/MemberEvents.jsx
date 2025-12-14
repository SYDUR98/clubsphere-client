import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEnvelope,
  FaClock,
  FaEye,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../components/Shared/LoadingPage";

const MemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [paid, setPaid] = useState("all");
  const [reg, setReg] = useState("all");
  const [sort, setSort] = useState("newest");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["memberEvents", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/member/events?email=${user.email}`)).data,
  });

  const m = useMutation({
    mutationFn: ({ id, fee }) =>
      axiosSecure.post(`/events/register/${id}`, {
        userEmail: user.email,
        eventFee: fee,
      }),
    onSuccess: (d) => {
      if (d.data?.url) return window.location.assign(d.data.url);
      Swal.fire("Success", "Registered successfully", "success");
      qc.invalidateQueries(["memberEvents"]);
    },
    onError: (e) =>
      Swal.fire("Error", e.response?.data?.message || "Failed", "error"),
  });

  const list = useMemo(() => {
    const f = events.filter(
      (e) =>
        (e.title + e.clubName).toLowerCase().includes(q.toLowerCase()) &&
        (!loc || e.location?.toLowerCase().includes(loc.toLowerCase())) &&
        (paid === "all" ||
          (paid === "free" && !e.isPaid) ||
          (paid === "paid" && e.isPaid)) &&
        (reg === "all" ||
          (reg === "registered" && e.isRegistered) ||
          (reg === "notRegistered" && !e.isRegistered))
    );

    return f.sort((a, b) => {
      if (sort === "newest")
        return new Date(b.eventDate) - new Date(a.eventDate);
      if (sort === "oldest")
        return new Date(a.eventDate) - new Date(b.eventDate);
      if (sort === "lowest") return (a.eventFee || 0) - (b.eventFee || 0);
      if (sort === "highest") return (b.eventFee || 0) - (a.eventFee || 0);
      return 0;
    });
  }, [events, q, loc, paid, reg, sort]);

  const go = (e) => {
    if (e.isRegistered) return Swal.fire("Info", "Already registered", "info");

    Swal.fire({
      title: e.isPaid ? `Pay $${e.eventFee}?` : "Confirm Registration",
      showCancelButton: true,
    }).then(
      (r) => r.isConfirmed && m.mutate({ id: e._id, fee: e.eventFee || 0 })
    );
  };

  if (isLoading)
    return (
       <LoadingPage></LoadingPage>
    );

  return (
    // <div className="p-6">
    //   <div>
    //     <h2
    //       className="
    //   text-4xl md:text-3xl font-extrabold mb-8 text-center
    //   bg-clip-text text-transparent
    //   tracking-wide
    // "
    //       style={{
    //         backgroundImage:
    //           "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
    //         backgroundSize: "300% 300%",
    //         animation: "gradientMove 15s ease-in-out infinite", // slow & smooth
    //       }}
    //     >
    //       UPCOMING EVENTS
    //     </h2>

    //     {/* Inline keyframes */}
    //     <style>
    //       {`
    //   @keyframes gradientMove {
    //     0% { background-position: 0% 50%; }
    //     50% { background-position: 100% 50%; }
    //     100% { background-position: 0% 50%; }
    //   }
    // `}
    //     </style>
    //   </div>

    //   {/* Filters */}
    //   <div className="flex flex-wrap gap-3 mb-6">
    //     <input
    //       className="input input-bordered"
    //       placeholder="Search"
    //       value={q}
    //       onChange={(e) => setQ(e.target.value)}
    //     />
    //     <input
    //       className="input input-bordered"
    //       placeholder="Location"
    //       value={loc}
    //       onChange={(e) => setLoc(e.target.value)}
    //     />

    //     <select
    //       className="select select-bordered"
    //       value={paid}
    //       onChange={(e) => setPaid(e.target.value)}
    //     >
    //       <option value="all">All</option>
    //       <option value="free">Free</option>
    //       <option value="paid">Paid</option>
    //     </select>

    //     <select
    //       className="select select-bordered"
    //       value={reg}
    //       onChange={(e) => setReg(e.target.value)}
    //     >
    //       <option value="all">All</option>
    //       <option value="registered">Registered</option>
    //       <option value="notRegistered">Not Registered</option>
    //     </select>

    //     <select
    //       className="select select-bordered"
    //       value={sort}
    //       onChange={(e) => setSort(e.target.value)}
    //     >
    //       <option value="newest">Newest</option>
    //       <option value="oldest">Oldest</option>
    //       <option value="lowest">Lowest Fee</option>
    //       <option value="highest">Highest Fee</option>
    //     </select>
    //   </div>

    //   {/* Cards */}
    //   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {list.map((e, i) => (
    //       <motion.div
    //         key={e._id}
    //         initial={{ opacity: 0, y: 25 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: i * 0.05 }}
    //         whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
    //         className="card bg-base-100 shadow-xl"
    //       >
    //         <div className="card-body">
    //           <p className="text-sm text-primary">{e.clubName}</p>
    //           <h3 className="card-title">{e.title}</h3>

    //           <p className="text-sm">{e.description?.slice(0, 90)}...</p>

    //           <p className="flex items-center gap-1 text-sm">
    //             <FaMapMarkerAlt /> {e.location}
    //           </p>

    //           <div className="flex gap-4 text-sm mt-2">
    //             <span className="flex items-center gap-1">
    //               <FaCalendarAlt />
    //               {new Date(e.eventDate).toLocaleDateString()}
    //             </span>
    //             <span className="flex items-center gap-1">
    //               <FaMoneyBillAlt />
    //               {e.isPaid ? `$${e.eventFee}` : "Free"}
    //             </span>
    //           </div>

    //           <div className="card-actions justify-between mt-4">
    //             <button
    //               className="btn btn-outline btn-sm flex items-center gap-1"
    //               onClick={() => {
    //                 setSel(e);
    //                 setOpen(true);
    //               }}
    //             >
    //               <FaEye /> View Details
    //             </button>

    //             <button
    //               onClick={() => go(e)}
    //               disabled={e.isRegistered}
    //               className={`btn btn-sm ${
    //                 e.isRegistered ? "btn-disabled" : "btn-primary"
    //               }`}
    //             >
    //               {e.isRegistered ? "Registered" : "Register"}
    //             </button>
    //           </div>
    //         </div>
    //       </motion.div>
    //     ))}
    //   </div>

    //   {/* View Details Modal */}
    //   {open && sel && (
    //     <dialog className="modal modal-open">
    //       <div className="modal-box max-w-2xl">
    //         <h3 className="text-2xl font-bold mb-1">{sel.title}</h3>
    //         <p className="text-sm text-primary mb-4">{sel.clubName}</p>

    //         <div className="space-y-2 text-sm">
    //           <p>{sel.description}</p>

    //           <p className="flex items-center gap-2">
    //             <FaCalendarAlt /> {new Date(sel.eventDate).toLocaleString()}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaMapMarkerAlt /> {sel.location}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaMoneyBillAlt /> {sel.isPaid ? `$${sel.eventFee}` : "Free"}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaUsers /> Max Attendees: {sel.maxAttendees}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaEnvelope /> {sel.managerEmail}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaClock /> Created: {new Date(sel.createdAt).toLocaleString()}
    //           </p>

    //           <p className="flex items-center gap-2">
    //             <FaClock /> Updated: {new Date(sel.updatedAt).toLocaleString()}
    //           </p>
    //         </div>

    //         <div className="modal-action">
    //           <button
    //             className="btn btn-outline"
    //             onClick={() => setOpen(false)}
    //           >
    //             Close
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
    //   )}
    // </div>
    <div className="p-6">
      <div>
        <h2
          className="
        text-4xl md:text-3xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent
        tracking-wide
      "
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          UPCOMING EVENTS
        </h2>

        <style>
          {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
        </style>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="input input-bordered"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Location"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <select
          className="select select-bordered"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
        >
          <option value="all">All</option>
          <option value="registered">Registered</option>
          <option value="notRegistered">Not Registered</option>
        </select>
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="lowest">Lowest Fee</option>
          <option value="highest">Highest Fee</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((e, i) => (
          <motion.div
            key={e._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <p className="text-sm text-primary">{e.clubName}</p>
              <h3 className="card-title">{e.title}</h3>
              <p className="text-sm">{e.description?.slice(0, 90)}...</p>
              <p className="flex items-center gap-1 text-sm text-secondary">
                <FaMapMarkerAlt className="text-red-500" /> {e.location}
              </p>
              <div className="flex gap-4 text-sm mt-2 text-neutral-800">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-500" />
                  {new Date(e.eventDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FaMoneyBillAlt className="text-green-500" />
                  {e.isPaid ? `$${e.eventFee}` : "Free"}
                </span>
              </div>

              <div className="card-actions justify-between mt-4">
                <button
                  className="
                btn btn-sm flex-1 flex items-center justify-center gap-2 text-white font-semibold
                bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
                hover:brightness-110 transition-all shadow-lg
              "
                  onClick={() => {
                    setSel(e);
                    setOpen(true);
                  }}
                >
                  <FaEye className="text-yellow-200" /> View Details
                </button>

                <button
                  onClick={() => go(e)}
                  disabled={e.isRegistered}
                  className={`
                btn btn-sm flex-1 flex items-center justify-center gap-2 text-white font-semibold shadow-lg
                ${
                  e.isRegistered
                    ? "bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 btn-disabled"
                    : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                }
                hover:brightness-110 transition-all
              `}
                >
                  {e.isRegistered ? (
                    <>
                      <FaCheck className="text-white" /> Registered
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="text-white" /> Register
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {open && sel && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl p-6 bg-base-100 shadow-2xl rounded-2xl">
            {/* Event Title with gradient */}
            <h3
              className="text-2xl font-extrabold mb-2 text-center bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
              }}
            >
              {sel.title}
            </h3>

            {/* Club Name */}
            <p className="text-center text-lg font-semibold text-primary mb-4">
              {sel.clubName}
            </p>

            {/* Event Details */}
            <div className="space-y-3 text-sm text-neutral-800">
              <p>{sel.description}</p>

              <p className="flex items-center gap-2 text-gradient">
                <FaCalendarAlt className="text-blue-500" />{" "}
                {new Date(sel.eventDate).toLocaleString()}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaMapMarkerAlt className="text-red-500" /> {sel.location}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaMoneyBillAlt className="text-green-500" />{" "}
                {sel.isPaid ? `$${sel.eventFee}` : "Free"}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaUsers className="text-purple-500" /> Max Attendees:{" "}
                {sel.maxAttendees}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaEnvelope className="text-indigo-500" /> {sel.managerEmail}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaClock className="text-gray-500" /> Created:{" "}
                {new Date(sel.createdAt).toLocaleString()}
              </p>

              <p className="flex items-center gap-2 text-gradient">
                <FaClock className="text-gray-500" /> Updated:{" "}
                {new Date(sel.updatedAt).toLocaleString()}
              </p>
            </div>

            {/* Close Button */}
            <div className="modal-action">
              <button
                className="
          btn w-full text-white font-semibold
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          hover:brightness-110 hover:shadow-lg
          transition-all duration-300
        "
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MemberEvents;
