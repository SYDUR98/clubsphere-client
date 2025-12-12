import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out SuccessFull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const manuLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive
                ? "text-primary "
                : "text-base-content hover:text-primary"
            }`
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-clubs"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive
                ? "text-primary "
                : "text-base-content hover:text-primary"
            }`
          }
        >
          CLUBS
        </NavLink>
      </li>

      {user && (
        <>
          <div className="flex">
            <li>
              <NavLink
                to="/member/events"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary "
                      : "text-base-content hover:text-primary"
                  }`
                }
              >
                EVENTS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-event"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary "
                      : "text-base-content hover:text-primary"
                  }`
                }
              >
                MY EVENTS
              </NavLink>
            </li>
          </div>
        </>
      )}
      {!user && (
        <>
          <div className="flex">
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-base-content hover:text-primary"
                  }`
                }
              >
                LOGIN
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-base-content hover:text-primary"
                  }`
                }
              >
                REGISTER
              </NavLink>
            </li>
          </div>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {manuLink}
          </ul>
        </div>
        <div className="navbar-start">
          <a
            href="/"
            className="btn btn-ghost normal-case flex flex-col items-start"
          >
            <span className="text-xl font-bold text-primary">ClubSphere</span>
            <span className="text-sm text-base-content opacity-70">
              Membership & Event Management for Local Clubs
            </span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{manuLink}</ul>
      </div>
      <div className="navbar-end">
        {user?.email && (
          // user logged in
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full"
                alt="User"
              />
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box w-44 p-2 shadow-xl border border-base-300"
            >
              {/* Profile */}
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-base-content hover:text-primary"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>

              {/* Dashboard */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-base-content hover:text-primary"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md font-medium text-error hover:bg-error hover:text-error-content transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
