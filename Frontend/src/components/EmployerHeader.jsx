import React from 'react';
import {Link} from "react-router-dom";
import {Bell, Plus} from "lucide-react";
import userImg from "../assets/user.png";
import logo from "../assets/logo.png"

const EmployerHeader = ({onClick}) => {
    return (
        <header className="bg-[#2D9CDB] h-[99px] px-[30px] flex items-center justify-between">
            <div className="logo">
                <img src = {logo} className = "size-[100px]"/>
            </div>

            <div className="options flex items-center gap-[39px]">
                <Link to = "/notify" className= "size-[40px] rounded-full border p-[8px] !bg-[#FFFFFF38] border-[#FFFFFF4F] text-white">
                    <Bell />
                </Link>
                <Link onClick={onClick} className= "size-[40px] rounded-full border p-[8px] !bg-[#FFFFFF38] border-[#FFFFFF4F] text-white">
                    <Plus />
                </Link>
                <Link to="/profile" className="size-[50px]">
                    <img src = {userImg}/>
                </Link>
            </div>
        </header>
    )
}
export default EmployerHeader;