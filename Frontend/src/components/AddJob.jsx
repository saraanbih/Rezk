import React, {useEffect, useState} from 'react';
import  useAuth  from "../hooks/useAuth.jsx";
import { v4 as uuidv4 } from "uuid";
import {axiosPrivate} from "../api/axios.jsx";
import useCategory from "../hooks/useCategories.jsx";
const AddJob = () => {
    let [title,setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [country, setCountry] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [street, setStreet] = useState("");
    let [locationString,setLocationString] = useState("");
    const randomId = uuidv4();
    let [minSalary,setMinSalary] = useState(0);
    let [maxSalary,setMaxSalary] = useState(0);
    let [workTypeId,setWorkTypeId] = useState(0);
    let [createdAt,setCreatedAt] = useState("");
    let [category,setCategory] = useState({});
    let [categoryId, setCategoryId] = useState(0);
    let [latitude,setLatitude] = useState(0);
    let [longitude,setLongitude] = useState(0);
    const [coords, setCoords] = useState(null);
    const { auth } = useAuth();
    const { categories, setCategories } = useCategory();
    useEffect(() => {
        setLocationString(`${street}, ${city}, ${state}, ${country}`);
    }, [street,city,state,country]);
    useEffect(() => {
        setCreatedAt(new Date().toISOString());
    }, []);

    const getCoordinates = async () => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationString)}&format=json`
            );
            const data = await res.json();

            if (data.length > 0) {
                setLatitude(data[0].lat);
                setLongitude(data[0].lon);
                return { lat: data[0].lat, lon: data[0].lon };
            } else {
                alert("العنوان مش لاقيينه ");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const bodydata  = {

        title: title,
        description: description,
        locationString: locationString,
        latitude: latitude,
        longitude: longitude,
        minSalary: minSalary,
        maxSalary: maxSalary,
        workTypeId: workTypeId,
        categoryId: categoryId,

    };
    useEffect(() => {
        const addNewJob = async () => {
            try {
                const res = await axiosPrivate.post("/api/EmployerHome/AddJob",bodydata,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                console.log(res.data);

            } catch (err) {
                console.error(err);
            }
        };

        addNewJob();
    }, [axiosPrivate]);


console.log(categories)






























    const handleAddingJob = async (e) => {
        e.preventDefault();



    }
    return (
        <form className="flex-3 mt-[70px] border border-[#A6A6A6] rounded-[20px] py-[40px] px-[40px] flex flex-col gap-[50px] h-fit" onSubmit = {(e) => handleAddingJob(e)}>
           <div className = "grid grid-cols-3 gap-[40px]">
               <div className = "job_title flex flex-col gap-[10px]">
                   <label htmlFor ="job_title" className = "text-[30px] text-[#2D9CDB]">اسم الوظيفة</label>
                   <input className ="job_title border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_title"  onChange = {(e) => setTitle(e.target.value)}/>
               </div>
               <div className = "job_description flex flex-col gap-[10px]">
                   <label htmlFor ="job_description" className = "text-[30px] text-[#2D9CDB]">وصف الوظيفة</label>
                   <input className ="job_description border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_description" onChange = {(e) => setDescription(e.target.value)}/>
               </div>
               <div className = "min_Salary flex flex-col gap-[10px]">
                   <label htmlFor ="min_Salary" className = "text-[30px] text-[#2D9CDB]">أدنى راتب</label>
                   <input className ="min_Salary border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="number" id="min_Salary" min={0} onChange = {(e) => setMinSalary(e.target.value)}/>
               </div>
           </div>
            <div className = "grid grid-cols-3 gap-[40px]">
               <div className = "job_title flex flex-col gap-[10px]">
                   <label htmlFor ="max_salary" className = "text-[30px] text-[#2D9CDB]">أقصى راتب</label>
                   <input className ="max_salary border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="number" id="max_salary"  onChange = {(e) => setMaxSalary(e.target.value)}/>
               </div>
               <div className = "job_country flex flex-col gap-[10px]">
                   <label htmlFor ="job_country" className = "text-[30px] text-[#2D9CDB]">الدولة</label>
                   <input className ="job_country border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_country" onChange = {(e) => setCountry(e.target.value)}/>
               </div>
               <div className = "job_state flex flex-col gap-[10px]">
                   <label htmlFor ="job_state" className = "text-[30px] text-[#2D9CDB]">المحافظة</label>
                   <input className ="job_state border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_state" onChange = {(e) => setState(e.target.value)}/>
               </div>
           </div>
            <div className = "grid grid-cols-3 gap-[40px]">
               <div className = "job_city flex flex-col gap-[10px]">
                   <label htmlFor ="job_city" className = "text-[30px] text-[#2D9CDB]">المدينة</label>
                   <input className ="job_city border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_city"  onChange = {(e) => setCity(e.target.value)}/>
               </div>
               <div className = "job_street flex flex-col gap-[10px]">
                   <label htmlFor ="job_street" className = "text-[30px] text-[#2D9CDB]">رقم الشارع</label>
                   <input className ="job_street border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none" type="text" id="job_street" onChange = {(e) => setStreet(e.target.value)}/>
               </div>
               <div className = "job_type flex flex-col gap-[10px]">
                   <label htmlFor ="job_type" className = "text-[30px] text-[#2D9CDB]">نوع العمل</label>
                   <select className ="job_type border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none"  id="job_type" onChange = {(e) => setWorkTypeId(e.target.value)} >
                       <option value="">-- اختر نوع العمل --</option>
                       <option value="1">دوام كلى</option>
                       <option value="2">دوام جزئى</option>
                       <option value="3">عن بعد</option>
                   </select>
               </div>
           </div>
            <div className = "grid grid-cols-3 gap-[40px]">
                <label htmlFor ="job_category" className = "text-[30px] text-[#2D9CDB]">تصنيف الوظيفة</label>
                <select className ="job_category border border-[#A6A6A6] rounded-[10px] py-[15px] px-[10px] focus:border-[#2D9CDB] focus:outline-none"  id="job_category" onChange = {(e) => setCategoryId(parseInt(e.target.value))} >
                    <option value = "">-- اختر صنف الوظيفة --</option>
                    {/*{categories.map(category =>*/}
                    {/*    <option value={category.id} key = {category.id}>*/}
                    {/*    {category.name}*/}
                    {/*    </option>*/}
                    {/*)}*/}
                </select>
            </div>
            <div className = "flex items-center justify-center">
                <button className = " rounded-2xl bg-[#2D9CDB] py-4 w-[50%] font-medium text-2xl text-white cursor-pointer hover:bg-white hover:text-[#2D9CDB] hover:border hover:border-[#2D9CDB] transition-all duration-200 max-md:w-full"
               >حفظ الوظيفة</button>
            </div>
        </form>
    )
}
export default AddJob;


