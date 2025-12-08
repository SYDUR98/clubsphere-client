import React from "react";
import { SiSamsclub } from "react-icons/si";
import { Link, NavLink, Outlet } from "react-router";
import { MdEvent } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
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
              <li>
                <NavLink
                  to="/dashboard/admin"
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
                    <SiSamsclub className="text-lg"/>
                  <span className="is-drawer-close:hidden">Admin Home</span>
                </NavLink>
              </li>
              {/* Manager Role */}
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
                    <SiSamsclub className="text-lg"/>
                  <span className="is-drawer-close:hidden">My Clubs</span>
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
                  <FaEdit className="text-lg"/>
                  
                  <span className="is-drawer-close:hidden">Create Clubs</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manager/my-events"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-300 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${
                    isActive
                    ? "bg-base-300 text-primary"
                     : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`
                  }
                  data-tip="My Event"
                >
                  <MdEvent className="text-lg"/>
                  <span className="is-drawer-close:hidden">My Events</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
