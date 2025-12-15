import React from "react";

import LoadingPage from "../../components/Shared/LoadingPage";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user, loading } = useAuth();
  const { role } = useRole();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-error font-semibold">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-2xl shadow-lg border border-base-300">
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
            animation: "gradientMove 15s ease-in-out infinite", // slow & smooth
          }}
        >
          User Profile
        </h2>

        {/* Inline keyframes */}
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

      <div className="flex items-center gap-6 bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt={user?.displayName || "User"}
          className="w-24 h-24 rounded-full border-2 border-primary object-cover"
        />

        <div className="flex flex-col gap-2 text-base-content">
          <p className="text-sm">
            <span className="font-semibold text-base-content/70">Name:</span>{" "}
            {user?.displayName || "N/A"}
          </p>

          <p className="text-sm">
            <span className="font-semibold text-base-content/70">Email:</span>{" "}
            {user?.email}
          </p>

          <p className="text-sm">
            <span className="font-semibold text-base-content/70">Role:</span>{" "}
            <span className="capitalize badge badge-primary badge-outline">
              {role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
