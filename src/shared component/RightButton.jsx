import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

const RightButton = ({ user }) => {
  return (
    <div>
      <div className="flex   px-2 py-3 gap-2 hover:bg-white hover:bg-opacity-40 rounded">
        <NavLink to={`/profile/${user?._id}`} className={""}>
          <img
            className="h-14 w-14 rounded bg-gray-50"
            src={user?.avatar || avatar}
          />
        </NavLink>

        {/* Render the icon if provided */}
        <div className=" ">
          <span className="  font-medium">{user?.fullName}</span> <br />
          <button className="px-1 w-20  gradient-one  text-white text-xs rounded-sm py-1 shadow">
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};
RightButton.propTypes = {};

export default RightButton;
