import { Outlet, useLocation } from "react-router-dom";

import "../styles/color.css";
import Navbar from "../shared component/Navbar";
import LeftSidebar from "../shared component/LeftSidebar";
import { useState } from "react";
import SuggestedUsers from "../shared component/SuggestedUsers";
import { useGetSearchResultQuery } from "../redux/features/user/userApi";
import TestMessages from "../hooks/TestMessages";
import MessagingModal from "../shared component/MessagingModal";
const MainLayout = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [notification, setNotification] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const {
    data: searchResults,
    isLoading,
    isSuccess,
  } = useGetSearchResultQuery(searchInput);
  console.log(searchResults?.users?.slice(0, 4));
  const location = useLocation();
  console.log(location);
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
            } w-full   md:w-1/3 lg:w-1/5  max-w-96  pl-6 pt-6 fixed top-8 mt-6   md:left-0  overflow-hidden transition-all duration-500   h-full bg-gray-50   md:bg-transparent  `}
          >
            <LeftSidebar />
          </div>
        )}

        <div className=" mt-16 w-full lg:mx-auto md:w-2/3 md:ml-auto lg:w-3/5 lg:overflow-y-auto p-6    ">
          <Outlet />
        </div>

        {/* right side */}
        {!location.pathname.includes("profile") && (
          <div
            className={`${
              right ? "right-0" : " -right-[52rem]"
            }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden   lg:top-0 transition-all duration-300 pt-10 top-8 mt-6   h-full`}
          >
            <SuggestedUsers />
            {/* <TestMessages /> */}
          </div>
        )}
      </div>
      <MessagingModal></MessagingModal>
    </div>
  );
};

export default MainLayout;
