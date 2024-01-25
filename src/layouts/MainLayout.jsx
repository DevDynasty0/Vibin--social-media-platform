import { NavLink, Outlet } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useState } from "react";

import LeftButton from "../shared component/LeftButton";
import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import Landing from "../pages/landing/landing/Landing";
const MainLayout = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [notification, setNotification] = useState(false);

  const { loading, user } = useAuth();
  console.log(user);
  return !loading ? (
    user ? (
      <div className="bg-vibin">
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
            } w-full   md:w-1/3 lg:w-1/5  max-w-96 p-6  fixed top-8   md:left-0 overflow-hidden transition-all duration-500   h-full   bg-white bg-opacity-30  `}
          >
            <LeftSidebar />
          </div>

          <div className="  w-full lg:mx-auto md:w-2/3 md:ml-auto lg:w-3/5 lg:overflow-y-auto p-6  ">
            <Outlet />
          </div>

          {/* right side */}
          <div
            className={`${
              right ? "right-0" : " -right-[52rem]"
            }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-6 lg:top-0 transition-all duration-300 bg-white bg-opacity-10  pt-10   h-full`}
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
      </div>
    ) : (
      <Landing />
    )
  ) : (
    <div className="w-full flex justify-center items-center h-52 ">
      <Spinner />
    </div>
  );
};

export default MainLayout;
