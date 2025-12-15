import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaCalendarAlt, FaUsers, FaSmile } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Sign Up",
    description: "Create your free account and explore clubs that match your interests.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Join Clubs",
    description: "Select clubs you like and join to participate in their events and activities.",
  },
  {
    icon: <FaUsers />,
    title: "Attend Events",
    description: "Keep track of upcoming events and engage with other members seamlessly.",
  },
  {
    icon: <FaSmile />,
    title: "Enjoy & Connect",
    description: "Have fun, meet new people, and make lasting memories with ClubSphere.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50">
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
          HOW CLUB-SPHARE WORKS
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
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white p-8 rounded-3xl shadow-xl relative hover:scale-105 transition-transform duration-300 cursor-default"
            >
              {/* Spatial unique design: icon floating */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-2xl">
                  {step.icon}
                </div>
              </div>

              <h3 className="mt-12 text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="mt-3 text-gray-500">{step.description}</p>

              {/* Decorative spatial circle */}
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-indigo-200 opacity-40 animate-pulse"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
