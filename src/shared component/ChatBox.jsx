import axios from "axios";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../redux/features/chat/chatApi";
import { useEffect, useState } from "react";
import avatar from "../assets/images/avatar.png";
import { IoSend } from "react-icons/io5";

const ChatBox = ({
  userId,
  currentChatId,
  socket,
  userData,
  currentChatInfo,
}) => {
  console.log(currentChatInfo, " current chat info");
  const [chatInput, setChatInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setAllMessages([...allMessages, newMessageRecieved]);
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/v1/chats/messages/${userId}/${currentChatId}`
      );

      setAllMessages(data?.messages);

      console.log(data, "from axios fetch", currentChatId);
    };

    fetchData();
  }, [userId, currentChatId]);

  const receiver = currentChatInfo.participants.find(
    (part) => part._id !== userId
  );

  console.log(receiver, "recvb");

  const sendMessage = async () => {
    if (currentChatId && chatInput) {
      const newMessage = {
        conversation: {
          participants: [receiver._id, userId],
          lastMessage: chatInput,
        },
        message: {
          receiver: receiver._id,
          sender: userId,
          message: chatInput,
        },
      };
      const res = await createMessage(newMessage);
      console.log(res.data);
      const emit = {
        conversationId: currentChatId,
        status: "sent",
        sender: {
          _id: userId,
          fullName: userData.fullName,
          avatar: userData.avatar,
        },
        receiver: {
          _id: receiver._id,
          fullName: receiver.fullName,
          avatar: receiver.avatar,
        },
        message: chatInput,
      };

      socket.emit("new message", emit);
      setAllMessages([...allMessages, emit]);
      setChatInput("");
    }
  };

  console.log(allMessages);
  return (
    <>
      <ul className="space-y-5 p-4 flex flex-col overflow-y-scroll">
        {/* <!-- Chat --> */}

        {allMessages?.map((message) => (
          <li
            key={message._id}
            className={`max-w-lg flex gap-x-2 sm:gap-x-4 ${
              message?.sender?._id !== userId
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
              <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
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
        ))}
      </ul>
      <div className="fixed w-full bottom-0 px-4">
        <span className="relative flex items-center ">
          <input
            onChange={(e) => setChatInput(e.target.value)}
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
