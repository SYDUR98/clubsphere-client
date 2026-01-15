import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router";

const images = [
  { url: "https://i.ibb.co/JFSsFFyk/b4.jpg", alt: "Club Image 1" },
  { url: "https://i.ibb.co.com/20qL3R3f/b3.jpg", alt: "Club Image 2" },
  { url: "https://i.ibb.co.com/BHV04Yc4/b2.jpg", alt: "Club Image 3" },
  { url: "https://i.ibb.co.com/24Wq5V7/b5.jpg", alt: "Club Image 4" },
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
    arrows: false, // Arrows often break responsiveness on mobile
    pauseOnHover: false,
  };

  return (
    
    <section className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
      
      {/* Slider */}
      <Slider {...settings} className="h-full">
        {images.map((image, index) => (
          <div key={index} className="relative h-[60vh] md:h-[65vh] lg:h-[70vh]">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </Slider>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl pointer-events-auto"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
              backgroundSize: "300% 300%",
              animation: "gradientMove 12s ease infinite",
            }}
          >
            Welcome to ClubSphere
          </h1>

          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed opacity-90">
            Discover local clubs, join vibrant communities, and manage memberships 
            effortlessly with our all-in-one platform.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to={'/browse-clubs'} className="px-8 py-3 rounded-xl font-bold bg-primary text-white hover:scale-105 transition-transform shadow-xl">
              Join a Club
            </Link>

            <Link to={'/dashboard'} className="px-8 py-3 rounded-xl font-bold border-2 border-white text-white hover:bg-white hover:text-black transition-all">
              Create a Club
            </Link>
          </div>
        </motion.div>
      </div>

      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white text-xs uppercase tracking-widest opacity-70 italic font-bold">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .slick-dots { bottom: 25px !important; }
          .slick-dots li button:before { color: white !important; font-size: 12px; }
        `}
      </style>
    </section>
  );
};

export default HeroSection;