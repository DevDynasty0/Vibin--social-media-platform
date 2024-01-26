import React from "react";
import PropTypes from "prop-types";
import "../styles/color.css";
import {
  FaAlignJustify,
  FaBell,
  FaFire,
  FaHome,
  FaRegBell,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";
import { FaMessage, FaRegMessage, FaXmark } from "react-icons/fa6";
import SearchButton from "./SearchButton";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const Navbar = ({ left, setLeft, right, setRight }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <nav className=" px-5 py-2  gradient-two  w-full z-50 dark:bg-gray-900 shadow-md fixed min-w-full">
        <div className="flex  items-center justify-between  ">
          <div
            className="flex w-full   
          gap-4 items-center  "
          >
            <a href="/" className="flex items-center  ">
              <figure className="p-1   ">
                <img
                  src="./vibin-logo.png"
                  className="h-8 w-12   "
                  alt="Vibin' Logo"
                />
              </figure>
              {/* <span className="text-white self-center font-bold text-xl  whitespace-nowrap  text-gray-800">
              Vibin<span className="">'</span>
            </span> */}
            </a>{" "}
            <SearchButton />
          </div>{" "}
          <div className=" max-w-[600px] mx-auto flex items-center justify-center flex-grow-1 w-full    cursor-pointer text-white  ">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-color-one flex    justify-center    p-1  w-full     "
                  : "flex    justify-center    p-1  w-full  text-black    "
              }
            >
              <div className=" hover:text-color-one rounded  p-2  ">
                <FaHome />
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-color-one flex    justify-center    p-1  w-full     "
                  : "flex    justify-center    p-1  w-full  text-black    "
              }
            >
              <div className=" text-black hover:text-color-one rounded   p-2">
                <FaFire />
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-color-one flex    justify-center    p-1  w-full     "
                  : "flex    justify-center    p-1  w-full  text-black    "
              }
            >
              <div className=" text-black hover:text-color-one rounded   p-2">
                <FaVideo />
              </div>
            </NavLink>
          </div>
          <div className="w-full text-black hover:text-color-one  justify-end flex items-center gap-3 ">
            <div className=" hover:text-black  bg-gray-50 shadow-md     text-color-one rounded  p-2  ">
              <FaRegMessage />
            </div>
            <div className=" hover:text-black shadow-md  bg-gray-50    text-color-one rounded  p-2  ">
              <FaRegBell onClick={onOpen || onClose} />
            </div>

            {/* <FaUserCircle
              className="block md:hidden"
              size={"1.125rem"}
              onClick={() => {
                setRight(false);
                setLeft(!left);
              }}
            />  */}
            <div className=" text-black  hover:text-color-one rounded  p-2  ">
              {left ? (
                <FaXmark
                  className=" block md:hidden"
                  size={"1.125rem"}
                  onClick={() => {
                    setRight(false);
                    setLeft(!left);
                  }}
                />
              ) : (
                <FaAlignJustify
                  className=" block md:hidden"
                  size={"1.125rem"}
                  onClick={() => {
                    setRight(false);
                    setLeft(!left);
                  }}
                />
              )}{" "}
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        blockScrollOnMount={false}
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        isFullHeight={false}
        // finalFocusRef={btnRef}
      >
        <DrawerContent
          height={"60vh"}
          marginTop={"48px"}
          width={"350px"}
          marginLeft={"auto"}
        >
          <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
