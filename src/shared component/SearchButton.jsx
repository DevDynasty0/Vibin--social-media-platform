import React from "react";
import PropTypes from "prop-types";

const SearchButton = (props) => {
  return (
    <>
      {" "}
      <div className="w-full md:w-2/3  lg:w-1/3  flex gap-2 items-center  pointer-events-none   ">

        {" "}
        <input
          className="px-2 hidden lg:block rounded-r-full rounded-l-full hover:cursor-text shadow drop-shadow text-black focus:cursor-text w-full border-2"
          type="text"
          placeholder="Search..."
        />
        <svg
          className=" p-1 bg-gray-50  rounded-full w-6 h-6 block lg:hidden z-10 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </>
  );
};

SearchButton.propTypes = {};

export default SearchButton;
