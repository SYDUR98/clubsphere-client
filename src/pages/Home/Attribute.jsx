import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarCheck, FaGlobe } from "react-icons/fa";

const Attribute = () => {
  const animatedHeadingStyle = {
    backgroundImage:
      "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientMove 15s ease-in-out infinite",
  };

  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ================= STATISTICS ================= */}
      <section className="py-16 bg-base-200 border-y border-base-300">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Clubs", value: "50+" },
            { label: "Members", value: "10k+" },
            { label: "Events Hosted", value: "150+" },
            { label: "Cities", value: "25+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold" style={animatedHeadingStyle}>
                {stat.value}
              </h2>
              <p className="text-xs uppercase tracking-widest opacity-60 font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="mb-20">
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
          WHY CHOOSE CLUBSPHERE?
        </h2>
          <p className="max-w-2xl mx-auto opacity-70 italic mt-4">
            Empowering communities with modern tools and seamless connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <FaUsers />,
              title: "Community Building",
              desc: "Connect with people who share your passions.",
            },
            {
              icon: <FaCalendarCheck />,
              title: "Event Management",
              desc: "Create and join events effortlessly.",
            },
            {
              icon: <FaGlobe />,
              title: "National Reach",
              desc: "Discover clubs from across the country.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-base-200 rounded-3xl shadow-xl border border-base-300"
            >
              <div className="text-5xl text-primary mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="opacity-70 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6">
        <div className="container mx-auto bg-primary text-primary-content rounded-[3rem] p-20 text-center shadow-2xl">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            START YOUR <br />
            <span style={animatedHeadingStyle}>LEGACY TODAY</span>
          </h2>
          <p className="opacity-80 max-w-xl mx-auto mb-10">
            Join a community that inspires growth and leadership.
          </p>
          <button className="btn btn-lg bg-white text-black rounded-full px-14 hover:scale-110 transition">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Attribute;
