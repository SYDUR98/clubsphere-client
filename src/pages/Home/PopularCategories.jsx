import React from "react";
import { motion } from "framer-motion";
import { FaFootballBall, FaMusic, FaPaintBrush, FaLaptopCode, FaLeaf, FaBook } from "react-icons/fa";

const categories = [
  { icon: <FaFootballBall />, name: "Sports" },
  { icon: <FaMusic />, name: "Music & Arts" },
  { icon: <FaPaintBrush />, name: "Arts & Crafts" },
  { icon: <FaLaptopCode />, name: "Tech & Coding" },
  { icon: <FaLeaf />, name: "Environment" },
  { icon: <FaBook />, name: "Education" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PopularCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
      <div className="px-20 mx-auto px-6 text-center">
          <div className="mb-14">
        <h2
          className="
      text-2xl md:text-4xl font-extrabold mb-8 text-center
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
          POPULAR CATEGORIES
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white p-6 rounded-3xl shadow-2xl relative cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-white text-2xl shadow-lg -mt-12">
                {cat.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-800">{cat.name}</h3>

              {/* Decorative floating circles */}
              <div className="absolute -top-5 -left-5 w-6 h-6 rounded-full bg-purple-200 opacity-50 animate-ping"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-pink-200 opacity-50 animate-pulse"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;
