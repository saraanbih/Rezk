import React from 'react';
import MainHeader from "../components/MainHeader.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import Categories from "../components/Categories.jsx";

import Recommendations from "../components/Recommendations.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";
const ApplicantHome = () => {


    return (
        <div className = "">
            <MainHeader />
            <HeroBanner />
            <Categories/>
            <Recommendations/>
            <HowItWorks/>
            <About/>
            <Footer/>
        </div>
    )
}
export default ApplicantHome;