import React,{useState,useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import MainHeader from './MainHeader.jsx';

const NearbyJobs = () => {
        let [jobs,setJobs] = useState([]);
        const axiosPrivate = useAxiosPrivate();
    // let [jobs,setJobs] = useState([]);
    // const axiosPrivate = useAxiosPrivate();
    // let [latitude,setLatitude] = useState(0);
    // let [longitude,setLongitude] = useState(0);

    // const options = {
    //     maximumAge : 10000,
    //     enableHighAccuracy: false,
    //     timeout: 20000,
    // };
    // const success = async (pos) => {
    //     const { latitude, longitude } = pos.coords;

    //     try {
    //         const res = await fetch(
    //             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    //         );
    //         const data = await res.json();
    //         console.log(data)
    //         setLatitude(latitude);
    //         setLongitude(longitude);
    //     }catch(error ) {
    //         console.log(error);
    //     }
    // }
    // const erro = (err) => {
    //     console.log(err);
    // }
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition( success,erro,options);
    // },[]);


    // useEffect(() => {
    //     const getNearbyJobs = async () => {
    //         try {
    //             const res = await axiosPrivate.get("/api/ApplicantHome/NearbyJobs",{
    //                 params: {
    //                     applicantLatitude : latitude,
    //                     applicantLongitude : longitude
    //                 }
    //             });
    //             console.log(res.data);
    //             setJobs(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     getNearbyJobs();
    // }, [axiosPrivate,latitude,longitude]);

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
            }
        };
    
        getNearbyJobs();
    }, [axiosPrivate]);

    return (
        <>
            <MainHeader />
            <div className = "flex flex-col items-center mt-[58px] px-[45px]">
            <h3 className = "font-medium text-[40px] text-[#2D9CDB]">وظائف مميزه قريبه منك</h3>
            <div style={{display:"flex", flexWrap:"wrap", gap: "20px", margin:"30px 0px", height:"650px"}} className="nearby_jobs_container">
                {jobs.map((job)=>{
                return(
            <div key={job.id}>
                <div style={{width: "400px", height:"600px"}} className = " rounded-[20px] border border-[#A3A3A3] py-[31px] px-[44px] flex flex-col ">
                    {/* <div className = "img flex items-center justify-center mb-[28px]">
                        <img src = {job}/>
                    </div> */}
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
                    <div className = "w-full flex items-center justify-center">
                        <button className = "rounded-[20px] w-[60%] h-[50px] py-[8px] bg-[#2D9CDB] font-bold !text-[32px] text-white flex items-center justify-center cursor-pointer">قدم</button>
                    </div>
                </div>
                {/* <NearbyJobs/> */}
            </div>
                )
            })}
            </div>
            </div>
        </>
    )
}

export default NearbyJobs;