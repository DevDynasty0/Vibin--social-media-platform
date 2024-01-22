import React, { useState } from "react";
import PropTypes from "prop-types";
import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import SearchButton from "./SearchButton";
import { MdLogout } from "react-icons/md";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-full   relative">
      <div className="flex items-center border-b-2 pb-4 justify-between">
        <a href="/" className="flex items-center  gap-3  ">
          <img src="./vibin-logo.png" className="h-8" alt="Vibin' Logo" />
          <span className="self-center font-semibold text-xl tracking-wide whitespace-nowrap  text-gray-800">
            User Full Name
          </span>
        </a>
        {/* <SearchButton /> */}
        <hr />
      </div>

      <div className="mt-10 h-full  ">
        <LeftButton name={"Home"} path={"home"} icon={FaHome} />
        <LeftButton name={"Profile"} path={"profile"} icon={FaUser} />

        {/* <LeftButton
          name={"Notifications"}
          path={"notifications"}
          icon={FaBell}
        /> */}
        <LeftButton name={"Friends"} path={"friends"} icon={FaUserFriends} />
        <LeftButton name={"Settings"} path={"settings"} icon={FaCog} />

        <div className="flex flex-col absolute bottom-0 ">
          <hr />
          <LeftButton name={"Logout"} path={"logout"} icon={MdLogout} />
        </div>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;
