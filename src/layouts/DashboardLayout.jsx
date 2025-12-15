import React from "react";
import {
  SiGooglecampaignmanager360,
  SiGoogletagmanager,
  SiNginxproxymanager,
  SiSamsclub,
} from "react-icons/si";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdDashboardCustomize,
  MdEvent,
  MdEventNote,
  MdOutlinePayment,
  MdOutlinePayments,
} from "react-icons/md";
import { FaCcDinersClub, FaEdit } from "react-icons/fa";
import { GrUserAdmin, GrUserManager } from "react-icons/gr";
import { VscSymbolEvent } from "react-icons/vsc";
import useRole from "../hooks/useRole";
import { IoCreateSharp } from "react-icons/io5";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Zap Shift Dashbord</div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* Our dashboard links */}

              {/* admin Role */}

              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/admin/home"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Admin Home"
                    >
                      <GrUserAdmin className="text-lg" />
                      <span className="is-drawer-close:hidden">Admin Home</span>
                    </NavLink>
                  </li>
                  {/* admin users  */}
                  <li>
                    <NavLink
                      to="/dashboard/admin/manage-users"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Manage Users"
                    >
                      <GrUserManager className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/manage-clubs"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Manage Clubs"
                    >
                      <SiGoogletagmanager className="text-lg" />

                      <span className="is-drawer-close:hidden">
                        Manage Clubs
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/payment-history"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Payment History"
                    >
                      <MdOutlinePayments className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Payment History
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Manager Role */}

              {role === "clubManager" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manager/overview"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Manager Overview"
                    >
                      <SiGooglecampaignmanager360 className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Manager Overview
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manager/createclubs"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Create Clubs"
                    >
                      <FaEdit className="text-lg" />

                      <span className="is-drawer-close:hidden">
                        Create Clubs
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manager/createEvents"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Create Events"
                    >
                      
                      <IoCreateSharp className="text-lg"/>
                      <span className="is-drawer-close:hidden">
                        Create Events
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manager/my-clubs"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="My Clubs"
                    >
                      <SiSamsclub className="text-lg" />
                      <span className="is-drawer-close:hidden">My Clubs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manager/all/events"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Manager Event"
                    >
                      
                      <VscSymbolEvent className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Manager Events
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/dashboard/manager/events/registrations`}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Event Registration"
                    >
                      <SiNginxproxymanager  className="text-lg" />
                      
                      <span className="is-drawer-close:hidden">Event Registration</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manager-members"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Club Member"
                    >
                      <MdEvent className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Club Mamber
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {/* member role */}
              {role === "member" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/member/stats"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Member Stats"
                    >
                      <MdDashboardCustomize className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Member Stats
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/member/clubs"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Member Clubs"
                    >
                      <FaCcDinersClub className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Member Clubs
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/member/all/event"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Member Event"
                    >
                      <MdEventNote className="text-lg"/>
                      <span className="is-drawer-close:hidden">
                        Member Event
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/member/all/payments"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-base-300 text-primary"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                      }
                      data-tip="Payments"
                    >
                      <MdOutlinePayment className="text-lg" />
                      <span className="is-drawer-close:hidden">Payments</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
