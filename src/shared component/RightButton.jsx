import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import { followUser } from "../hooks/followUser";
import useAuthCheck from "../hooks/useAuthCheck";

const RightButton = ({ person }) => {
  const { user } = useAuthCheck();
  const [follow, setFollow] = useState([]);

  const handleFollow = async (id) => {
    setFollow([...follow, id]);
    const profile = id;
    const follower = user?._id;
    console.log(follower, "you");
    const res = await followUser(profile, follower);
    console.log(res);
  };

  return (
    <div>
      <div className="flex   px-2 py-3 gap-2 hover:bg-white hover:bg-opacity-40 rounded">
        <NavLink to={`/profile/${person?._id}`} className={""}>
          <img
            className="h-14 w-14 rounded bg-gray-50"
            src={person?.avatar || avatar}
          />
        </NavLink>

        {/* Render the icon if provided */}
        <div className=" ">
          <span className="  font-medium">{person?.fullName}</span> <br />
          <button
            onClick={() => handleFollow(person?._id)}
            className="px-1 w-16  gradient-one  text-white text-xs rounded-sm py-1 shadow"
          >
            {follow?.find((id) => id === person?._id) ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};
RightButton.propTypes = {};

export default RightButton;
