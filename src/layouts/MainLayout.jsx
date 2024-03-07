import { Outlet, useLocation } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useEffect, useState } from "react";
import SuggestedUsers from "../shared component/SuggestedUsers";
import { useGetSearchResultQuery } from "../redux/features/user/userApi";
import MessagingModal from "../shared component/MessagingModal";
import { useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";
import GenarateCaption from "../shared component/viben-ai/GenarateCaption";
import AiAdvertisement from "../shared component/viben-ai/AiAdvertisement";

const MainLayout = () => {
  const userData = useSelector((state) => state.auth.user);
  const { socket } = useSocket();

  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [notification, setNotification] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const {
    data: searchResults,
    isLoading,
    isSuccess,
  } = useGetSearchResultQuery(searchInput);
  // console.log(searchResults?.users?.slice(0, 4));
  const location = useLocation();

  return (
    <div className="gradient-two ">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchResults={searchResults}
        left={left}
        setLeft={setLeft}
        right={right}
        setRight={setRight}
        notification={notification}
        setNotification={setNotification}
      />
      <div className="min-h-screen  flex  ">
        {/* left side bar */}
        {!location.pathname.includes("profile") && (
          <div
            className={`${
              !left ? " -left-[52rem]" : " left-0"
            } w-full   md:w-1/3 lg:w-[25%]  p-6  fixed  top-0 mt-16     md:left-0  overflow-hidden transition-all duration-500   h-full bg-gray-50   md:bg-white z-20 `}
          >
            <LeftSidebar />
          </div>
        )}

        <div
          className={` w-full ${
            location.pathname === "/"
              ? "ml-auto lg:ml-[25%] p-6  lg:w-[45%]"
              : `lg:w-3/4 ${
                  location.pathname.includes("profile")
                    ? "lg:w-full md:w-full  mx-auto p-0 "
                    : "ml-auto"
                }`
          } md:w-2/3 lg:overflow-y-auto`}
        >
          <Outlet />
        </div>

        {/* right side */}
        {location.pathname === "/" && (
          <div
            className="mt-16
                 w-full  lg:w-[30%] px-6  fixed hidden lg:block right-0
                  overflow-hidden   lg:top-0 transition-all duration-300 top-0
                    h-full"
          >
            {/* <GenarateCaption/> */}

            <SuggestedUsers />
            <AiAdvertisement></AiAdvertisement>
            {/* <TestMessages /> */}
          </div>
        )}
      </div>

      <MessagingModal socket={socket} userData={userData}></MessagingModal>
    </div>
  );
};

export default MainLayout;
