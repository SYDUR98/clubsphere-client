import React from "react";

const About = () => {
  return (
    <section className="py-16 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-2xl md:text-4xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          ABOUT OUR PLATFORM
        </h2>
        <style>
          {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
        </style>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed font-medium text-base-content/70">
              We provide a comprehensive solution for club management,
              connecting passionate managers with active members in a seamless
              digital environment.
            </p>

            <div className="border-l-4 border-primary pl-4 py-2 bg-primary/10 rounded">
              <span className="italic text-base-content/80">
                “Empowering communities through organized collaboration and
                efficient management.”
              </span>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-base-200 p-8 rounded-2xl shadow-xl border border-base-300">
            <h3 className="text-xl font-black text-primary mb-4 uppercase">
              Our Mission
            </h3>
            <p className="font-medium text-base-content/70">
              To simplify the administrative overhead for club managers so they
              can focus on what truly matters: building great communities and
              hosting memorable events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
