
import React, { useRef, useState, useEffect,useContext } from 'react';
import {Eye,EyeOff} from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from "../Context/AuthProvider.jsx";
import cuateImg from '../assets/cuate.png';
import axios from "../api/axios.jsx";
let LOGIN_URL = "/api/Auth/Login";
import {jwtDecode} from "jwt-decode";
const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const emailRef = useRef(null);
    const errRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const token = response?.data?.token;
            
            const role = response?.data?.role;
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);

            setAuth({ email : decoded.email,password :  decoded.password, role : decoded.role, token ,id : decoded.id});
            setEmail('');
            setPassword('');

            navigate(from, { replace: true });
            if(response?.data?.role === "Applicant" ) {
                navigate("/applicantHome");
            }else {
                navigate("/employerHome");
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
            <>
                    <div className="w-full h-[100vh] flex max-md:flex-col-reverse">
                                <>
                                    <div
                                        className="w-[50%] pt-35 flex flex-col items-center h-[100%] max-md:w-full max-md:h-[50vh] max-md:pt-10">
                                        <h2 className="font-bold text-4xl mb-10 ">تسجيل الدخول</h2>
                                        <form className = "w-[60%] relative  " onSubmit = {(e) => handleLogin(e)}>
                                            <p ref={errRef} className={errMsg ? "bg-[lightpink] text-[firebrick]" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                            <div className = "flex flex-col w-[100%] gap-[16px] max-md:w-full mb-[23px]" >
                                                <label className = "font-medium text-2xl" htmlFor="email"> البريد الالكتروني</label>
                                                <input className = "rounded-2xl border border-[#1E1E1E] h-[65px] focus:border-[#2D9CDB] focus:outline-none transition-all duration-200 p-2.5"
                                                       type = "email"
                                                       id = "email"
                                                       required
                                                       autoComplete="off"
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       ref={emailRef }
                                                       value = {email}
                                                />
                                            </div>
                                            <div className = "flex flex-col w-[100%] gap-[16px] max-md:w-full">
                                                <label className = "font-medium text-2xl" htmlFor="userPassword">كلمه السر</label>
                                                <div className = "flex w-full relative items-center">
                                                    <input className = "rounded-2xl border border-[#1E1E1E] h-[65px]  w-full focus:border-[#2D9CDB] focus:outline-none transition-all duration-200 p-2.5"
                                                           type = {isPasswordShown ? "text" : "password"}
                                                           id = "userPassword"
                                                           required
                                                           autoComplete="off"
                                                           value = {password}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    {isPasswordShown ?
                                                        <EyeOff className= "absolute left-[17px] cursor-pointer" onClick={() => {
                                                            setIsPasswordShown(false);
                                                        }}/>
                                                        :
                                                        <Eye className= "absolute left-[17px] cursor-pointer" onClick={() => {
                                                            setIsPasswordShown(true);

                                                        }}/>
                                                    }
                                                </div>
                                            </div>
                                            <a href = "#" className = "absolute left-0 pt-6 font-medium text-[16px] text-[#919191]">نسيت كلمه السر ؟</a>
                                            <div className = "flex items-center justify-center mt-16 w-[100%] mb-[45px]" >
                                                <button className = " rounded-2xl bg-[#2D9CDB] py-4 w-[100%] font-medium text-2xl text-white cursor-pointer hover:bg-white hover:text-[#2D9CDB] hover:border hover:border-[#2D9CDB] transition-all duration-200 max-md:w-full"
                                                >تسجيل الدخول </button>
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <span className = "block w-[50%] h-[1px] bg-[#A6A6A6] "></span>
                                            </div>
                                            <div className = "flex flex-col items-center mt-[37px] gap-4">
                                                <span className = "font-medium text-base text-[#263238]">تسجيل الدخول عبر </span>
                                                {/*<div className = "flex items-center gap-4">*/}
                                                {/*    <img src = {mail} className = "cursor-pointer"/>*/}
                                                {/*    <img src = {google} className = "cursor-pointer"/>*/}
                                                {/*    <img src = {facebook} className = "cursor-pointer"/>*/}
                                                {/*</div>*/}
                                            </div>
                                        </form>

                                    </div>
                                    <div
                                        className="w-[50%] max-h-[100%] bg-[#2D9CDB] relative pt-14 pb-40 flex flex-col items-end px-24 justify-between max-md:w-full max-md:h-[50vh] max-md:flex-row max-md:items-center max-md:pb-5 max-md:px-7 ">
                                        <div
                                            className="header flex items-center gap-3.5  max-md:flex max-md:flex-col max-md:gap-[16px] max-md:text-center max-sm:w-full">
                                            <h3 className="font-bold text-[20px] text-white">ليس لديك حساب بالفعل ؟</h3>
                                            <Link to="/signup" className="w-[83px] h-[44px] py-[13px] px-[16px] !bg-white rounded-[41px]
                      font-medium text-[16px] text-[#2D9CDB] flex items-center justify-center
                      hover:!bg-[#2D9CDB] hover:text-white hover:border hover:border-white transition-all duration-200">اشتراك</Link>
                                        </div>
                                        <div className="self-center max-sm:hidden ">
                                            <img src={cuateImg} className=" h-[365px] max-md:h-[300px] max-md:w-[350px]"/>
                                        </div>
                                    </div>
                                </>
                    </div>
            </>
        )


}
export default Login;

