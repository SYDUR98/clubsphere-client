
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main Content */}
      <div className="w-full flex-1 px-4 md:px-6 lg:px-8">
        <Outlet />
      </div>

      {/* Footer wrapped in a centered max-width container */}
      <FooterWrapper />
    </div>
  );
};

const FooterWrapper = () => (
  <div className="w-full bg-base-200">
    <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
      <Footer />
    </div>
  </div>
);

export default MainLayout;
