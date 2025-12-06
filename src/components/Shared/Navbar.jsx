import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const manuLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }`
          }
        >
          HOME
        </NavLink>
      </li>
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
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
