import React from "react";

const Blog = () => {
  const blogs = [
    {
      title: "How to Grow Your Club",
      date: "Jan 10, 2026",
      desc: "Discover the top 5 strategies to attract new members.",
    },
    {
      title: "Managing Large Events",
      date: "Jan 05, 2026",
      desc: "Tips and tricks for handling events with 500+ attendees.",
    },
  ];

  return (
    <section className="py-16 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        LATEST STORIES 
      </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((b, i) => (
            <div
              key={i}
              className="
                bg-base-200 p-6 rounded-2xl shadow-lg
                border border-base-300
                transition-all duration-300
                hover:border-primary
              "
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {b.date}
              </span>

              <h3 className="text-xl md:text-2xl font-black mt-2 mb-3 text-base-content">
                {b.title}
              </h3>

              <p className="text-base-content/70 font-medium">
                {b.desc}
              </p>

              <button className="mt-6 text-secondary font-bold text-sm uppercase hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
