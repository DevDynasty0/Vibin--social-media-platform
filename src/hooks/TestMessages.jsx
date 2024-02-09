import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;
const TestMessages = () => {
  const userData = useSelector((state) => state.auth.user);
  const { socketConnected, setSocketConnected } = useState(false);
  const [messeges, setMesseges] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(true));
  }, [userData, setSocketConnected]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMesseges([...messeges, newMessageRecieved]);
    });
  });

  console.log(messeges);

  const sendMessage = () => {
    socket.emit("new message", {
      message: "this is test messate",
      _id: userData._id,
    });
  };

  return (
    <>
      {" "}
      <div
        onClick={() => {
          socket.emit("join chat", "Say hello room 1121");
        }}
        className="px-2 py-2 bg-slate-800 text-white"
      >
        Say Hello
      </div>
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
