import React, { useState } from "react";
import PropTypes from "prop-types";

const TestMessages = () => {
  return (
    <>
      {" "}
      <div className="px-2 py-2 bg-slate-800 text-white">Say Hello</div>
      <div
        onClick={sendMessage}
        className="px-2 py-2 my-2 bg-slate-800 text-white"
      >
        Send message{" "}
      </div>
    </>
  );
};

TestMessages.propTypes = {};

export default TestMessages;
