import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaRegHeart,
  FaRegCopyright,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      {/* Top Section */}
      <div className="mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div>
            <h2
              className="
      text-2xl md:text-4xl font-extrabold mb-2
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
              ClubSphere
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
          <span className="hidden font-bold lg:block text-base-content mb-2 opacity-70">
            Membership & Event Management for{" "}
            <span className="text-primary">Local Clubs</span>
          </span>
          <p className="mt-4 text-sm opacity-80 leading-relaxed max-w-md">
            ClubSphere is a smart membership & event management platform built
            for local clubs. Easily manage members, events, registrations, and
            payments in one unified system.
          </p>

          {/* Social */}
        </div>

        {/* Quick Links */}
        <div className="">
          <h3 className="text-lg font-bold mb-2 text-primary">Quick Links</h3>
          <div className="text-sm flex flex-col space-y-2">
            <Link
              to={"/"}
              className="link link-hover hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to={"/browse-clubs"}
              className="link link-hover hover:text-primary transition-colors duration-300"
            >
              Browse Clubs
            </Link>
            <Link
              to={"/member/events"}
              className="link link-hover hover:text-primary transition-colors duration-300"
            >
              Events
            </Link>
            <Link
              to={"/dashboard"}
              className="link link-hover hover:text-primary transition-colors duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* For Clubs */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-bold mb-2 text-secondary">For Clubs</h3>
          <div className="text-sm space-y-2">
            <p className="link link-hover hover:text-secondary transition-colors duration-300">
              Create Club
            </p>
            <p className="link link-hover hover:text-secondary transition-colors duration-300">
              Manage Events
            </p>
            <p className="link link-hover hover:text-secondary transition-colors duration-300">
              Membership Plans
            </p>
            <p className="link link-hover hover:text-secondary transition-colors duration-300">
              Payment System
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-bold mb-2 text-accent">Support</h3>
          <div className="text-sm space-y-2">
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Help Center
            </p>
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              FAQs
            </p>
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Terms & Conditions
            </p>
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Privacy Policy
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-bold mb-2 text-accent">
            {" "}
            Contact & Connect
          </h3>
          <div className="text-sm space-y-2">
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Email: support@clubsphere.com
            </p>
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Phone: +880 1XXX-XXXXXX
            </p>
            <p className="link link-hover hover:text-accent transition-colors duration-300">
              Address: Sylhet, Bangladesh
            </p>
          </div>
          <div className="flex gap-4 text-2xl mt-4">
            <FaFacebook className="hover:text-primary transition-all duration-300 cursor-pointer hover:-translate-y-1" />
            <FaXTwitter className="hover:text-secondary transition-all duration-300 cursor-pointer hover:-translate-y-1" />
            <FaLinkedin className="hover:text-accent transition-all duration-300 cursor-pointer hover:-translate-y-1" />
            <FaGithub className="hover:text-neutral transition-all duration-300 cursor-pointer hover:-translate-y-1" />
          </div>
        </div>
        {/* Contact & Connect Section */}
       
      </div>

      {/* Divider */}
      <div className="border-t border-base-300"></div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-1 text-sm text-center text-base-content opacity-80">
        <FaRegCopyright className="text-primary" />
        <span>{new Date().getFullYear()} ClubSphere — Built with</span>
        <FaRegHeart className="text-error mx-1" />
        <span>for Local Communities</span>
      </div>
    </footer>
  );
};

export default Footer;
