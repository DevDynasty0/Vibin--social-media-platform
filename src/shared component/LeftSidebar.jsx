import React, { useState } from "react";
import PropTypes from "prop-types";
import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import SearchButton from "./SearchButton";

const LeftSidebar = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center  justify-between">
        <a href="/" className="flex items-center  gap-3  ">
          <img src="./vibin-logo.png" className="h-12" alt="Vibin' Logo" />
          {/* <span className="self-center font-bold text-3xl tracking-wide whitespace-nowrap  text-gray-800">
            Vibin<span className="">'</span>
          </span> */}
        </a>{" "}
        <SearchButton />
        <hr />
      </div>
      <div className="mt-20 ">
        <LeftButton name={"Home"} path={"home"} icon={FaHome} />
        <LeftButton name={"Profile"} path={"profile"} icon={FaUser} />

        <LeftButton
          name={"Notifications"}
          path={"notifications"}
          icon={FaBell}
        />
        <LeftButton name={"Friends"} path={"friends"} icon={FaUserFriends} />
        <LeftButton name={"Settings"} path={"settings"} icon={FaCog} />
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;