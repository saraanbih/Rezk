import React from 'react';
import user from "../assets/user.png";
import {Link} from "react-router";
import EmployerHomeImg from "../assets/employerHomeImg.png"
const SideBarEmployer = () => {
    return (
        <div className = "flex-1 flex flex-col h-[100%] border border-[#A6A6A6] pt-[70px]">
           <div className = "flex flex-col items-center gap-[10px] mb-[20px]">
               <img src = {user} className= "size-[100px]"/>
               <h3 className = "font-bold text-[32px]">مرحبا، يمني</h3>
               <h4 className = "font-medium text-[24px] text-[#ACACAC]">هايبر ماركت الرحمه</h4>
           </div>
            <ul className = "flex flex-col items-center justify-center w-full">
                <li className = "border-t border-[#A6A6A6] w-full py-[23px] pr-[35px] font-medium text-[24px]">
                    <Link>الرئيسيه</Link>

                </li>
                <li className = "border-t border-[#A6A6A6] w-full py-[23px] pr-[35px] font-medium text-[24px]">
                    <Link>المتقدمين</Link>

                </li>
                <li className = "border-t border-[#A6A6A6] w-full py-[23px] pr-[35px] font-medium text-[24px]">
                    <Link>الوظائف</Link>

                </li>
                <li className = "border-b border-t border-[#A6A6A6] w-full py-[23px] pr-[35px] font-medium text-[24px]">
                    <Link to = "/employerHome/addJob">اضافة وظيفه</Link>
                </li>
            </ul>
            <div>
                <img src = {EmployerHomeImg}/>
            </div>
        </div>
    )
}
export default SideBarEmployer;