import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const LeftButton = ({ name = "", path, icon: Icon, img }) => {
  return (
    <div>
      <NavLink to={path} className="flex items-center px-2 py-3 gap-2">
        {Icon && <Icon className="mr-2" size={"1.25rem"} />}
        {img && <img className="h-10 w-10 rounded-full" src={img} />}
        {/* Render the icon if provided */}
        <span className="text-xl">{name}</span>
      </NavLink>
    </div>
  );
};

LeftButton.propTypes = {};

export default LeftButton;
