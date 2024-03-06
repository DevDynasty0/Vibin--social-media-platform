import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

let socket;
const useSocket = () => {
  const userData = useSelector((state) => state.auth.user);

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const ENDPOINT = "http://localhost:8000";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    // socket.on("connection", () => setIsSocketConnected(true));
  }, [userData]);

  return { socket, isSocketConnected };
};

export default useSocket;
