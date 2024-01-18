import { Outlet } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";

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
          } w-full   md:w-1/3 lg:w-1/5  max-w-96 p-6  fixed top-[31px] md:top-0 md:left-0 overflow-hidden transition-all duration-500 bg-white bg-opacity-60 md:bg-white h-full`}
        >
          <LeftSidebar />
        </div>

        <div className="  w-full lg:mx-auto lg:w-3/5 lg:overflow-y-auto   bg-gray-400 p-6  ">
          <Outlet />
        </div>
        <FaAlignJustify
          className="hidden md:block ml-auto lg:hidden m-5 fixed top-0 right-5  "
          size={"1.25rem"}
          onClick={() => setRight(!right)}
        />
        <div
          className={`${
            right ? "right-0" : " -right-[52rem]"
          } w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-10 lg:top-0 transition-all duration-300`}
        >
          Right content
          {/* ... Your right content here ... */}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
