import axios from "axios";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../redux/features/chat/chatApi";
import { useEffect, useState } from "react";
import avatar from "../assets/images/avatar.png";
import { IoSend } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa6";
import { TiMessageTyping } from "react-icons/ti";

const ChatBox = ({
  socket,
  userData,
  otherUserInfo,
  allChatsRefetch,
  setNewMessage,
}) => {
  const [chatInput, setChatInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [messageLoding, setMessageLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  console.log(allMessages);

  console.log(otherUserInfo);
  console.log(userData);

  const typingInfo = {
    receiver: otherUserInfo?._id,
    sender: userData?._id,
    typingStatus: true,
  };

  console.log(allMessages);

  const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setAllMessages([...allMessages, newMessageRecieved]);
    });

    socket.on("typing recieved", (info) => {
      setTyping(info.typingStatus);
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      if (otherUserInfo._id && userData._id) {
        const { data } = await axios.get(
          `https://vibin-c5r0.onrender.com/api/v1/chats/messages/${userData?._id}/${otherUserInfo?._id}`
        );

        if (data?.messages) {
          setAllMessages(data?.messages);
          setMessageLoading(false);
        }

        if (!data || data.message) {
          setMessageLoading(false);
        }
        console.log(data, " get messagessss from backend ");
      }
    };

    fetchData();
  }, [userData, otherUserInfo, messageLoding]);

  const sendMessage = async () => {
    if (otherUserInfo && chatInput) {
      const newMessage = {
        conversation: {
          participants: [otherUserInfo._id, userData._id],
          lastMessage: chatInput,
        },
        message: {
          receiver: otherUserInfo?._id,
          sender: userData?._id,
          message: chatInput,
        },
      };
      const res = await createMessage(newMessage);
      console.log(res);
      const emit = {
        status: "sent",
        sender: {
          _id: userData?._id,
          fullName: userData?.fullName,
          avatar: userData?.avatar,
        },
        receiver: {
          _id: otherUserInfo?._id,
          fullName: otherUserInfo?.fullName,
          avatar: otherUserInfo?.avatar,
        },
        message: chatInput,
      };

      socket.emit("new message", emit);
      setAllMessages([...allMessages, emit]);
      setChatInput("");
      allChatsRefetch();
    }
  };

  console.log(allMessages);

  if (messageLoding) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center  mt-10">
        {" "}
        <FaSpinner size={"2rem"} className="animate-spin " />
      </div>
    );
  }
  return (
    <>
      {!messageLoding && !allMessages?.length > 0 && (
        <div className=" w-full flex flex-col  mt-5 items-center justify-center">
          <p>Your conversation starts here</p>
        </div>
      )}
      <ul className="space-y-5 p-4 flex flex-col overflow-y-scroll  ">
        {/* <!-- Chat --> */}

        {!messageLoding &&
          allMessages?.length > 0 &&
          allMessages?.map(
            (message, idx) =>
              message.message && (
                <li
                  key={idx}
                  className={`max-w-lg flex gap-x-2 sm:gap-x-4 ${
                    message?.sender?._id !== userData._id
                      ? "  mr-auto "
                      : " ml-auto  flex-row-reverse "
                  } `}
                >
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={message.sender?.avatar || avatar}
                    alt="Image Description"
                  />

                  <div>
                    {/* <!-- Card --> */}
                    <div
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2
               space-y-3 dark:bg-slate-900 dark:border-gray-700"
                    >
                      <div className="space-y-1.5">
                        <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                          {message.message}
                        </p>
                      </div>
                    </div>
                    {/* <!-- End Card --> */}

                    <span className="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                      <svg
                        className="flex-shrink-0 w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 7 17l-5-5" />
                        <path d="m22 10-7.5 7.5L13 16" />
                      </svg>
                      Sent
                    </span>
                  </div>
                </li>
              )
          )}
      </ul>
      <div className="fixed w-full bottom-0 px-4">
        <span className="relative flex items-center ">
          {typing && (
            <TiMessageTyping
              size={"1.6rem"}
              className="text-color-one animate-bounce   absolute -top-7 left-0"
            />
          )}
          <input
            onChange={(e) => {
              setChatInput(e.target.value);
              if (e.target.value.length > 2) {
                socket.emit("on typing", typingInfo);
              }
            }}
            onBlur={() =>
              socket.emit("on typing", {
                receiver: otherUserInfo?._id,
                sender: userData?._id,
                typingStatus: false,
              })
            }
            value={chatInput}
            type="text"
            className=" w-full border-2 p-2 border-color-one rounded-md"
          />
          <button
            onClick={sendMessage}
            className="absolute gradient-one disabled: text-white right-0 py-2 px-3  rounded-md"
            disabled={chatInput.length > 0 ? false : true}
          >
            <IoSend size={"1.5rem"} />
          </button>
        </span>
      </div>
    </>
  );
};

export default ChatBox;
