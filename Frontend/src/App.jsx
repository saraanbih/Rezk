import React from 'react';
import {Routes,Route } from "react-router";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ApplicantHome from "./pages/ApplicantHome.jsx";
import EmployerHome from "./pages/EmployerHome.jsx";
import MainEmployer from "./components/MainEmployer.jsx";
import AddJob from "./components/AddJob.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import CategoryJobs from "../src/pages/CategoryJobs.jsx";
import NearbyJobs from './components/NearbyJobs.jsx';
import ApplicantsPage from './components/ApplicantsPage.jsx';

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<RequireAuth />}>
                    <Route path="/applicantHome/" element={<ApplicantHome />} />
                    <Route path="category/:categoryId" element={<CategoryJobs />} />
                    <Route path='moreNearByJobs' element={<NearbyJobs />} />
                    <Route path="/applicants/:jobId" element={<ApplicantsPage />} />
                    <Route path="/employerHome" element={<EmployerHome />} >
                        <Route index element={<MainEmployer />} />
                        <Route path="addJob" element={<AddJob />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
};

export default App;