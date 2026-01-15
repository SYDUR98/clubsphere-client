import React from "react";

const PrivacyTerms = () => {
  return (
    <section className="py-16 bg-base-100 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-base-100 dark:bg-base-200 p-10 rounded-3xl shadow-2xl border border-base-300 transition-colors duration-300">
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
            PRIVACY POLICY
          </h2>

          <div className="prose max-w-none text-base-content/70 dark:text-base-content/80 font-medium leading-relaxed">
            <p className="mb-4">
              Your data security is our priority. We collect minimal information
              required to manage your club memberships and event registrations.
            </p>
            <h2
              className="text-xl md:text-xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
                backgroundSize: "300% 300%",
                animation: "gradientMove 15s ease-in-out infinite",
              }}
            >
              TERMS OF USE
            </h2>
            <p>
              By using this platform, you agree to provide accurate information
              and respect the community guidelines established by club managers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTerms;
