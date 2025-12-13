import { Link, useLocation, useNavigate } from "react-router";
import {

  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaMoneyBill,
  FaClock,
  FaArrowLeft,
  FaCalendarAlt,
} from "react-icons/fa";

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="text-center py-20">
        <p className="text-error">Event data not found. Please go back.</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,
    clubName,
    managerEmail,
    createdAt,
    updatedAt,
  } = state;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>

      <p className="text-neutral mb-6">{description}</p>

      <div className="grid md:grid-cols-2 gap-4 bg-base-100 p-6 rounded-xl shadow">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          <b>Event Date:</b> {new Date(eventDate).toLocaleString()}
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-secondary" />
          <b>Location:</b> {location}
        </p>

        <p className="flex items-center gap-2">
          <FaUsers className="text-accent" />
          <b>Club:</b> {clubName}
        </p>

        <p className="flex items-center gap-2">
          <FaUserTie className="text-info" />
          <b>Manager:</b> {managerEmail}
        </p>

        <p className="flex items-center gap-2">
          <FaMoneyBill className="text-success" />
          <b>Type:</b> {isPaid ? "Paid" : "Free"}
        </p>

        {isPaid && (
          <p className="flex items-center gap-2">
            <FaMoneyBill className="text-success" />
            <b>Fee:</b> ৳ {eventFee}
          </p>
        )}

        <p className="flex items-center gap-2">
          <FaUsers className="text-warning" />
          <b>Max Attendees:</b> {maxAttendees}
        </p>

        <p className="flex items-center gap-2">
          <FaClock className="text-neutral" />
          <b>Created:</b> {new Date(createdAt).toLocaleString()}
        </p>

        <p className="flex items-center gap-2">
          <FaClock className="text-neutral" />
          <b>Updated:</b> {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      <Link
        to="/my-event"
        className="btn flex-1 flex items-center justify-center gap-2 text-white font-semibold text-lg
            bg-gradient-to-r from-primary via-secondary to-accent
            hover:opacity-90 transition-all shadow-lg"
      >
        <FaArrowLeft /> Back
      </Link>
    </div>
  );
};

export default EventDetails;
