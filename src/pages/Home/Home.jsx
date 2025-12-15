import React from 'react';
import HeroSection from './HeroSection';
import FeaturedClubs from './FeaturedClubs';
import HowItWorks from './HowItWorks';
import Categories from './PopularCategories';
import ReviewsSection from './ReviewsSection';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedClubs></FeaturedClubs>
            <HowItWorks></HowItWorks>
            <Categories></Categories>
            <ReviewsSection></ReviewsSection>
            
            
        </div>
    );
};

export default Home;