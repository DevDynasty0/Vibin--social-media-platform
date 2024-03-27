import { useForm } from "react-hook-form";
import loginBanner from "../../assets/images/login_banner.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../shared component/GoogleSignIn";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import signin from "../../assets/images/login-cuate-rahida.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { GrFormViewHide } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
const Login = () => {
  const [login, { isError, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const { register, handleSubmit } = useForm();

  const [displayPassIcon, setDisplayPassIcon] = useState(false);

  const onSubmit = async (data) => {
    const results = await login({
      email: data?.email,
      password: data?.password,
    });

    if (results?.data?.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex justify-between items-center w-[95%] md:w-[85%] lg:w-[75%] mx-auto my-2">
      <div className="py-10 text-center w-[90%] md:w-[50%] lg:w-[45%] md:text-start mx-auto md:mx-0 ">
        <h2 className="font-semibold text-3xl ">Welcome Back</h2>
        <p className="my-2 text-md ">Log in to your account.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-3 mt-7 w-[90%] md:w-[75%] mx-auto md:mx-0">
            <input
              required
              id="email"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full  text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
              type="email"
              {...register("email", { required: true })}
              placeholder=" "
            />

            <label
              htmlFor="email"
              className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              <div className="flex items-center gap-3">
                {" "}
                <PiEnvelopeSimpleLight className="text-2xl text-color-one "></PiEnvelopeSimpleLight>{" "}
                Email address
              </div>
            </label>
          </div>
          <div className="relative w-[90%] md:w-[75%] mx-auto md:mx-0">
            <input
              required
              id="password"
              className="block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
              type={displayPassIcon ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder=" "
            />
            <span
              onClick={() => setDisplayPassIcon(!displayPassIcon)}
              className="cursor-pointer absolute right-[2%] top-[35%]"
            >
              {displayPassIcon ? (
                <RxCrossCircled className="text-md text-color-one font-bold"></RxCrossCircled>
              ) : (
                <IoIosCheckmarkCircle className="text-md text-color-one font-bold"></IoIosCheckmarkCircle>
              )}
            </span>
            <label
              htmlFor="password"
              className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
                         peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              <div className="flex items-center gap-2">
                {" "}
                <CiLock className="text-2xl text-color-one"></CiLock> Password
              </div>
            </label>
          </div>

          <div className="mt-7 w-[90%] md:w-[75%] text-center mx-auto md:mx-0">
            <button
              disabled={isLoading}
              className={`w-1/2 md:w-2/3 lg:w-full px-6 py-3 text-center  text-white bg-color-one shadow-md  rounded-md ${
                isLoading
                  ? "cursor-not-allowed"
                  : "hover:text-black hover:bg-color-one hover:opacity-80  "
              }`}
              type="submit"
            >
              {isLoading ? (
                <svg
                  className="animate-spin mx-auto h-6 w-6 text-[#904486]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    opacity=".25"
                  />
                  <path
                    fill="currentColor"
                    d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="0.75s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    />
                  </path>
                </svg>
              ) : (
                <div className="flex justify-center items-center gap-2 ">
                  <p>Sign In </p>
                  {/* <FaArrowRight></FaArrowRight> */}
                </div>
              )}
            </button>
          </div>
          <div className="flex justify-between mt-4 w-[90%] md:w-[75%] mx-auto md:mx-0 text-xs lg:text-sm ">
            {/* <Link to="" className="text-color-one">
              Forget password?
            </Link> */}
            <div className="flex items-center gap-2">
              <p>New here?</p>
              <Link to="/sign-up" className=" text-color-one hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
          {isError && (
            <span className="text-rose-600 my-1">
              Ops, can&apos;t login. Please check your credentials.
            </span>
          )}
        </form>
        <div className="mx-auto md:mx-0 w-[90%] md:w-[75%] text-center my-2 flex items-center justify-between"></div>

        {/* Google,apple sign in button */}
      </div>
      <div className="w-[53%] hidden md:block ">
        <img src={signin} alt="Sign In Image" />
      </div>
      {/* call here footer  */}
    </div>
  );
};

export default Login;
