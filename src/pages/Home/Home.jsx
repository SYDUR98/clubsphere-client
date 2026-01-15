import React from 'react';
import HeroSection from './HeroSection';
import FeaturedClubs from './FeaturedClubs';
import HowItWorks from './HowItWorks';
import Categories from './PopularCategories';
import ReviewsSection from './ReviewsSection';
import Attribute from './Attribute';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedClubs></FeaturedClubs>
            <HowItWorks></HowItWorks>
            <Categories></Categories>
            <ReviewsSection></ReviewsSection>
            <Attribute></Attribute>
            
            
        </div>
    );
};

export default Home;