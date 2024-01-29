// import { IoCamera } from "react-icons/io5";




import '../../styles/color.css'
import Cover from './components/cover/Cover';

import LeftContent from "./components/leftContent/LeftContent";
import MiddleContent from "./components/middleContent/MiddleContent";
import RightContent from "./components/rightContent/RightContent";

export default function Profile() {

  return (
    <div className='bg-gray-100'>
      <div className="bg-gray-100 max-w-7xl mx-auto bg-vibin ">
      <Cover></Cover>
      {/* <div className="bg-white p-1 md:h-32 lg:h-40 lg:w-40 h-20 w-20 md:w-32 absolute z-10 lg:-mt-20 md:-mt-16 md:ml-10 -mt-10 ml-6 lg:ml-20 rounded-full">
            
            <div className="flex items-center justify-center absolute  bg-[#7A1022] md:w-10 md:h-10 w-4 h-4 rounded-full md:bottom-8 bottom-5 md:right-1 -right-1 cursor-pointer">
              <IoCamera className="text-white" />
            </div>
         
          
          
      
          
        </div> */}

      <div className="lg:w-[60vw] gap-3 mt-10 w-full mx-auto grid lg:gap-7 lg:grid-cols-7  md:grid-cols-5 grid-col-1">
        {/* <div className="flex justify-center col-span-2 items-center relative">

        </div> */}
        <div className="w-full -mt-10 bg-white   md:col-span-2  ">
          <LeftContent />
        </div>


        {/* Middle Content Begin */}
        <div className="md:col-span-3 ">
          <MiddleContent />
        </div>

        {/* Right Content Begin */}
        <div className="hidden lg:block  md:col-span-2  ">
          <RightContent></RightContent>
        </div>
      </div>
    </div>
    </div>
  );
}
