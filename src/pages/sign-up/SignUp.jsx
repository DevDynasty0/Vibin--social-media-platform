import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import signUpLottie from "../../assets/lotties/vibin-signup.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const SignUp = () => {
  const [displayPassIcon, setDisplayPassIcon] = useState(false);
  const [displayConfirmPassIcon, setDisplayConfirmPassIcon] = useState(false);

  const [signUpLoader, isSignUpLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    // Handle sing up logic here
    isSignUpLoader(true);
    console.log(data);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center w-[95%] md:w-[85%] lg:w-[75%] mx-auto my-7">
        <div className="py-10 text-center w-[90%] md:w-[50%] lg:w-[45%] md:text-start mx-auto md:mx-0 ">
          <h2 className="font-semibold text-3xl mb-5 ">Sign Up Now !!</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="fullName"
                aria-label="Full Name"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                type="text"
                {...register("fullName", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Full Name
              </label>
            </div>

            {/* username */}

            {/* <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="userName"
                aria-label="User Name"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full "
                type="text"
                {...register("userName", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="userName"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                User Name
              </label>
            </div> */}

            {/* gender */}
            {/* <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <select
                required
                id="gender"
                aria-label="Gender"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                {...register("gender", { required: true })}
              >
                <option
                  className="text-base text-gray-500"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              ></label>
            </div> */}

            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="email"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full  text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer"
                type="email"
                {...register("email", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email
              </label>
            </div>

       
            <div className="relative w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="password"
                className="block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer"
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
                {displayPassIcon ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
              <label
                htmlFor="password"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
                         peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Password
              </label>
            </div>

           
            <div className="relative my-2 w-[90%] md:w-[75%] mx-auto md:mx-0">
              <input
                required
                id="confirmPassword"
                aria-label="Confirm Password"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer-focus:text-[#0E4749] peer w-full "
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
                {displayConfirmPassIcon ? (
                  <FaEyeSlash></FaEyeSlash>
                ) : (
                  <FaEye></FaEye>
                )}
              </span>
              <label
                htmlFor="confirmPassword"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
                  peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Confirm Password
              </label>
            </div>

          
            <div className="mt-4 w-[90%] md:w-[75%] text-center mx-auto md:mx-0">
              <button
                disabled={signUpLoader}
                className={`w-[40%] md:w-[48%] lg:w-[40%] px-4 py-3 text-center  border-[1px] text-gray-800 bg-white shadow-md  rounded-md ${
                  signUpLoader
                    ? "cursor-not-allowed"
                    : "hover:text-gray-600 hover:bg-gray-200  "
                }`}
                type="submit"
              >
                {signUpLoader ? (
                  <svg
                    className="animate-spin mx-auto h-6 w-6 text-[#0E4749]"
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
                    <FaArrowRight></FaArrowRight>
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

          <div className="mx-auto md:mx-0 w-[90%] md:w-[75%] space-y-3">
            <button className="flex justify-center items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4749]">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

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
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-bold text-purple-600 text-md underline"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[53%] hidden md:block ">
          <Player
            autoplay
            loop
            src={signUpLottie}
            style={{ height: "500px", width: "100%", overflow: "hidden" }}
          ></Player>
        </div>
        {/* call here footer  */}
      </div>
    </div>
  );
};

export default SignUp;
