import React from "react";
import PropTypes from "prop-types";

const NotificationsModal = ({ notification }) => {
  return (
    <div
      className={`${
        notification ? "top-0" : " -top-[52rem]"
      }   w-full  lg:w-1/5  max-w-96 p-6 fixed  lg:right-0 overflow-hidden top-6 lg:top-0 transition-all duration-300 bg-gray-100  pt-10   h-full`}
    >
      hello
    </div>
  );
};

NotificationsModal.propTypes = {};

export default NotificationsModal;
