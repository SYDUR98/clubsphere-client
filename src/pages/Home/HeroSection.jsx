import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Images
const images = [
  { url: "https://i.ibb.co/JFSsFFyk/b4.jpg", alt: "Club Image 1" },
  { url: "https://i.ibb.co.com/20qL3R3f/b3.jpg", alt: "Club Image 1" },
  { url: "https://i.ibb.co.com/BHV04Yc4/b2.jpg", alt: "Club Image 1" },
  { url: "https://i.ibb.co.com/24Wq5V7/b5.jpg", alt: "Club Image 1" }, 
];

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Slider */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[360px] md:h-[420px] lg:h-[520px]"
          >
            {/* Image */}
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </Slider>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 flex flex-col justify-center max-w-2xl px-6 md:px-12"
      >
        <h1
          className="text-3xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 12s ease infinite",
          }}
        >
          Welcome to ClubSphere
        </h1>

        <p className="text-white text-base md:text-lg mb-5">
          Discover local clubs, join communities, and manage memberships & events
          effortlessly.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link to={'/browse-clubs'} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110 shadow-lg transition-all">
            Join a Club
          </Link>

          <Link to={'/dashboard/manager/createclubs'} className="px-6 py-3 rounded-lg font-semibold border border-white text-white hover:bg-white hover:text-black transition-all">
            Create a Club
          </Link>
        </div>
      </motion.div>

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
