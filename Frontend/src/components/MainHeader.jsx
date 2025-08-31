import React from 'react';
import {Link} from "react-router-dom";
import {Bell,Search} from "lucide-react";
import userImg from "../assets/user.png";
import logo from "../assets/logo.png"
const MainHeader = () => {
    return (
        <header className="bg-[#2D9CDB] h-[99px] px-[30px] flex items-center justify-between">
            <div className="logo">
                <img src = {logo} className = "size-[100px]"/>
            </div>
            <ul className="links flex items-center justify-between gap-[55px]">
                <li>
                  <Link to="/home" className="font-medium text-2xl text-white">الرئيسيه</Link>
                </li>
                <li>
                    <a href="#" className="font-medium text-2xl text-white">كيف تعمل المنصه؟</a>
                </li>
                <li>
                    <a href="#" className="font-medium text-2xl text-white">عنا</a>
                </li>
            </ul>
            <div className="options flex items-center gap-[39px]">
                <Link to = "/notify" className= "size-[40px] rounded-full border p-[8px] !bg-[#FFFFFF38] border-[#FFFFFF4F] text-white">
                    <Bell />
                </Link>
                <Link className= "size-[40px] rounded-full border p-[8px] !bg-[#FFFFFF38] border-[#FFFFFF4F] text-white">
                    <Search />
                </Link>
                <Link to="/profile" className="size-[50px]">
                    <img src = {userImg}/>
                </Link>
            </div>
        </header>
    )
}
export default MainHeader;