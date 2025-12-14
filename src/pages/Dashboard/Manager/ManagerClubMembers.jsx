// ManagerClubMembers.jsx  (fixed for react-query v5)
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/Shared/LoadingPage";

const ManagerClubMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // === useQuery: v5 object signature ===
  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["managerMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/members");
      return res.data;
    },
    // optional: keep previous data while refetching
    keepPreviousData: true,
  });

  // === useMutation: v5 object signature ===
  const expireMutation = useMutation({
    mutationFn: async (membershipId) => {
      // ensure we send plain string id
      const id =
        typeof membershipId === "object" && membershipId?.toString
          ? membershipId.toString()
          : membershipId;
      const res = await axiosSecure.patch(`/memberships/${id}`, {
        status: "expired",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managerMembers"] });
    },
  });

  const handleExpire = (membershipId, memberName) => {
    Swal.fire({
      title: `Expire membership for ${memberName || "this member"}?`,
      text: "This action will mark their membership as expired.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, expire it",
    }).then((result) => {
      if (result.isConfirmed) {
        expireMutation.mutate(membershipId, {
          onError: (err) => {
            Swal.fire(
              "Error",
              err?.response?.data?.message || err.message,
              "error"
            );
          },
          onSuccess: () => {
            Swal.fire("Done", "Membership expired", "success");
          },
        });
      }
    });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;
  if (isError)
    return (
      <div className="p-4 text-red-500">
        Error loading members: {error?.message || JSON.stringify(error)}
      </div>
    );

  return (
    <div className="p-6">
        <div>
        <h2
          className="
      text-4xl md:text-2xl font-extrabold mb-8 text-center
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
          CLUB MEMBERS
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


      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="min-w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 text-left">Club</th>
              <th className="px-4 py-3 text-left">Member</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Joined At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-base text-gray-500"
                >
                  No members found.
                </td>
              </tr>
            )}

            {members.map((m, index) => {
              const rawId = m.membershipId ?? m._id ?? m.id;
              const idStr =
                typeof rawId === "string"
                  ? rawId
                  : rawId?.toString
                  ? rawId.toString()
                  : JSON.stringify(rawId);

              return (
                <tr
                  key={idStr}
                  className={`border-t transition-all ${
                    index % 2 === 0 ? "bg-base-100" : "bg-base-200"
                  } hover:bg-base-300`}
                >
                  <td className="px-4 py-3 font-medium">{m.clubName}</td>
                  <td className="px-4 py-3">{m.memberName || "—"}</td>
                  <td className="px-4 py-3">{m.memberEmail}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        m.status === "active"
                          ? "badge-success"
                          : m.status === "expired"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {m.joinedAt ? new Date(m.joinedAt).toLocaleString() : "—"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {m.status !== "expired" && (
                      <button
                        onClick={() => handleExpire(idStr, m.memberName)}
                        className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                        disabled={expireMutation.isLoading}
                      >
                        {expireMutation.isLoading ? "Processing..." : "Expire"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerClubMembers;
