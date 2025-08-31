import React from 'react';
import user2 from "../assets/profile-2user.png"
import check from "../assets/shield-tick.png";
import searchwithheart from "../assets/search-favorite.png"
const About = () => {
    return (
        <>
            <div className = "my-[85px] px-[56px]">
                <h2 className = "text-center font-medium text-[40px] text-[#2D9CDB] mb-[100px]">3 اسباب لاختيارنا</h2>
                <div className = "grid grid-cols-3 gap-[64px]">
                    <div className = "flex flex-col items-center  text-center py-[93px] border border-[#A3A3A3] rounded-[20px] px-[35px] relative before:content-[''] before:absolute before:h-[17px] before:bg-[#2D9CDB] before:w-[70%] before:rounded-[17px] before:top-0">
                        <img src = {user2} className = "mb-[40px] size-[80px]"/>
                        <h3 className = "font-bold text-[32px] w-[70%]">مرونه واختيارات متنوعه</h3>
                        <p className = "font-bold text-[24px] text-[#9D9D9D]">تقدر تختار بين مجالات ومهارات مختلفة، يناسبك إيه هتلاقيه هنا.</p>
                    </div>
                    <div className = "flex flex-col items-center  text-center py-[93px] border border-[#A3A3A3] rounded-[20px] px-[35px] relative before:content-[''] before:absolute before:h-[17px] before:bg-[#2D9CDB] before:w-[70%] before:rounded-[17px] before:top-0">
                        <img src = {check} className = "mb-[40px] size-[80px]"/>
                        <h3 className = "font-bold text-[32px] w-[70%]">موثوقيه وجوده</h3>
                        <p className = "font-bold text-[24px] text-[#9D9D9D]">كل البروفايلات متراجعة بعناية علشان نوصل الناس الجادين بس، بعيد عن العشوائية.</p>
                    </div>
                    <div className = "flex flex-col items-center  text-center py-[93px] border border-[#A3A3A3] rounded-[20px] px-[35px] relative before:content-[''] before:absolute before:h-[17px] before:bg-[#2D9CDB] before:w-[70%] before:rounded-[17px] before:top-0">
                        <img src = {searchwithheart} className = "mb-[40px] size-[80px]"/>
                        <h3 className = "font-bold text-[32px] w-[70%]">سهوله وسرعه</h3>
                        <p className = "font-bold text-[24px] text-[#9D9D9D]">في ثواني تلاقي الموظف أو صاحب العمل المناسب من غير وجع دماغ ولا بحث طويل.</p>
                    </div>
                </div>
            </div>
        </>)
}
export default About;