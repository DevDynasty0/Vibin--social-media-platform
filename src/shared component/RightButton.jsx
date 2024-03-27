import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import { followUser } from "../hooks/followUser";
import useAuthCheck from "../hooks/useAuthCheck";
import { useCreateNotificationMutation } from "../redux/features/notification/notificationApi";
import { useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";

const RightButton = ({ person }) => {
  const { user } = useAuthCheck();
  const [follow, setFollow] = useState([]);
  const userData = useSelector((state) => state.auth.user);
  const [createNotification] = useCreateNotificationMutation();
  const { socket } = useSocket();
  const handleFollow = async (id) => {
    setFollow([...follow, id]);
    const profile = id;
    const follower = user?._id;
    console.log(follower, "you");
    const res = await followUser(profile, follower);
    console.log(res);
    const data = {
      receiverId: profile,
      senderId: follower,
      message: `${userData?.fullName} followed you.`,
      contentType: "follow",
    };

    // save notificaitont to the database
    createNotification(data);
    const emitData = {
      ...data,
      isRead: false,
      senderId: { senderId: userData?._id, avatar: userData?.avatar },
    };

    // send notification to reciever
    socket.emit("new notification", emitData);
  };
  const truncatedName =
    person?.fullName.length >= 12
      ? person?.fullName.slice(0, 12) + "..."
      : person?.fullName;
  return (
    <div>
      <div className="grid grid-cols-3  items-center  px-2 py-3  hover:bg-white hover:bg-opacity-40 rounded">
        <div className=" col-span-2">
          <div className="flex items-center gap-3">
            <NavLink to={`/profile/${person?._id}`} className=" ">
              <img
                className="h-14 w-14 rounded bg-gray-50"
                src={person?.avatar || avatar}
              />
            </NavLink>

            {/* Render the icon if provided */}
            <div className="text-start  items-center">
              <span className="  font-medium">
                {truncatedName}
                {/* {person?.fullName.length > 10
                  ? person?.fullName.split(" ", 2).join(" ")
                  : person?.fullName} */}
              </span>{" "}
              <br />
              <p className="text-[12px] lg:text-[9px] xl:text-[12px] text-gray-500">
                Suggested for you
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <button
            onClick={() => handleFollow(person?._id)}
            className="px-2 min-w-20   h-7 border-2 bg-white border-color-one   text-color-one text-xs rounded-md font-bold py-1 shadow"
          >
            {follow?.find((id) => id === person?._id) ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};
RightButton.propTypes = {};

export default RightButton;
