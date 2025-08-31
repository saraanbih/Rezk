import React from 'react';
import logo from "../assets/logo.png";
import facebook from "../assets/facebook (1).png";
import instagram from "../assets/instagram (1).png";
import whatsapp from "../assets/whatsapp.png";
const Footer = () => {
    return (
        <footer className = "py-[90px] px-[70px] bg-[url('https://i.ibb.co/gM1vhF9G/Rectangle-634.png')] w-[100%] bg-cover relative before:content-[''] before:absolute before:size-full before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-[#2D9CDBB8] ">
          <div className = "content z-10 relative flex gap-[20px] items-start justify-between">
              <div className = "w-[calc((100%-60px)/4)] flex flex-col justify-center items-center">
                  <img src = {logo} className = "size-[100px] mb-[23px]"/>
                  <p className = "font-bold text-[32px] text-white">“رزق” هو منصه بتوصل بين الباحثين عن عمل واصحاب العمل بشكل بسيط وسريع وهدفنا ان احنا نسهل عليك تلاقي شغل مناسب او شخص مناسب لشغلك</p>
              </div>
              <div className = "w-[calc((100%-60px)/4)] flex flex-col justify-center items-center">
                  <h3 className = "font-bold text-[40px] text-white mb-[38px]">للدعم والتواصل</h3>
                  <ul className = "font-bold text-[32px] list-disc list-inside text-white">
                      <li>اتصل بنا</li>
                      <li>rezk806@gmail.com</li>
                  </ul>
              </div>
              <div className = "w-[calc((100%-60px)/4)] flex flex-col justify-center items-center">
                  <h3 className = "font-bold text-[40px] text-white mb-[38px]">روابط سريعه</h3>
                  <ul className = "font-bold text-[32px] list-disc list-inside text-white">
                      <li>الرئيسيه</li>
                      <li>الاسئله الشائعه</li>
                  </ul>
              </div>
              <div className = "w-[calc((100%-60px)/4)] flex flex-col justify-center items-center">
                  <h3 className = "font-bold text-[40px] text-white mb-[38px]">تابعنا</h3>
                  <ul className = "font-bold text-[32px] flex gap-[10px] items-center text-white">
                      <li><img src = {facebook}/></li>
                      <li><img src = {whatsapp}/></li>
                      <li><img src = {instagram}/></li>

                  </ul>
              </div>

          </div>
        </footer>
    )
}
export default Footer;

