import React from 'react';
import arrow from "../assets/arrow.png";
import clipBoard from "../assets/clipboard-export.png";
import search from "../assets/search-normal.png";
import userProfile from "../assets/user-tick.png";



const HowItWorks = () => {
    return (
        <div id='howItWorks' className = "my-[85px] ">
            <h2 className = "text-center font-medium text-[40px] text-[#2D9CDB] mb-[100px]">كييف تعمل المنصه؟</h2>
                <div style={{display:"flex", alignItems:"center", flexWrap:"wrap", justifyContent:"center", gap:"30px"}}>
                    <div className = "flex items-center justify-center ">
                        <div className = "rounded-[20px] border border-[#A6A6A6] w-[350px] h-[310px] flex items-center justify-center flex-col gap-[10px]">
                            <img src = {clipBoard}/>
                            <h3 className = "font-bold !text-[32px]">قدم عليها</h3>
                        </div>
                    </div>
                        <img src = {arrow} />
                    <div className = "flex items-center justify-center ">
                        <div className = "rounded-[20px] border border-[#A6A6A6] w-[350px] h-[310px] flex items-center justify-center flex-col gap-[10px]">
                            <img src = {search}/>
                            <h3 className = "font-bold !text-[32px] text-center w-[250px]">شوف الوظيفه المناسبه ليك</h3>
                        </div>
                    </div>
                        <img src = {arrow} />
                    <div className = "flex items-center justify-center ">
                        <div className = "rounded-[20px] border border-[#A6A6A6] w-[350px] h-[310px] flex items-center justify-center flex-col gap-[10px]">
                            <img src = {userProfile}/>
                            <h3 className = "font-bold !text-[32px]">سجل دخولك </h3>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default HowItWorks;
