import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, InfoIcon, Check, TimerIcon } from "lucide-react";
import userImg from "../assets/user.png";
import axios from "../api/axios.jsx";
import SignUpRow from "../components/SignUpRow.jsx";
import SignUpItem from "../components/SignUpItem.jsx";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NATIONAL_ID_REGEX =
  /^(2|3)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{7}$/;
let PHONE_NUMBER_REGEX = /^01[0-2,5]{1}[0-9]{8}$/;
let EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let REGISTER_URL = "/api/Auth/register";

const Signup = () => {
  const userNameRef = useRef(null);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);
  const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);
  const [isPasswordMatchShown, setIsPasswordMatchShown] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [nationalId, setNationalId] = useState("");
  const [validNationalId, setValidNationalId] = useState(false);
  const [nationalIdFocus, setNationalIdFocus] = useState(false);

  const [role, setRole] = useState("");
  const [validRole, setValidRole] = useState(false);
  const [roleFocus, setRoleFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [isAgree, setIsAgreed] = useState(false);

  // ** القيم الثابتة للموقع **
  const [latitude] = useState(30.69);
  const [longitude] = useState(30.31);
  const [locationString, setLocationString] = useState("مصر");

  useEffect(() => {
    if (userNameRef.current) userNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidPhoneNumber(PHONE_NUMBER_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidNationalId(NATIONAL_ID_REGEX.test(nationalId));
  }, [nationalId]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidPasswordMatch(password === passwordMatch);
  }, [password, passwordMatch]);

  useEffect(() => {
    setErrorMsg("");
  }, [userName, password, passwordMatch]);

  const newUser = {
    userName,
    phoneNumber,
    email,
    password,
    role,
    nationalId,
    locationString,
    latitude,
    longitude,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(newUser),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccessMsg(true);
      setUserName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setNationalId("");
      setRole("");
    } catch (err) {
      if (!err?.response) setErrorMsg("No Server Response");
      else if (err.response?.status === 409) setErrorMsg("Username Taken");
      else setErrorMsg("Registration Failed");

      errorRef.current.focus();
      setErrorMsg(JSON.stringify(err.response.data));
    }
  };

  const [step, setStep] = useState(1);
  const handleSteps = () => {
    if (
      validUserName &&
      validNationalId &&
      validPhoneNumber &&
      validEmail &&
      validPassword &&
      validPasswordMatch
    ) {
      setStep(2);
    }
  };

  return (
    <div className="bg-[#2D9CDB] w-[100%] min-h-[100vh] flex items-center justify-center flex-col overflow-hidden">
      {successMsg ? (
        <section>
          <h1>تم أنشاء الحساب بنجاح !</h1>
          <p>
            <Link to="/">قم بتسجيل الدخول الان !</Link>
          </p>
        </section>
      ) : (
        <div className="bg-white w-[70%] py-12 px-8 rounded-[6px] overflow-hidden max-[900px]:w-[80%] max-[768px]:w-[90%] ">
          <div
            className={` ${
              step === 1
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute hidden"
            } transition-all duration-500`}
          >
            <div className="signup_header flex items-center justify-between mb-16 max-md:flex max-md:flex-col max-md:gap-3 max-md:text-center">
              <h2 className="font-bold text-4xl">انشاء حساب جديد</h2>
              <div className="login flex items-center gap-[5px] text-[#2D9CDB] max-md:flex max-md:flex-col max-md:gap-3">
                <h3 className="font-bold text-[20px]">لدي حساب بالفعل !</h3>
                <Link
                  to="/"
                  className="w-[83px] h-[44px] py-[13px] px-[16px] !bg-[#2D9CDB] rounded-[41px]
                                            font-medium text-[16px] text-white flex items-center justify-center
                                            hover:!bg-white hover:text-[#2D9CDB] hover:border hover:border-[#2D9CDB] transition-all duration-200"
                >
                  دخول
                </Link>
              </div>
            </div>
            <div className="min-h-[100%]">
              <form onSubmit={(e) => e.preventDefault()}>
                <SignUpRow>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl flex items-center gap-[16px]"
                      htmlFor="userName"
                    >
                      أسم المستخدم
                      <Check
                        className={
                          validUserName ? "text-[limegreen]" : "hidden"
                        }
                      />
                      <TimerIcon
                        className={
                          validUserName || !userName
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <input
                      className="rounded-2xl border border-[#1E1E1E] h-[65px] focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                      type="text"
                      id="userName"
                      required
                      autoComplete="off"
                      ref={userNameRef}
                      onChange={(e) => setUserName(e.target.value)}
                      aria-invalid={validUserName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserNameFocus(true)}
                      onBlur={() => setUserNameFocus(false)}
                      value={userName}
                    />
                    <p
                      id="uidnote"
                      className={
                        userNameFocus && userName && !validUserName
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      من 4 لـ 24 حرف.
                      <br />
                      لازم يبدأ بحرف. <br />
                      مسموح باستخدام الحروف، الأرقام، الشرطة السفلية _، والشرطة
                      -.
                      <br />
                    </p>
                  </SignUpItem>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl flex items-center gap-[16px]"
                      htmlFor="userPhone"
                    >
                      رقم الهاتف
                      <Check
                        className={
                          validPhoneNumber ? "text-[limegreen]" : "hidden"
                        }
                      />
                      <TimerIcon
                        className={
                          validPhoneNumber || !phoneNumber
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <input
                      className="rounded-2xl border border-[#1E1E1E] h-[65px] focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                      type="text"
                      id="userPhone"
                      required
                      autoComplete="off"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      aria-invalid={validPhoneNumber ? "false" : "true"}
                      aria-describedby="phoneNumberNote"
                      onFocus={() => setPhoneNumberFocus(true)}
                      onBlur={() => setPhoneNumberFocus(false)}
                      value={phoneNumber}
                    />
                    <p
                      id="phoneNumberNote"
                      className={
                        phoneNumberFocus && phoneNumber && !validPhoneNumber
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      ادخل رقم موبايل صحيح من 11 رقم ويبدأ بـ 01. مسموح بالأرقام
                      فقط
                    </p>
                  </SignUpItem>
                </SignUpRow>
                <SignUpRow>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl flex items-center gap-[16px]"
                      htmlFor="userPassword"
                    >
                      كلمه السر
                      <Check
                        className={
                          validPassword ? "text-[limegreen]" : "hidden"
                        }
                      />
                      <TimerIcon
                        className={
                          validPassword || !password
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <div className="flex w-full relative items-center">
                      <input
                        className="rounded-2xl border border-[#1E1E1E] h-[65px]  w-full focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                        id="userPassword"
                        required
                        type={isPasswordShown ? "text" : "password"}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        value={password}
                      />

                      {isPasswordShown ? (
                        <EyeOff
                          className="absolute left-[17px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordShown(false);
                          }}
                        />
                      ) : (
                        <Eye
                          className="absolute left-[17px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordShown(true);
                          }}
                        />
                      )}
                    </div>
                    <p
                      id="pwdnote"
                      className={
                        passwordFocus && !validPassword
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      من 8 لـ 24 حرف.
                      <br />
                      لازم تحتوي على حروف كبيرة وصغيرة، رقم واحد على الأقل، ورمز
                      خاص واحد على الأقل.
                      <br />
                      الرموز الخاصة المسموح بها:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>
                  </SignUpItem>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl"
                      htmlFor="nationalId"
                    >
                      الرقم القومى
                      <Check
                        className={
                          validNationalId ? "text-[limegreen]" : "hidden"
                        }
                      />
                      <TimerIcon
                        className={
                          validNationalId || !nationalId
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <input
                      className="rounded-2xl border border-[#1E1E1E] h-[65px] focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                      type="text"
                      id="nationalId"
                      required
                      autoComplete="off"
                      onChange={(e) => setNationalId(e.target.value)}
                      aria-invalid={validNationalId ? "false" : "true"}
                      aria-describedby="nationalIdNote"
                      onFocus={() => setNationalIdFocus(true)}
                      onBlur={() => setNationalIdFocus(false)}
                      value={nationalId}
                    />
                    <p
                      id="nationalIdNote"
                      className={
                        nationalIdFocus && !validNationalId
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      ادخل رقم البطاقة 14 رقم ويبدأ بـ 2 أو 3، ويكون التاريخ
                      صحيح.
                    </p>
                  </SignUpItem>
                </SignUpRow>
                <SignUpRow>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl flex items-center gap-[16px]"
                      htmlFor="userPasswordVerify"
                    >
                      تأكيد كلمه السر
                      <Check
                        className={
                          validPasswordMatch ? "text-[limegreen]" : "hidden"
                        }
                      />
                      <TimerIcon
                        className={
                          validPasswordMatch || !passwordMatch
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <div className="flex w-full relative items-center">
                      <input
                        className="rounded-2xl border border-[#1E1E1E] h-[65px]  w-full focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                        autoComplete="off"
                        id="userPasswordVerify"
                        required
                        type={isPasswordMatchShown ? "text" : "password"}
                        onChange={(e) => setPasswordMatch(e.target.value)}
                        aria-invalid={validPasswordMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setPasswordMatchFocus(true)}
                        onBlur={() => setPasswordMatchFocus(false)}
                        value={passwordMatch}
                      />
                      {isPasswordMatchShown ? (
                        <EyeOff
                          className="absolute left-[17px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordMatchShown(false);
                          }}
                        />
                      ) : (
                        <Eye
                          className="absolute left-[17px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordMatchShown(true);
                          }}
                        />
                      )}
                    </div>
                    <p
                      id="confirmnote"
                      className={
                        passwordMatchFocus && !validPasswordMatch
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      لازم تكون نفس كلمة المرور اللي دخلتها في الحقل الأول
                    </p>

                    {/*{password !== passwordVerfiy? <p className = "text-red-500 transition-colors duration-200">كلمة المرور غير متطابقة</p> : null}*/}
                  </SignUpItem>
                  <SignUpItem>
                    <label
                      className="font-medium text-2xl flex items-center gap-[16px]"
                      htmlFor="userEmail"
                    >
                      البريد الالكتروني
                      <Check
                        className={validEmail ? "text-[limegreen]" : "hidden"}
                      />
                      <TimerIcon
                        className={
                          validEmail || !email
                            ? "hidden"
                            : "text-[red] ml-[0.25rem]"
                        }
                      />
                    </label>
                    <input
                      className="rounded-2xl border border-[#1E1E1E] h-[65px] focus:border-[#2D9CDB] focus:outline-none transition-all duration-200"
                      type="email"
                      id="userEmail"
                      required
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email}
                    />
                    <p
                      id="confirmnote"
                      className={
                        emailFocus && !validEmail
                          ? "text-[.75rem] rounded-[0.5rem] bg-[#A6A6A6] text-black p-[0.25rem] relative bottom-[-10px]"
                          : "absolute left-[-1999px]"
                      }
                    >
                      <InfoIcon />
                      ادخلي بريد إلكتروني صالح، مثل: example@domain.com
                    </p>
                  </SignUpItem>
                </SignUpRow>
                <div className="flex items-center justify-center mt-16 w-[100%]">
                  <button
                    className=" rounded-2xl bg-[#2D9CDB] py-4 w-[45%] font-medium text-2xl text-white cursor-pointer hover:bg-white hover:text-[#2D9CDB] hover:border hover:border-[#2D9CDB] transition-all duration-200 max-md:w-full disabled:bg-gray-500 disabled:border-none disabled:hover:border-none disabled:hover:transition-none disabled:hover:text-white disabled:cursor-auto"
                    disabled={
                      !validUserName || !validPassword || !validPasswordMatch
                        ? true
                        : false
                    }
                    onClick={() => handleSteps()}
                  >
                    أكمل
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className={`${
              step === 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute hidden"
            } transition-all duration-500`}
          >
            <form
              className="flex flex-col justify-center px-48 max-[1245px]:px-25 max-[940px]:px-13 max-[600px]:px-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <p
                ref={errorRef}
                className={
                  errorMsg
                    ? "bg-[lightpink] text-[firebrick] font-bold p-[0.5rem] mb-[0.5rem]"
                    : "absolute left-[-9999px]"
                }
                aria-live="assertive"
              >
                {errorMsg}
              </p>
              <div className="flex flex-col gap-4 items-center ">
                <img src={userImg} className="size-[137px] " />
                <h2 className="font-medium text-2xl text-black">
                  أسم المستخدم
                </h2>
              </div>
              <div className="flex items-center gap-12 mt-9 justify-center max-[787px]:flex-col">
                <div className="border border-[#2D9CDB] flex flex-col items-center py-6 px-[22px] w-[45%] max-[787px]:w-full">
                  <h3 className="font-medium text-[20px] mb-2">
                    أنا صاحب عمل{" "}
                  </h3>
                  <p className="font-[400] text-base">أبحث عن موظف </p>
                  <label className="flex items-center cursor-pointer p-3 rounded-lg has-[:checked]:[&_span]:scale-100">
                    <input
                      type="radio"
                      name="option"
                      className="hidden peer"
                      value="employer"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span
                      className="w-[52px] h-[52px] rounded-[18px] border border-[#2D9CDB] flex items-center justify-center transition
                            peer-checked:bg-[#2D9CDB] peer-checked:shadow-[0_0_6px_#2D9CDB]"
                    >
                      <span className="scale-0  transition-all text-white size-[30px] rounded-[8px] font-bold flex items-center justify-center">
                        <Check size={30} />
                      </span>
                    </span>
                  </label>
                </div>
                <div className="border border-[#2D9CDB] flex flex-col items-center py-6 px-[22px] w-[45%] max-[787px]:w-full">
                  <h3 className="font-medium text-[20px] mb-2">أنا موظف </h3>
                  <p className="font-[400] text-base">أبحث عن عمل </p>
                  <label className="flex items-center cursor-pointer p-3 rounded-lg has-[:checked]:[&_span]:scale-100">
                    <input
                      type="radio"
                      name="option"
                      className="hidden peer"
                      value="applicant"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span
                      className="w-[52px] h-[52px] rounded-[18px] border border-[#2D9CDB] flex items-center justify-center transition
                            peer-checked:bg-[#2D9CDB] peer-checked:shadow-[0_0_6px_#2D9CDB]"
                    >
                      <span className="scale-0  transition-all text-white size-[30px] rounded-[8px] font-bold flex items-center justify-center">
                        <Check size={30} />
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div
                className={`mt-7 flex flex-col mb-5 transition-all duration-600 ${
                  role === "applicant"
                    ? "max-h-[500px] opacity-100 overflow-hidden"
                    : "max-h-0 opacity-0 overflow-hidden"
                } `}
              >
                <label className="font-medium text-2xl mb-4" htmlFor="role">
                  المسمي الوظيفي
                </label>
                <input
                  type="text"
                  className="rounded-[16px] border border-[#1E1E1E] w-[60%] py-5 px-3 focus:outline-none focus:border-[#2D9CDB] max-[1245px]:w-full"
                  id="role"
                />
              </div>
              <div className="flex items-center gap-1 ">
                <label className="flex items-center cursor-pointer p-3 rounded-lg select-none has-[:checked]:[&_span]:scale-100">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() => setIsAgreed(!isAgree)}
                  />
                  <span
                    className="w-[34px] h-[34px] rounded-[13px] border border-[#2D9CDB] flex items-center justify-center transition
                            peer-checked:bg-[#2D9CDB] peer-checked:shadow-[0_0_6px_#2D9CDB]"
                  >
                    <span className="scale-0  transition-all text-white">
                      <Check />
                    </span>
                  </span>
                </label>

                <label className="font-normal text-base">
                  قرأت وأوافق على
                  <span className="underline cursor-pointer">
                    {" "}
                    شروط الإستخدام{" "}
                  </span>
                  و{" "}
                  <span className="underline cursor-pointer">
                    سياسة الخصوصية
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-center w-full mt-7">
                <button
                  className="bg-[#2D9CDB] py-[16px] w-[60%] rounded-2xl font-medium text-2xl text-white cursor-pointer hover:bg-white hover:text-[#2D9CDB] hover:border hover:border-[#2D9CDB] transition duration-400 disabled:bg-gray-500 disabled:border-none disabled:hover:border-none disabled:hover:transition-none disabled:hover:text-white disabled:cursor-auto"
                  disabled={!isAgree}
                >
                  انشاء حساب جديد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Signup;
