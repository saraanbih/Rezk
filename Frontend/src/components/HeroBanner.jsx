import React from 'react';


const HeroBanner = () => {
    return (
        <div className= {`hero-banner bg-[url(https://i.ibb.co/bRqGQtQQ/1.png)] bg-no-repeat bg-cover w-full h-[543px] relative before:content-[""] before:absolute 
        before:bg-linear-to-r before:from-[#2D9CDB] before:to-[#E4E4E4] before:size-full before:top-0 before:bottom-0 before:left-0 before:right-0 before:opacity-30 flex justify-start `}>
            <div className= "pr-[63px] pt-[100px] w-[750px]">
               <h1 className="font-bold !text-[96px] text-white">هتلاقي <span className="text-[#2D9CDB]">رزقك</span> هنا بسهوله!</h1>
                <p className="font-bold text-[36px] text-white">خطوه واحده تفصلك عن شغلك الجديد</p>
            </div>
        </div>
    )
}
export default HeroBanner;

