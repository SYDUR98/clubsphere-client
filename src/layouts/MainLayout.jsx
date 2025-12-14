import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar';

const MainLayout = () => {
    return (
        <div className="w-full">
            <Navbar />
            {/* Content container centered with standard padding */}
            <div className="w-full px-4 md:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;