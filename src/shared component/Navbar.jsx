import React from "react";
import PropTypes from "prop-types";
import {
  FaAlignJustify,
  FaBell,
  FaFire,
  FaHome,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";
import { FaMessage, FaXmark } from "react-icons/fa6";
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
      <nav className=" px-5 py-2 bg-[#264052] w-full z-50 dark:bg-gray-900 shadow    fixed min-w-full">
        <div className="flex  items-center justify-between  ">
          <div
            className="flex w-full   
          gap-4 items-center  "
          >
            <a href="/" className="flex items-center  ">
              <figure className="p-1 bg-gray-100 rounded-md">
                <img
                  src="./vibin-logo.png"
                  className="h-6 w-8 md:w-6"
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
            <NavLink className="flex    justify-center hover:bg-gray-300  p-1  w-full     ">
              <FaHome />
            </NavLink>
            <div className=" flex hover:bg-gray-300  justify-center   w-full p-1">
              <FaFire />
            </div>
            <div className="hover:bg-gray-300   flex justify-center  w-full p-1">
              <FaVideo />
            </div>
          </div>
          <div className="w-full text-white  justify-end flex items-center gap-3 ">
            <FaMessage />
            <FaBell onClick={onOpen || onClose} />
            {/* <FaUserCircle
              className="block md:hidden"
              size={"1.125rem"}
              onClick={() => {
                setRight(false);
                setLeft(!left);
              }}
            />  */}
            {left ? (
              <FaXmark
                className=" block md:hidden"
                color="white"
                size={"1.125rem"}
                onClick={() => {
                  setRight(false);
                  setLeft(!left);
                }}
              />
            ) : (
              <FaAlignJustify
                className=" block md:hidden"
                color="white"
                size={"1.125rem"}
                onClick={() => {
                  setRight(false);
                  setLeft(!left);
                }}
              />
            )}
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
