import React, { useEffect, useState } from 'react';
import {ArrowDown} from "lucide-react";
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import {Link} from "react-router-dom";


    const Recommendations = () => {
    let [jobs,setJobs] = useState([]);
    const axiosPrivate = useAxiosPrivate();

useEffect(() => {
    const getNearbyJobs = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const res = await axiosPrivate.get("/api/ApplicantHome/NearbyJobs", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
            });
            console.log(res.data);
            setJobs(res.data);
        } catch (err) {
            console.error("Error fetching nearby jobs:", err);
            if (err.response) {
            console.error("Backend says:", err.response.data); // ✅ دي هتوضح السبب
        }
        }
    };

    getNearbyJobs();
}, [axiosPrivate]);

const handleApply = async (jobId, isApplied) => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) return alert("لم يتم تسجيل الدخول");
        if (!isApplied) {
            // التقديم
            const res = await axiosPrivate.post(
                `/api/ApplicantHome/ApplyToJob/${jobId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Apply success:", res.data);
            setJobs(prev =>
                prev.map(job =>
                    job.id === jobId ? { ...job, applied: true } : job
                )
            );
        } else {
            // إلغاء التقديم
            const res = await axiosPrivate.delete(
                `/api/ApplicantHome/RemoveApplication/${jobId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Cancel success:", res.data);
            setJobs(prev =>
                prev.map(job =>
                    job.id === jobId ? { ...job, applied: false } : job
                )
            );
        }
    } catch (err) {
        console.error("Error applying/cancelling job:", err);
        if (err.response) {
            console.error("Backend says:", err.response.data.message);
            if (err.response.data.message.includes("already applied")) {
                // خلي الزرار يظهر كإلغاء مباشرة
                setJobs(prev =>
                    prev.map(job =>
                        job.id === jobId ? { ...job, applied: true } : job
                    )
                );
            }
        }
    }
};
    return (
        <div className = "flex flex-col items-center mt-[58px] px-[45px]">
            <h3 className = "font-medium text-[40px] text-[#2D9CDB]">وظائف مميزه قريبه منك</h3>
            <div style={{display:"flex", flexWrap:"wrap", gap: "20px", margin:"30px 0px"}} className="nearby_jobs_container">
            {jobs.map((job)=>{
                return(
            <div key={job.id}>
                <div style={{width: "400px", height:"600px"}} className = " rounded-[20px] border border-[#A3A3A3] py-[31px] px-[44px] flex flex-col ">
                    <div className= "title text-center font-bold text-[32px] mb-[36px]">
                        <h2>{job.title}</h2>
                    </div>
                    <div style={{height:"10%"}} className= "location text-center font-bold text-[24px] text-[#9D9D9D] mb-[45px]">
                        <h3>{job.locationString}</h3>
                    </div>
                    <div style={{height:"30%"}} className="description ">
                        <p className = "font-bold !text-[24px] text-[#9D9D9D] mb-[36px]">{job.description}</p>
                    </div>
                    <div className="salary font-bold text-[24px] text-[#9D9D9D] mb-[36px]">
                        <h3>الراتب: {job.minSalary + job.maxSalary / 2}</h3>
                    </div>
                    <div className="time font-bold text-[24px] text-[#9D9D9D] mb-[36px]">
                        <h3>{job.workType.arabicLabel}</h3>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                        onClick={() => handleApply(job.id, job.applied)}
                        className={`rounded-[20px] w-[60%] h-[50px] py-[8px] font-bold !text-[22px] flex items-center justify-center cursor-pointer 
                        ${job.applied ? "bg-red-500 text-white" : "bg-[#2D9CDB] text-white"}`}
                        >
                            {job.applied ? "إلغاء الطلب" : "قدم"}
                        </button>
                    </div>
                </div>
            </div>
                )
            })}
            </div>
            <div style={{marginTop:"50px", padding:"10px 20px"}} className = "more bg-[#2D9CDB] h-[72px] rounded-[40px] flex items-center justify-center gap-[16px] ">
                <Link to={'/moreNearByJobs'} style={{display: "flex", alignItems:"center",justifyContent:"center"}}>
                    <button style={{cursor:"pointer"}} className = "font-bold !text-[28px] text-white">المزيد من الوظائف القريبه منك</button>
                    <ArrowDown style={{display:"inline", margin:"0px 20px"}} className = "text-white cursor-pointer"/>
                </Link>
            </div>
        </div>
    )
}

export default Recommendations;
