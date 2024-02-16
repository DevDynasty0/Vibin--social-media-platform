import { useEffect, useRef } from "react";
import "../styles/color.css";
import {
  FaAlignJustify,
  FaFire,
  FaHome,
  FaRegBell,
  FaVideo,
} from "react-icons/fa";
import { FaMagnifyingGlass, FaRegMessage, FaXmark } from "react-icons/fa6";
import SearchButton from "./SearchButton";

import avatar from "../assets/images/avatar.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useGetNotificationsByUserIdQuery } from "../redux/features/notification/notificationApi";
const Navbar = ({
  left,
  setLeft,
  setRight,
  searchInput,
  setSearchInput,
  searchResults,
  showResults,
  setShowResults,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const userData = useSelector((state) => state.auth.user);
  const { data } = useGetNotificationsByUserIdQuery(userData?._id)
  //  console.log(data.data[0].message);
  const notificationData = data?.data
  console.log(notificationData);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setShowResults]);

  return (
    <>
      <nav className=" px-5 text-white gradient-one   w-full z-50 dark:bg-gray-900 shadow-md fixed min-w-full">
        <div className="flex  items-center justify-between  ">
          <div
            // onBlur={() => setShowResults(false)}
            ref={containerRef}
            className="flex w-full   
          gap-4 items-center  py-2 relative"
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
            <SearchButton
              setShowResults={setShowResults}
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />
            {searchInput && (
              <div
                onClick={() => {
                  setSearchInput(searchInput);
                  setShowResults(true);
                }}
                className={`${searchInput.length > 0 && showResults ? "absolute" : "hidden"
                  } bg-white top-14 rounded   z-[999] w-full max-w-[400px] text-black transition-all   duration-150  `}
              >
                <div className="text-lg font-medium mx-2 mt-0.5">
                  Search results
                </div>
                <ul className="p-2">
                  {searchResults?.users.length > 0
                    ? searchResults?.users?.slice(0, 4)?.map((user) => (
                      <div
                        onClick={() => {
                          setShowResults(true);
                          navigate(`/profile/${user?._id}`);
                        }}
                        key={user._id}
                        className={`flex items-center gap-5 p-1 hover:bg-gray-100 `}
                      >
                        <img
                          src={user?.avatar ? user?.avatar : avatar}
                          alt=""
                          className="w-12 h-10  rounded    "
                        />
                        <li>{user?.fullName}</li>
                        <FaMagnifyingGlass className="ml-auto text-gray-500" />
                      </div>
                    ))
                    : "No matched results"}
                </ul>

                <div className="  w-full gradient-one rounded-b-md text-white p-1  border-t-2 ">
                  <p>See All</p>{" "}
                </div>
              </div>
            )}
          </div>

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
            <div className=" shadow-md     text-color-one rounded   p-1  ">
              <Menu>
                <MenuButton
                  variant="outline"
                  as={IconButton}
                  // aria-label="Options"
                  icon={<IoNotifications />}
                  color={"color-one"}
                  bgColor={"white"}
                >
                  {/* Notifications */}
                </MenuButton>
                <MenuList>
                  {notificationData?.map((notification, index) => (
                    <MenuItem key={index} minH="48px">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src="https://placekitten.com/100/100"
                        alt="Avatar"
                        mr="12px"
                      />
                      <span>{notification?.message}</span>
                    </MenuItem>
                  ))}
                </MenuList>

              </Menu>
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
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
