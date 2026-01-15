import React from "react";

const HelpSupport = () => {
  return (
    <section className="py-16 bg-base-100 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
         <h2 className="text-2xl md:text-4xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        HELP CENTER 
      </h2>
        

        <div className="join join-vertical w-full border border-base-300 dark:border-base-400 rounded-xl overflow-hidden">
          <div className="collapse collapse-arrow join-item border-b border-base-300 dark:border-base-400">
            <input type="radio" name="help-accordion" defaultChecked />
            <div className="collapse-title text-lg font-bold text-base-content dark:text-base-content">
              How do I create a club?
            </div>
            <div className="collapse-content text-base-content/70 dark:text-base-content/80">
              <p>
                Go to the Dashboard, click on "Create Club", fill in the details
                and wait for admin approval.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border-b border-base-300 dark:border-base-400">
            <input type="radio" name="help-accordion" />
            <div className="collapse-title text-lg font-bold text-base-content dark:text-base-content">
              What are the payment methods?
            </div>
            <div className="collapse-content text-base-content/70 dark:text-base-content/80">
              <p>
                We currently support SSLCommerz, Stripe, and mobile banking for
                membership fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSupport;
