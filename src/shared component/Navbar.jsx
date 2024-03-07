import { useEffect, useRef, useState } from "react";
import "../styles/color.css";
import logo from "../assets/images/PurpleLogo2.png";
import { FaAlignJustify, FaBell } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import SearchButton from "./SearchButton";

import avatar from "../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarBadge,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  useChangeNotificationStatusMutation,
  useGetNotificationsByUserIdQuery,
} from "../redux/features/notification/notificationApi";
import useSocket from "../hooks/useSocket";
import NotificationsModal from "./NotificationsModal";
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
  const [notificationModalState, setNotificationModalState] = useState(false);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const {
    isOpen: isNotificationOpen,
    onOpen: notifictionOnOpen,
    onClose: notifictionOnClose,
  } = useDisclosure();
  const userData = useSelector((state) => state.auth.user);
  console.log("user data __: :__:", userData);
  const { data: notificationsData, refetch: refetchNotifications } =
    useGetNotificationsByUserIdQuery(userData?._id, { skip: !userData?._id });

  const [notificationState, setNotificationState] = useState([]);
  // console.log("Notification  state", notificationState);
  const { socket } = useSocket();
  const [changeNotificationStatus] = useChangeNotificationStatusMutation();

  useEffect(() => {
    setNotificationState(notificationsData?.data || []);
  }, [notificationsData]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }
    console.log("navvvvvvvvvvvvvv", user);
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setShowResults, user]);

  useEffect(() => {
    if (socket) {
      socket.on("notification received", (newNotification) => {
        console.log("new notification", newNotification);
        setNotificationState([newNotification, ...notificationState]);
      });
    }
    return () => {
      if (socket) {
        socket.off("notification received");
      }
    };
  }, [socket]);

  const handleNotificationClick = async () => {
    if (!notificationModalState) {
      notifictionOnOpen();
      setNotificationModalState(!notificationModalState);

      await changeNotificationStatus();
      await refetchNotifications();
      return;
    }
    setNotificationModalState(!notificationModalState);
    notifictionOnClose();
  };

  return (
    <>
      <nav
        className=" px-5 text-white bg-white py-1     
        z-50  shadow-md sticky top-0 w-full "
      >
        <div className="flex  items-center  ">
          <div
            // onBlur={() => setShowResults(false)}
            ref={containerRef}
            className="flex pr-2  
           items-center  py-2  lg:ml-4 relative"
          >
            <a href="/" className="flex items-center  ">
              <figure className="    ">
                <img
                  // src="./vibin-logo3.png"
                  src={logo}
                  className="md:h-7 md:w-9 lg:h-8 lg:w-14 xl:h-9 xl:w-16 w-10 h-7 object-cover   "
                  alt="Vibin' Logo"
                />
              </figure>
              {/* <span className="text-white self-center font-bold text-xl  whitespace-nowrap  text-gray-800">
              Vibin<span className="">'</span>
            </span> */}
            </a>{" "}
            <div className="hidden lg:block">
              <p className="ml-2 lg:text-xl xl:text-2xl text-xl font-bold  font-serif text-black ">
                vibin'
              </p>
            </div>
          </div>

          <div className="w-full text-white hover:text-color-one   justify-end flex items-center gap-3 ">
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
                className={`${
                  searchInput.length > 0 && showResults ? "absolute" : "hidden"
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
            <div className="  text-color-one rounded   relative">
              <div className="  p-2   rounded-md relative">
                <Button
                  onClick={async () => {
                    notifictionOnOpen();
                    await changeNotificationStatus();
                    await refetchNotifications();
                  }}
                >
                  {" "}
                  <FaBell size={"1.2rem"} className="text-color-one" />
                  <span className="absolute -top-2 -right-3 text-sm bg-green-500  text-white w-[20px] h-[20px] text-center  rounded-full">
                    {notificationState?.filter(
                      (notification) => notification.isRead === false
                    ).length > 0
                      ? notificationState?.filter(
                          (notification) => notification.isRead === false
                        ).length
                      : 0}
                  </span>
                </Button>
              </div>
              <NotificationsModal
                isNotificationOpen={isNotificationOpen}
                notifictionOnClose={notifictionOnClose}
                notifictionOnOpen={notifictionOnOpen}
                notificationState={notificationState}
              />
            </div>
            {/* Notifications end*/}

            {/* <div className=" text-white  hover:text-color-one rounded   px-1  ">
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
            </div> */}
            {/* try avater */}
            <div>
              <Stack onClick={() => setLeft(!left)} direction="row" spacing={4}>
                <Avatar
                  className="w-6 h-6 rounded-full"
                  boxSize={10}
                  src={user?.avatar}
                >
                  <AvatarBadge boxSize="0.80em" bg="green.500" />
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
