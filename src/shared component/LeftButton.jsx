import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
const LeftButton = ({ name = "", path = "", icon: Icon, img }) => {
  return (
    <div>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-2 py-3 gap-2 hover:bg-white rounded bg-white"
            : "flex items-center px-2 py-3 gap-2 hover:bg-white rounded "
        }
      >
        {Icon && (
          <div className="p-2 gradient-one text-white rounded   text-center">
            <Icon size={"1.25rem"} />
          </div>
        )}
        {img && <img className="h-12 w-12 rounded " src={img} />}
        {/* Render the icon if provided */}
        <div>
          <span className=" font-medium">{name}</span>
          <br />
          {img && (
            <button className="px-1  gradient-one  text-white text-xs rounded-sm py-1 shadow">
              Add Friend
            </button>
          )}
        </div>
      </NavLink>
    </div>
  );
};

LeftButton.propTypes = {};

export default LeftButton;
