import React, { useState } from "react";
import PropTypes from "prop-types";
import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import SearchButton from "./SearchButton";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import useAuth from "../hooks/useAuth";
import avatar from "../assets/images/avatar.png";
const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  // logout api: /api/v1/users/logout
  const handleLogout = async () => {
    const res = await axios.post("/api/v1/users/logout");
    console.log(res.data);
    if (res.data) {
      dispatch(logout());
    }
  };
  return (
    <div className="flex flex-col  h-[calc(100vh-56px)]  relative">
      <div className="flex items-center border-b pb-4 justify-between">
        <a href="/" className="flex items-center  gap-3  ">
          <img
            src={user?.avatar ? user.avatar : avatar}
            className="h-8"
            alt="Vibin' user"
          />
          <span className="self-center font-semibold text-xl tracking-wide whitespace-nowrap  text-gray-800">
            {user?.fullName}{" "}
          </span>
        </a>
        {/* <SearchButton /> */}
      </div>

      <div className="mt-10 h-full  ">
        <LeftButton name={"Home"} path={"home"} icon={FaHome} />
        <LeftButton
          name={"Profile"}
          path={`/profile/${user?._id}`}
          icon={FaUser}
        />

        {/* <LeftButton
          name={"Notifications"}
          path={"notifications"}
          icon={FaBell}
        /> */}
        <LeftButton name={"Friends"} path={"friends"} icon={FaUserFriends} />
        <LeftButton name={"Settings"} path={"settings"} icon={FaCog} />

        <div
          onClick={handleLogout}
          className="flex flex-col absolute w-full bottom-[48px]"
        >
          <hr />
          <LeftButton name={"Logout"} path={"login"} icon={MdLogout} />
        </div>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;
