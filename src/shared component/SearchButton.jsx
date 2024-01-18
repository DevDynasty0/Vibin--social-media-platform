import React from "react";
import PropTypes from "prop-types";

const SearchButton = (props) => {
  return (
    <>
      {" "}
      <div className="  w-full  flex gap-2 items-center ps-3 pointer-events-none">
        {" "}
        <input
          className="px-2 py-1 rounded-r-full rounded-l-full hover:cursor-text shadow drop-shadow text-black focus:cursor-text w-full border-2"
          type="text"
          placeholder="Search..."
        />
        <svg
          className="w-4 h-4 -ml-10 z-10 text-gray-500 dark:text-gray-400"
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
