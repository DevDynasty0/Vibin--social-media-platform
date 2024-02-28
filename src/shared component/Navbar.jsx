import { useEffect, useRef, useState } from "react";
import "../styles/color.css";
import logo from "../assets/images/PurpleLogo2.png"
import {
  FaAlignJustify,
  FaFire,
  FaHome,
  FaRegBell,
  FaVideo,
} from "react-icons/fa";
import { FaMagnifyingGlass, FaRegMessage, FaXmark } from "react-icons/fa6";
import SearchButton from "./SearchButton";
import notificationAvatar from '../assets/images/avatar.png'

import avatar from "../assets/images/avatar.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarBadge,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useChangeNotificationStatusMutation, useGetNotificationsByUserIdQuery } from "../redux/features/notification/notificationApi";
import useSocket from "../hooks/useSocket";
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
  const { data:notificationsData, refetch:refetchNotifications } = useGetNotificationsByUserIdQuery(userData?._id)
  
  const [notificationState, setNotificationState] = useState([]);
  // console.log("Notification  state", notificationState);
  const { socket } = useSocket();
  const [changeNotificationStatus] = useChangeNotificationStatusMutation();

  useEffect(() => {
    setNotificationState(notificationsData?.data || [])
  }, [notificationsData])

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

  useEffect(() => {

    if (socket) {
      socket.on("notification received", (newNotification) => {
        console.log("new notification", newNotification);
        setNotificationState((preNotification) => [newNotification, ...preNotification]);
      })
    }
    return () => {
      if (socket){
        socket.off("notification received")
      }
}
  }, [socket]);

return (
  <>
    <nav className=" px-5 text-white bg-white   w-full z-50  shadow-md fixed min-w-full">
      <div className="flex  items-center  ">
        <div
          // onBlur={() => setShowResults(false)}
          ref={containerRef}
          className="flex w-full   
           items-center  py-2 relative"
        >
          <a href="/" className="flex items-center  ">
            <figure className="    ">
              <img
                // src="./vibin-logo3.png"
                src={logo}
                className="h-10 w-14 object-cover   "
                alt="Vibin' Logo"
              />
            </figure>
            {/* <span className="text-white self-center font-bold text-xl  whitespace-nowrap  text-gray-800">
              Vibin<span className="">'</span>
            </span> */}
          </a>{" "}
          <div><p className="text-3xl font-bold font-serif text-color-one ">ibin'</p></div>
          
        </div>

        {/* <div className=" max-w-[600px] mx-auto flex items-center justify-between flex-grow-1 w-full   cursor-pointer text-white  ">
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
        </div> */}
        <div className="w-full text-white hover:text-color-one   justify-end flex items-center gap-3 ">
          {/* <div className=" hover:text-white  bg-gray-50 shadow-md     text-color-one rounded   p-1  ">
            <FaRegMessage />
          </div> */}
          {/* Notifications  start*/}
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
                } bg-white  top-14 rounded   z-[999] w-full max-w-[400px] text-black transition-all   duration-150  `}
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
          <div className=" shadow-md  text-color-one rounded   p-1 relative">
            <Menu>
              <MenuButton
                onClick={() => {changeNotificationStatus(); refetchNotifications() }}
                variant="outline"
                as={IconButton}
                // aria-label="Options"
                icon={<IoNotifications />}
                color={"color-one"}
                bgColor={"white"}
              >
               
              </MenuButton>
              <span className={`absolute top-0 right-3 font-bold ${notificationState.filter(singleNotifi => singleNotifi.isRead === false).length <= 0 && "hidden"}`}>
                {
                  notificationState.filter(singleNotifi => singleNotifi.isRead === false).length
                }
              </span>
              <MenuList>
                {
                  notificationState?.length > 0 ?
                    <div>
                      {notificationState?.map((notification, index) => (
                        <MenuItem key={index} minH="48px">
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            // src={notificationData?.senderId?.avatar ? notificationData?.senderId?.avatar : 'https://placekitten.com/100/100'}
                            src={notification?.senderId?.avatar || notificationAvatar}
                            alt="Avatar"
                            mr="12px"
                          />
                          <span>{notification?.message}</span>
                        </MenuItem>
                      ))}
                    </div>
                    :
                    <MenuItem>You have no notification</MenuItem>
                }
              </MenuList>

            </Menu>
          </div>
          {/* Notifications end*/}
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
          {/* try avater */}
          <div>
          <Stack direction='row' spacing={4}>
  <Avatar className="w-6 h-6 rounded-full" boxSize={10}>
    <AvatarBadge boxSize='0.80em' bg='green.500' />
  </Avatar>

 
</Stack>
          </div>
          {/*  */}
        </div>
      </div>
    </nav>
  </>
);
};

Navbar.propTypes = {};

export default Navbar;
