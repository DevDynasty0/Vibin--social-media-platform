import React from "react";
import PropTypes from "prop-types";
import "../styles/color.css";
import {
  FaAlignJustify,
  FaFire,
  FaHome,
  FaRegBell,
  FaVideo,
} from "react-icons/fa";
import { FaRegMessage, FaXmark } from "react-icons/fa6";
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
      <nav className=" px-5 text-white gradient-one   w-full z-50 dark:bg-gray-900 shadow-md fixed min-w-full">
        <div className="flex  items-center justify-between  ">
          <div
            className="flex w-full   
          gap-4 items-center  py-2 "
          >
            <a href="/" className="flex items-center  ">
              <figure className="    ">
                <img
                  src="./vibin-logo3.png"
                  className="h-8 w-16 object-cover drop-shadow-md  "
                  alt="Vibin' Logo"
                />
              </figure>
              {/* <span className="text-white self-center font-bold text-xl  whitespace-nowrap  text-gray-800">
              Vibin<span className="">'</span>
            </span> */}
            </a>{" "}
            <SearchButton />
          </div>{" "}
          <div className=" max-w-[600px] mx-auto flex items-center justify-between flex-grow-1 w-full   cursor-pointer text-white  ">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-color-one  flex border-white border-b   justify-center bg-white rounded   p-1   text-center mx-auto"
                  : "flex  text-center mx-auto  justify-center  p-1   text-white      "
              }
            >
              <div className="  rounded   px-1  ">
                <FaHome size={"1.2rem"} />
              </div>
            </NavLink>
            <NavLink
              to={"/trending"}
              className={({ isActive }) =>
                isActive
                  ? "text-color-one  flex border-white border-b   justify-center bg-white rounded   p-1   text-center mx-auto"
                  : "flex  text-center mx-auto  justify-center  p-1   text-white      "
              }
            >
              <div className=" text-white hover:text-color-one rounded    px-1">
                <FaFire />
              </div>
            </NavLink>
            <NavLink
              to={"/videos"}
              className={({ isActive }) =>
                isActive
                  ? "text-color-one  flex border-white border-b   justify-center bg-white rounded   p-1   text-center mx-auto"
                  : "flex  text-center mx-auto  justify-center  p-1   text-white      "
              }
            >
              <div className=" text-white hover:text-color-one rounded    px-1">
                <FaVideo />
              </div>
            </NavLink>
          </div>
          <div className="w-full text-white hover:text-color-one  justify-end flex items-center gap-3 ">
            <div className=" hover:text-white  bg-gray-50 shadow-md     text-color-one rounded   p-1  ">
              <FaRegMessage />
            </div>
            <div className=" hover:text-white shadow-md  bg-gray-50    text-color-one rounded   p-1  ">
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
            <div className=" text-white  hover:text-color-one rounded   px-1  ">
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
