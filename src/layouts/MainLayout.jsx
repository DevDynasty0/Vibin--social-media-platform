import { Outlet } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useState } from "react";
// import { FaAlignJustify } from "react-icons/fa";

import { FaAlignJustify, FaCross} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import LeftButton from "../shared component/LeftButton";


const MainLayout = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  return (
    <>
      <Navbar left={left} setLeft={setLeft} right={right} setRight={setRight} />
      <div className="min-h-screen flex  ">
        <div
          className={`${
            !left ? " -left-[52rem]" : " left-0"
          } w-full   md:w-1/3 lg:w-1/5  max-w-96 p-6  fixed top-[31px] md:top-0 md:left-0 overflow-hidden transition-all duration-500  bg-opacity-60 h-full bg-white`}
        >
          <LeftSidebar />
        </div>

        <div className="  w-full lg:mx-auto md:w-2/3 md:ml-auto lg:w-3/5 lg:overflow-y-auto p-6  ">
          <Outlet />
        </div>
        <div className="hidden md:block ml-auto lg:hidden fixed top-6 right-0 z-50"
          onClick={() => setRight(!right)}>
            {
              right ? <FaXmark size="1.5rem"/> : < FaAlignJustify size="1.5rem"/>
            }
        </div>
        
        <div
          className={`${
            right ? "right-0" : " -right-[52rem]"
          } bg-white w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-6 lg:top-0 transition-all duration-300`}
        >
          <h4 className="text-2xl p-2 font-semibold">Active Friends</h4>
          <LeftButton name="Abu Sayed" img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
          <LeftButton name="Nadia Sultana" img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
          <LeftButton name="Naza Rahida" img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
          <LeftButton name="Ismail Hosen " img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
          <LeftButton name="Abdullah Al Ovi" img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
          <LeftButton name="Foyez Ahamed" img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" path="" icon=""/>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
