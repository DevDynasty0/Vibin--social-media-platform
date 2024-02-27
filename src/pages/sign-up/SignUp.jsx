import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import signUpLottie from "../../assets/lotties/vibin-signup.json";
import { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRegisterApiMutation } from "../../redux/features/auth/authApi";
import GoogleSignIn from "../../shared component/GoogleSignIn";
import { useDispatch } from "react-redux";
import { isOpenModal } from "../../redux/features/user/userSlice";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import signup6 from '../../assets/images/signup-cuate-rahida.png'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { MdLockReset } from "react-icons/md";
import { TbLockCheck } from "react-icons/tb";
import { TbLock } from "react-icons/tb";
import { BiEnvelope } from "react-icons/bi";
const SignUp = () => {
  const [displayPassIcon, setDisplayPassIcon] = useState(false);
  const [displayConfirmPassIcon, setDisplayConfirmPassIcon] = useState(false);
  const [registerApi, { isLoading }] = useRegisterApiMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");
  const onSubmit = async (data) => {
    try {
      const newUser = {
        email: data?.email,
        password: data?.password,
        fullName: data?.fullName,
        avatar: data?.avatar,
      };
      const results = await registerApi(newUser);
      if (results?.data?.success) {
         // From here the userInformation Logic starts.onOpen() is for opening the modal.
    // onOpen(); 
        // navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="flex justify-between items-center w-[95%] md:w-[85%] lg:w-[75%] mx-auto my-7">
        <div className="py-10 text-center w-[90%] md:w-[50%] lg:w-[45%] md:text-start mx-auto ">
          <h2 className="font-semibold text-3xl ">Welcome to <span className="text-color-one">Vibin'</span>
         </h2>
          <p className="mb-5 mt-3">Please sign up to continue</p>
      

          <form onSubmit={handleSubmit(onSubmit)} className="">
          

            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="fullName"
                aria-label="Full Name"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer w-full"
                type="text"
                {...register("fullName", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                <div className="flex items-center gap-2"> < FaRegUser className="text-xl text-color-one"></FaRegUser >Full Name</div>
              </label>
            </div>

            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
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
               <div className="flex items-center gap-2"> < BiEnvelope  className="text-2xl text-color-one"></BiEnvelope>Email</div>
              </label>
            </div>

            <div className="relative w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="password"
                className="block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
                type={displayPassIcon ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                })}
                placeholder=" "
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-[14px]">
                  Password must be at least 6 character
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-[10px] md:text-[14px] lg:text-[14px] ">
                  capital letter, number and special character required!
                </p>
              )}
              <span
                onClick={() => setDisplayPassIcon(!displayPassIcon)}
                className="cursor-pointer absolute right-[2%] top-[35%]"
              >
               {displayPassIcon ? <RxCrossCircled className="text-md text-color-one font-bold"></RxCrossCircled> : <IoIosCheckmarkCircle className="text-md text-color-one font-bold"></IoIosCheckmarkCircle>}
              </span>
              <label
                htmlFor="password"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
                         peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
               <div className="flex items-center gap-2"> <TbLock  className="text-2xl text-color-one"></TbLock  > Password</div>
              </label>
            </div>

            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="confirmPassword"
                aria-label="Confirm Password"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer w-full focus:border-[#904486]"
                type={displayConfirmPassIcon ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "password does not match",
                })}
                placeholder=" "
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-[10px] md:text-[14px] lg:text-[14px]">
                  {errors.confirmPassword.message}
                </p>
              )}
              <span
                onClick={() =>
                  setDisplayConfirmPassIcon(!displayConfirmPassIcon)
                }
                className="cursor-pointer absolute right-[2%] top-[35%]"
              >
              
                 {displayConfirmPassIcon ? <RxCrossCircled className="text-md text-color-one font-bold"></RxCrossCircled> : <IoIosCheckmarkCircle className="text-md text-color-one font-bold"></IoIosCheckmarkCircle>}
              </span>
              <label
                htmlFor="confirmPassword"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
                  peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                 <div className="flex items-center gap-2"> < TbLockCheck  className="text-2xl text-color-one"></TbLockCheck>Confirm Password</div>
              </label>
            </div>

            <div className="mt-4 w-[90%] md:w-[75%] text-center mx-auto md:mx-0">
              <button
                disabled={isLoading}
                className={`w-[40%] md:w-[48%] lg:w-full px-4 py-3 text-center  border-[1px] text-white bg-color-one shadow-md  rounded-md ${
                  isLoading
                    ? "cursor-not-allowed"
                    : "hover:text-gray-600 hover:bg-gray-200"
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
                  <div className="flex justify-center items-center gap-2">
                    <p>Sign Up</p>
                    {/* <FaArrowRight></FaArrowRight> */}
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mx-auto md:mx-0 w-[90%] md:w-[75%] text-center my-2 flex items-center justify-between">
            <hr className="w-[45%] border-gray-800" />
            <span>Or</span>
            <hr className="w-[45%] border-gray-800" />
          </div>

          {/* Google,apple sign in button */}

          <div className="w-[90%] md:w-[75%] space-y-3">
            
            <GoogleSignIn></GoogleSignIn>

            <button className="flex justify-center items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4749]">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-1.5 0 20 20"
                version="1.1"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-102.000000, -7439.000000)"
                    fill="#000000"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                        id="apple-[#173]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Continue with Apple</span>
            </button>

            <div className="mt-5">
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className=" text-color-one text-md hover:underline"
                >
                 Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[53%] hidden md:block ">
          {/* <Player
            autoplay
            loop
            src={signUpLottie}
            style={{ height: "500px", width: "100%", overflow: "hidden" }}
          ></Player> */}
          <img src={signup6} alt="" />
        </div>
        {/* call here footer  */}
      </div>
    </div>
  );
};

export default SignUp;