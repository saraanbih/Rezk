import HeroBannerEmployer from "../components/HeroBannerEmployer.jsx";
import MainEmployer from "../components/MainEmployer.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

import { Outlet } from "react-router-dom";

function EmployerHome() {


    return (
        <>
            {/* <EmployerHeader /> */}
            <HeroBannerEmployer>
                {/* <SideBarEmployer /> */}
                {/* <Outlet /> */}
                <MainEmployer />
            </HeroBannerEmployer>
            <HowItWorks />
            <About />
            <Footer />
        </>
    );
}


export default EmployerHome;