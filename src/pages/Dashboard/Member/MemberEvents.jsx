import React, { useState } from "react";
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

  // Filters
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [paid, setPaid] = useState("all");
  const [reg, setReg] = useState("all");
  const [sort, setSort] = useState("newest");

  // Modal
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["memberEvents", user?.email, q, loc, paid, reg, sort],
    enabled: !!user?.email,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("email", user.email);
      if (q) params.append("search", q);
      if (loc) params.append("location", loc);
      if (paid !== "all") params.append("paid", paid);
      if (reg !== "all") params.append("reg", reg);
      if (sort) params.append("sort", sort);

      const res = await axiosSecure.get(`/member/events?${params.toString()}`);
      return res.data;
    },
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

  const go = (e) => {
    if (e.isRegistered) return Swal.fire("Info", "Already registered", "info");

    Swal.fire({
      title: e.isPaid ? `Pay $${e.eventFee}?` : "Confirm Registration",
      showCancelButton: true,
    }).then(
      (r) => r.isConfirmed && m.mutate({ id: e._id, fee: e.eventFee || 0 })
    );
  };

  return (
    <div className="p-6 mb-20 bg-base-100 text-base-content">
      {/* Title */}
      <h2
        className="text-2xl md:text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        UPCOMING EVENTS
      </h2>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <input
          className="input input-bordered bg-base-100"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="input input-bordered bg-base-100"
          placeholder="Location"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        />
        <select
          className="select select-bordered bg-base-100"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <select
          className="select select-bordered bg-base-100"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
        >
          <option value="all">All</option>
          <option value="registered">Registered</option>
          <option value="notRegistered">Not Registered</option>
        </select>
        <select
          className="select select-bordered bg-base-100"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="lowest">Lowest Fee</option>
          <option value="highest">Highest Fee</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 && (
            <p className="text-center col-span-3 opacity-70">
              No events found
            </p>
          )}

          {events.map((e, i) => (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-200 shadow-xl border border-base-300"
            >
              <div className="card-body">
                <p className="text-sm text-primary font-semibold">
                  {e.clubName}
                </p>

                <h3 className="card-title">{e.title}</h3>

                <p className="text-sm opacity-70">
                  {e.description?.slice(0, 90)}...
                </p>

                <p className="flex items-center gap-2 text-sm text-secondary">
                  <FaMapMarkerAlt /> {e.location}
                </p>

                <div className="flex gap-4 text-sm mt-2 opacity-80">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt />{" "}
                    {new Date(e.eventDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaMoneyBillAlt />{" "}
                    {e.isPaid ? `$${e.eventFee}` : "Free"}
                  </span>
                </div>

                <div className="card-actions justify-between mt-4 gap-2">
                  <button
                    className="btn btn-sm flex-1 flex items-center gap-2 text-white
                    bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
                    hover:brightness-110 shadow-lg"
                    onClick={() => {
                      setSel(e);
                      setOpen(true);
                    }}
                  >
                    <FaEye /> View
                  </button>

                  <button
                    onClick={() => go(e)}
                    disabled={e.isRegistered}
                    className={`btn btn-sm flex-1 flex items-center gap-2 text-white shadow-lg ${
                      e.isRegistered
                        ? "bg-success btn-disabled"
                        : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                    } hover:brightness-110`}
                  >
                    {e.isRegistered ? (
                      <>
                        <FaCheck /> Registered
                      </>
                    ) : (
                      <>
                        <FaUserPlus /> Register
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && sel && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl bg-base-100 text-base-content rounded-2xl shadow-2xl">
            <h3
              className="text-2xl font-extrabold mb-2 text-center bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
              }}
            >
              {sel.title}
            </h3>

            <p className="text-center font-semibold text-primary mb-4">
              {sel.clubName}
            </p>

            <div className="space-y-3 text-sm opacity-90">
              <p>{sel.description}</p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt />{" "}
                {new Date(sel.eventDate).toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {sel.location}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillAlt />{" "}
                {sel.isPaid ? `$${sel.eventFee}` : "Free"}
              </p>
              <p className="flex items-center gap-2">
                <FaUsers /> Max Attendees: {sel.maxAttendees}
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> {sel.managerEmail}
              </p>
              <p className="flex items-center gap-2">
                <FaClock /> Created:{" "}
                {new Date(sel.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110"
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
