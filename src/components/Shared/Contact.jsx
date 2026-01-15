import React from "react";

const Contact = () => {
  return (
    <section className="py-16 bg-base-100 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Left Info */}
        <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        CONTACT US
      </h2>
          <p className="font-bold text-base-content/70">
            Have questions? We'd love to hear from you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-base-content/80">
              <div className="p-3 bg-primary/10 rounded-lg text-primary text-xl">
                📧
              </div>
              <span className="font-bold">support@clubmanage.com</span>
            </div>

            <div className="flex items-center gap-4 text-base-content/80">
              <div className="p-3 bg-secondary/10 rounded-lg text-secondary text-xl">
                📍
              </div>
              <span className="font-bold">Sylhet, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full bg-base-200 dark:bg-base-300 border-base-300 dark:border-base-400 focus:outline-primary text-base-content dark:text-base-content"
          />
          <textarea
            placeholder="Message"
            className="textarea textarea-bordered w-full h-32 bg-base-200 dark:bg-base-300 border-base-300 dark:border-base-400 focus:outline-primary text-base-content dark:text-base-content"
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary w-full font-black uppercase tracking-widest text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
