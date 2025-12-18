import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Member",
    avatar: "https://i.ibb.co.com/rGNKqLqM/60111.jpg",
    text: "ClubSphere helped me discover amazing clubs in my city. I joined two photography clubs and attended wonderful events!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Member",
    avatar: "https://i.ibb.co.com/pjHMtw0N/user2.png",
    text: "Easy to use and very intuitive. I love the dashboard for managing my memberships and events.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Member",
    avatar: "https://i.ibb.co.com/5xYvdvw5/user1.png",
    text: "Great platform for both club managers and members. The animations and design make it really engaging!",
    rating: 5,
  },
];

const ReviewsSection = () => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="px-20 mx-auto text-center">
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
          WHAT OUR MEMBERS SAY
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
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariant}
              className="bg-white p-6 rounded-2xl shadow-lg relative"
            >
              {/* Avatar */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-4 border-indigo-500"
                />
              </div>

              <div className="mt-10">
                {/* Rating */}
                <div className="flex justify-center mb-3">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mx-0.5" />
                    ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-4 text-sm">{review.text}</p>

                {/* Name */}
                <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
