import React,{useState,useEffect} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import { useLocation, useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";
import Footer from "../components/Footer.jsx";




const CategoryJobs = () => {
    let [singleCategory,setSingleCategory] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const { categoryId, categoryTitle } = useParams();
    const location = useLocation();
    const { categoryName } = location.state || {};

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diff = (now - past) / 1000; // الفرق بالثواني

        if (diff < 60) return `منذ ${Math.floor(diff)} ثانية`;
        if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
        if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
        return `منذ ${Math.floor(diff / 86400)} يوم`;
        }

    useEffect(() => {
        const getSingleCategoryJobs = async () => {
            try {
                const res = await axiosPrivate.get(`/api/ApplicantHome/CategoryJobs/${categoryId}`,{
                    params: {
                        id : categoryId,
                        title: categoryTitle
                    }
                });
                console.log(res.data);
                setSingleCategory(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getSingleCategoryJobs();
    }, [axiosPrivate]);

    return (
        <div>
            <MainHeader/>
            <div>
                <div className="p-6">
        <h1 className="text-2xl mb-4" style={{color:"#2D9CDB", fontWeight:500, fontSize:"32px"}}>{categoryName}</h1>
        {singleCategory.length === 0 ? <h2 style={{textAlign:"center", margin:"20px 0px", fontSize:"32px"}}>لا توجد وظائف</h2> : (
        <ul style={{display:"flex", gap:"50px", flexWrap:"wrap"}}>
            {singleCategory.map((job) => (
                <li key={job.id} className="p-4 rounded-lg shadow" style={{width: "500px", display:"grid", border:"1px solid #ACACAC"}}>
                    <div style={{display: "flex", justifyContent:"space-between", gap:"20px"}} className="job_content">
                        <div className="txt_description">
                            <h4 style={{fontWeight:"600"}}>{job.title}</h4>
                            <p style={{color:"#ACACAC", width:"70%", fontSize:"14px", marginTop:"15px"}}>{job.description}</p>
                            <p style={{color:"#ACACAC", margin:"15px 0px"}}>الاجر المتوقع: {job.maxSalary + job.minSalary / 2}</p>
                            <div className="location_container">
                                <div>
                                    <svg  style={{display: "inline"}} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4501 14.17C10.3201 14.17 8.58008 12.44 8.58008 10.3C8.58008 8.16 10.3201 6.44 12.4501 6.44C14.5801 6.44 16.3201 8.17 16.3201 10.31C16.3201 12.45 14.5801 14.17 12.4501 14.17ZM12.4501 7.94C11.1501 7.94 10.0801 9 10.0801 10.31C10.0801 11.62 11.1401 12.68 12.4501 12.68C13.7601 12.68 14.8201 11.62 14.8201 10.31C14.8201 9 13.7501 7.94 12.4501 7.94Z" fill="#2D9CDB"/>
                                    <path d="M12.4489 22.76C10.9689 22.76 9.47891 22.2 8.31891 21.09C5.36891 18.25 2.10891 13.72 3.33891 8.33C4.44891 3.44 8.71891 1.25 12.4489 1.25C12.4489 1.25 12.4489 1.25 12.4589 1.25C16.1889 1.25 20.4589 3.44 21.5689 8.34C22.7889 13.73 19.5289 18.25 16.5789 21.09C15.4189 22.2 13.9289 22.76 12.4489 22.76ZM12.4489 2.75C9.53891 2.75 5.79891 4.3 4.80891 8.66C3.72891 13.37 6.68891 17.43 9.36891 20C11.0989 21.67 13.8089 21.67 15.5389 20C18.2089 17.43 21.1689 13.37 20.1089 8.66C19.1089 4.3 15.3589 2.75 12.4489 2.75Z" fill="#2D9CDB"/>
                                    </svg>
                                    <span style={{color:"#ACACAC"}}>{job.locationString}</span>
                                </div>
                                {/* <div>
                                    <svg  style={{display: "inline"}} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4501 14.17C10.3201 14.17 8.58008 12.44 8.58008 10.3C8.58008 8.16 10.3201 6.44 12.4501 6.44C14.5801 6.44 16.3201 8.17 16.3201 10.31C16.3201 12.45 14.5801 14.17 12.4501 14.17ZM12.4501 7.94C11.1501 7.94 10.0801 9 10.0801 10.31C10.0801 11.62 11.1401 12.68 12.4501 12.68C13.7601 12.68 14.8201 11.62 14.8201 10.31C14.8201 9 13.7501 7.94 12.4501 7.94Z" fill="#2D9CDB"/>
                                    <path d="M12.4489 22.76C10.9689 22.76 9.47891 22.2 8.31891 21.09C5.36891 18.25 2.10891 13.72 3.33891 8.33C4.44891 3.44 8.71891 1.25 12.4489 1.25C12.4489 1.25 12.4489 1.25 12.4589 1.25C16.1889 1.25 20.4589 3.44 21.5689 8.34C22.7889 13.73 19.5289 18.25 16.5789 21.09C15.4189 22.2 13.9289 22.76 12.4489 22.76ZM12.4489 2.75C9.53891 2.75 5.79891 4.3 4.80891 8.66C3.72891 13.37 6.68891 17.43 9.36891 20C11.0989 21.67 13.8089 21.67 15.5389 20C18.2089 17.43 21.1689 13.37 20.1089 8.66C19.1089 4.3 15.3589 2.75 12.4489 2.75Z" fill="#2D9CDB"/>
                                    </svg>
                                    <span style={{color:"#ACACAC"}}>{job.locationString}</span>
                                </div> */}
                                <div style={{marginTop:"20px", display:"flex", gap:"10px"}} className="job_btns">
                                    <button style={{cursor:"pointer",width:"100px",padding:"6px 20px", borderRadius:"10px", backgroundColor:"#2D9CDB", color:"#fff"}} className="apply_job_btn">قدم</button>
                                    <button style={{cursor:"pointer",width:"150px",padding:"6px 20px", borderRadius:"10px", border:"1px solid #2D9CDB", color:"#2D9CDB"}} className="save_job_btn">حفظ الوظيفه</button>
                                </div>
                            </div>
                        </div>
                            <div className="created_at_container">
                                <p style={{color:"#ACACAC"}}>{timeAgo(job.createdAt)}</p>
                            </div>
                    </div>
                </li>
            ))
            }
            </ul>
        )}
        </div>
            </div>
            <Footer/>
        </div>
    )
}


export default CategoryJobs;