import React from "react";
import PropTypes from "prop-types";
import avatar from "../../../assets/images/avatar.png";

const SearchUserCard = ({ user }) => {
  return (
    <div className="bg-gray-50 w-full mb-16 max-w-[768px] flex justify-start items-center p-8 relative max-h-40 shadow-sm rounded-md ">
      <img
        src={user?.avatar ? user?.avatar : avatar}
        className="rounded-xl w-[170px] mt-16"
      />
      <p className="pl-9 text-2xl font-semibold grow">
        {user?.fullName}
        <br />
        <span className="text-lg font-normal">Sleeping in my car</span>
      </p>
      <span className="  rounded  bg-[#eff0f9] p-2 cursor-pointer group [&_*]:transition-all duration-150 ease-in ">
        <span className="p-2   bg-white rounded  shadow-md group-hover:bg-color-one group-hover:text-white inline-flex items-center gap-2 font-medium">
          <span>Follow</span>
          <svg
            viewBox="0 0 9 9"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:fill-white   group-hover:stroke-white"
            width="24"
            height="24"
            // viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#7e9cff"
            fill="#7e9cff"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Page-1" strokeWidth="1">
                {" "}
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-345.000000, -206.000000)"
                >
                  {" "}
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    {" "}
                    <polygon
                      id="plus_mini-[#1523]"
                      points="298 49 298 51 294.625 51 294.625 54 292.375 54 292.375 51 289 51 289 49 292.375 49 292.375 46 294.625 46 294.625 49"
                    >
                      {" "}
                    </polygon>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </svg>
        </span>
      </span>
    </div>
  );
};

SearchUserCard.propTypes = {};

export default SearchUserCard;
