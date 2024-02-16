import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetNotificationsByUserIdQuery } from "../redux/features/notification/notificationApi";
import { useSelector } from "react-redux";

const NotificationsModal = ({ notification }) => {
  const userData = useSelector((state) => state.auth.user);
 const {data} = useGetNotificationsByUserIdQuery(userData?._id)
 console.log(data);
  return (
    <div
      className={`${
        notification ? "top-0" : " -top-[52rem]"
      }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-6 lg:top-0 transition-all duration-300 bg-gray-100  pt-10   h-full`}
    >
     fes
    </div>
  );
};

NotificationsModal.propTypes = {};

export default NotificationsModal;
