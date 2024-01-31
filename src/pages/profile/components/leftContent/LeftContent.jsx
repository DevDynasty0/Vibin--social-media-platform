import profile from '../../../../assets/images/profiePicDemo.jpg';
 import { IoCamera } from "react-icons/io5";
export default function LeftContent() {
  return (
    <div className="relative p-4 text-center">

      <div className=" ">
        <img
          src={profile}
          alt=""
          className="relative w-44 h-44  block mx-auto md:-mt-[50%] -mt-[30%] rounded-full"
        />
       <div className='bg-gray-400 md:-mt-20 -mt-24 ml-[263px] lg:-mt-24 md:ml-[200px] lg:ml-[170px] p-2 rounded-full absolute'> <IoCamera></IoCamera></div>
        <div className="mb-5">
          <h2 className="font-bold md:text-2xl  text-[16px]">Ismail Hosen</h2>
          <span className="text-[10px]">@ismailhosen</span>

        </div>
        <div className='flex items-center gap-4 justify-center'>
          <div className=" ">

            <h3 className="lg:text-xl font-semibold text-[10px] text-gray-500">Friends</h3>
            <h3 className="font-bold text-[10px] md:text-sm">455</h3>
          </div>
          <div className=" items-center">
            <h3 className="lg:text-xl text-[10px] font-semibold text-gray-500">Followers</h3>
            <h3 className="font-bold text-[10px] md:text-sm">855</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
