import { IoCamera } from "react-icons/io5";
import MiddleContent from "./components/middleContent/MiddleContent";
import LeftContent from "./components/leftContent/LeftContent";
import RightContent from "./components/rightContent/RightContent";
import cover from '../../assets/images/userCoverDemo.jpg';
import profile from '../../assets/images/profiePicDemo.jpg';
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const coverPhoto = true;
  const avatar = true;
  return (
    <div className="bg-gray-100 max-w-6xl mx-auto">
      <div className="w-full bg-gray-300 lg:h-[64vh] md:h-[44vh] h-[32vh] relative">
        {coverPhoto && (
          <img
            src={cover} 
            alt=""
            className="w-full h-full rounded-md"
          />
        )}
        <div className="flex items-center justify-center absolute right-10  bottom-12 text-white text-xl "><button><FaEdit className=" absolute"></FaEdit></button></div>

{/* profile section */}

      </div>
      <div className="bg-white p-1 md:h-32 lg:h-40 lg:w-40 h-20 w-20 md:w-32 absolute z-10 lg:-mt-20 md:-mt-16 md:ml-10 -mt-10 ml-6 lg:ml-20 rounded-full">
            {avatar && (
              <img
                src={profile}
                alt=""
                className="w-full h-full rounded-full"
              />
            )}
            <div className="flex items-center justify-center absolute  bg-[#7A1022] md:w-10 md:h-10 w-4 h-4 rounded-full md:bottom-8 bottom-5 md:right-1 -right-1 cursor-pointer">
              <IoCamera className="text-white" />
            </div>
         
          
          
          {/* Left Content Begin */}
          
        </div>
        
      <div className="lg:w-[60vw] w-full mx-auto grid lg:gap-7 lg:grid-cols-7 grid-cols-5 pb-10">
      {/* <div className="flex justify-center col-span-2 items-center relative">

        </div> */}
       <div className="w-full mt-6 -ml-8 ">
            <LeftContent />
          </div>
        

        {/* Middle Content Begin */}
        <div className=" lg:col-span-4">
          <MiddleContent />
        </div>

        {/* Right Content Begin */}
        <div className="mt-32 hidden lg:flex lg:col-span-2  "><RightContent></RightContent></div>
      </div>
    </div>
  );
}
