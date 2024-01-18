import React from "react";
import PropTypes from "prop-types";
import { FaAlignJustify, FaUserCircle } from "react-icons/fa";

const Navbar = ({ left, setLeft, right, setRight }) => {
  return (
    <>
      <nav className="bg-white bg-opacity-60 md:hidden  dark:bg-gray-900 shadow   fixed min-w-full">
        <div className="flex px-2 py-0.5 items-center justify-between">
          <FaUserCircle
            size={"1.25rem"}
            onClick={() => {
              setRight(false);
              setLeft(!left);
            }}
          />

          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="./vibin-logo.png" className="h-6" alt="Vibin' Logo" />
            <span className="self-center font-bold text-xl  whitespace-nowrap  text-gray-800">
              Vibin<span className="">'</span>
            </span>
          </a>
          <FaAlignJustify
            size={"1.25rem"}
            onClick={() => {
              setLeft(false);
              setRight(!right);
            }}
          />
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
