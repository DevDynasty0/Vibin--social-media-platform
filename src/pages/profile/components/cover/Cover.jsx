
import cover from '../../../../assets/images/userCoverDemo.jpg';

import { FaEdit } from "react-icons/fa";

 const Cover = () => {
    const coverPhoto = true;
    // const avatar = true;
    return (
        <div>
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
        </div>
    );
 };
 
 export default Cover;