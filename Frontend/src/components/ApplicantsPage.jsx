    import { useLocation, useParams } from "react-router-dom";
    import axios from "axios";
    import { useState } from "react";
import EmployerHeader from "./EmployerHeader";

    const ApplicantsPage = () => {
    const { state } = useLocation(); // جاي من الـ navigate
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState(state?.applications || []);
    console.log(jobId)

    // تحديث حالة المتقدم
    const updateStatus = async (applicantId, newStatus) => {
            try {
        const token = localStorage.getItem("token");
        await axios.put(
        `https://rezk.azurewebsites.net/api/EmployerHome/UpdateApplicationStatus/${jobId}/${applicantId}/${newStatus}`,
        {},
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        if (newStatus === 1) { // قبول
        setApplicants((prev) =>
            prev.map((a) =>
            a.id === applicantId ? { ...a, status: newStatus } : a
            )
        );
        alert("تم قبول الطلب");
        setApplicants((prev) => prev.filter((a) => a.id !== applicantId));
        } else if (newStatus === 2) { // رفض
        setApplicants((prev) => prev.filter((a) => a.id !== applicantId));
        }
    } catch (err) {
        console.error(err);
        alert("حصل خطأ أثناء تحديث الحالة");
    }
    };
    return (
        <>
            <EmployerHeader />
        <div className="p-6">
        <h2 style={{marginBottom:"30px"}} className = "font-medium text-[40px] text-[#2D9CDB]" >المتقدمين:</h2>

        {applicants.length === 0 ? (
            <p>لا يوجد متقدمين</p>
        ) : (
            applicants.map((a) => (
            <div  style={{width:"450px", padding:"20px"}} key={a.id} className="border p-3 rounded mb-3">
                <h3 style={{fontSize:"24px", marginBottom:"20px"}} className="font-semibold">{a.name}</h3>
                <p className="text-[#ACACAC] font-medium text-[18px]">الهاتف: {a.phoneNumber}</p>
                <p style={{margin:"10px 0px"}} className="text-[#ACACAC] font-medium text-[18px]">الحالة: {a.statusId}</p>
                <p className="text-[#ACACAC] font-medium text-[18px]">الموقع: {a.locationString}</p>

                <button
                style={{margin:"20px 0px 10px 10px"}}
                className="rounded-[10px] py-[9px] px-[24px] bg-[white] border border-[#2D9CDB94] text-[18px] font-medium text-[#2D9CDB94] cursor-pointer"
                onClick={() => updateStatus(a.id, 1)} // مقبول
                >
                قبول
                </button>
                <button
                className="rounded-[10px] py-[9px] px-[24px] bg-[white] border border-[#2D9CDB94] text-[18px] font-medium text-[#2D9CDB94] cursor-pointer"
                onClick={() => updateStatus(a.id, 2)} // مرفوض
                >
                رفض
                </button>
            </div>
            ))
        )}
        </div>
        </>
    );
    };

    export default ApplicantsPage;
