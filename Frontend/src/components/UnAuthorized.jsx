import React from "react";
import {Link} from "react-router-dom";
const UnAuthorized = () => {
    return (
        <section className = "w-full h-[100vh] bg-[#1E1E1E] text-white flex items-center justify-center flex-col gap-[16px]">
            <h2 className = "text-[firebrick] text-[40px]">غير موثق </h2>
            <Link to = "/" className = "underline"> من فضلك قم بتسجيل الدخول</Link>
        </section>
    )
}
export default UnAuthorized;