import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import GoogleSignIn from "../../../shared component/GoogleSignIn";
const Landing = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col lg:flex-row items-center justify-center  w-full text-center">
        <div>
          <img
            className="w-64 md:w-72  lg:w-full"
            src="./vibin-logo.png"
            alt=""
          />
        </div>
        <div className="lg:border-l-4 border-gray-300 border-spacing-4 p-10">
          <h1 className="text-3xl mb-5">Connecting Vibes!</h1>
          <h3>Share your vibes and murmurs with your friends and foes</h3>
          <div className="flex flex-col  border-opacity-50">
            <div className="mt-20 mb-2"> </div>{" "}
            <button className=" hover:bg-opacity-90 border-2  py-2   rounded gradient-two  text-gray-500">
              Create Account
            </button>
            <div className="flex items-center gap-2">
              <hr className="h-[2px] w-full bg-gray-200" />
              <p className="divider text-center my-5">OR</p>
              <hr className="h-[2px] w-full bg-gray-200" />
            </div>
            <div className="flex items-center  justify-between w-full">
              {" "}
              <Link
                to={"/login"}
                className="        rounded border  gradient-two px-3 py-2  font-medium text-gray-500 "
              >
                {" "}
                Sign In with Email
              </Link>{" "}
              <GoogleSignIn />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Landing;
