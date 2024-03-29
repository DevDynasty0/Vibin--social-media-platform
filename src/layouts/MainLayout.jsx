import { NavLink, Outlet } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useState } from "react";

import LeftButton from "../shared component/LeftButton";
import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import Landing from "../pages/landing/landing/Landing";
import { getSuggestedUsers } from "../hooks/getSuggestedUsers";
import SuggestedUsers from "../shared component/SuggestedUsers";
const MainLayout = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [notification, setNotification] = useState(false);

  const { loading, user } = useAuth();
  return !loading ? (
    user ? (
      <div className="gradient-two ">
        <Navbar
          left={left}
          setLeft={setLeft}
          right={right}
          setRight={setRight}
          notification={notification}
          setNotification={setNotification}
        />
        <div className="min-h-screen  flex  ">
          {/* left side bar */}
          <div
            className={`${
              !left ? " -left-[52rem]" : " left-0"
            } w-full   md:w-1/3 lg:w-1/5  max-w-96  pl-6 pt-6 fixed top-8 mt-6   md:left-0  overflow-hidden transition-all duration-500   h-full bg-gray-50   md:bg-transparent  `}
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
            }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden   lg:top-0 transition-all duration-300 pt-10 top-8 mt-6   h-full`}
          >
            <SuggestedUsers />
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
