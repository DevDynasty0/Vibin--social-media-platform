import { NavLink, Outlet } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useEffect, useState } from "react";

import LeftButton from "../shared component/LeftButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
const MainLayout = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [notification, setNotification] = useState(false);

  const { loading, user } = useAuth();
  console.log(user);
  return !loading && user ? (
    <>
      <Navbar
        left={left}
        setLeft={setLeft}
        right={right}
        setRight={setRight}
        notification={notification}
        setNotification={setNotification}
      />
      <div className="min-h-screen flex  ">
        {/* left side bar */}
        <div
          className={`${
            !left ? " -left-[52rem]" : " left-0"
          } w-full   md:w-1/3 lg:w-1/5  max-w-96 p-6  fixed top-8   md:left-0 overflow-hidden transition-all duration-500   h-full  bg-gray-100    `}
        >
          <LeftSidebar />
        </div>

        <div className="  w-full lg:mx-auto md:w-2/3 md:ml-auto lg:w-3/5 lg:overflow-y-auto p-6  ">
          {/* <div className=" max-w-[600px] mx-auto flex items-center justify-center flex-grow-1 w-full py-6  cursor-pointer text-color-one  ">
            <NavLink className="flex    justify-center hover:bg-gray-300  p-1  w-full     ">
              <FaHome />
            </NavLink>
            <div className=" flex hover:bg-gray-300  justify-center   w-full p-1">
              <FaFire />
            </div>
            <div className="hover:bg-gray-300   flex justify-center  w-full p-1">
              <FaVideo />
            </div>
          </div> */}
          <Outlet />
        </div>

        {/* right side */}
        <div
          className={`${
            right ? "right-0" : " -right-[52rem]"
          }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-6 lg:top-0 transition-all duration-300 bg-gray-100  pt-10   h-full`}
        >
          <h4 className="text-2xl p-2 font-semibold">Active Friends</h4>
          <LeftButton
            name="Abu Sayed"
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
          <LeftButton
            name="Nadia Sultana"
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
          <LeftButton
            name="Naza Rahida"
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
          <LeftButton
            name="Ismail Hosen "
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
          <LeftButton
            name="Abdullah Al Ovi"
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
          <LeftButton
            name="Foyez Ahamed"
            img="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
            path=""
            icon=""
          />
        </div>
      </div>
    </>
  ) : (
    <div className="w-full flex justify-center items-center h-52 ">
      <Spinner />
    </div>
  );
};

export default MainLayout;
