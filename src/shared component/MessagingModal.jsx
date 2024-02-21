import { useState } from "react";
import useAuthCheck from "../hooks/useAuthCheck";
import avatar from "../assets/images/avatar.png";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";

import {
  useCreateMessageMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "../redux/features/chat/chatApi";
import ChatBox from "./ChatBox";

const MessagingModal = ({ socket, userData }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const messageAvatarStyle =
    "w-[40px] border border-[#904486]  h-[40px] rounded";
  const messageFromOutsideShow = " p-1 text-sm w-[77%] md:w-[82%] ";

  const { data: allChats } = useGetConversationsQuery(userData?._id);
  console.log("____________allchat", allChats);

  const [currentChatId, setCurrentChatId] = useState("");

  // console.log(messeges);

  return (

    <div
      className={`lg:max-w-[450px] cursor-pointer  bg-gray-50 shadow-md rounded-t-lg     fixed bottom-0 left-1/2 transform -translate-x-1/2 md:left-auto md:-right-9 lg:-right-32  w-[59%] md:w-[36%] lg:w-[27%] transition-all duration-500  ${isMessageOpen
        ? "transition-all duration-500 h-[51vh] md:h-[49vh] lg:h-[61vh]"
        : "transition-all duration-500 h-[45px] "
        }`}
    >
      <div className="flex justify-between   items-center   p-1.5  ">

        <div className="flex items-center gap-3  w-full ">
          {!isChatOpen ? (
            <img
              src={userData?.avatar ? userData.avatar : avatar}
              className="w-[50px] text-gray-800 border-2 border-[#904486] h-[45px] rounded"
            />
          ) : (
            <IoArrowUndoOutline
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="text-3xl   text-color-one hover:bg-white
                   rounded-full p-1"
            />
          )}
          <div
            onClick={() => {
              setIsMessageOpen(!isMessageOpen);
              setIsChatOpen(false);
            }}
            className="  w-full h-full "
          >
            <h4 className="font-medium text-xl    ">Messages</h4>
          </div>
        </div>

        <div className=" ">
          <i
            onClick={() => { setIsMessageOpen(!isMessageOpen); setIsChatOpen(false) }}
            style={{ display: "inline-block", width: "2.2rem" }}
            className={`fa-solid text-2xl text-[#904486] text-center hover:bg-gray-100 hover:rounded-full transition-all duration-500 ${isMessageOpen ? "fa-arrow-down" : "fa-arrow-up"
              }`}
          ></i>
        </div>

      </div>

      {isMessageOpen && (
        <div className="space-y-3 overflow-y-auto h-[calc(100%-4rem)]   relative overflow-x-hidden">
          {isChatOpen ? (
            <div className="relative pb-5">
              <ChatBox
                userId={userData?._id}
                currentChatId={currentChatId}
                socket={socket}
                userData={userData}
                currentChatInfo={allChats.results.find(
                  (chat) => chat._id === currentChatId
                )}
              />
            </div>
          ) : (
            <div>
              {allChats?.results?.map((chat) => {
                console.log(chat);
                const receiver = chat.participants.find(
                  (person) => person._id !== userData._id
                );
                return (
                  <div
                    key={chat._id}
                    className="flex items-center px-4    hover:bg-gray-100   h-[80px]"
                  >
                    <div
                      onClick={() => {
                        setIsChatOpen(!isChatOpen);
                        setCurrentChatId(chat._id);

                        socket.emit(
                          "join chat",
                          chat._id
                        );
                      }}
                      className="items-center flex  w-14"
                    >
                      <img
                        className={messageAvatarStyle}
                        src={receiver.avatar || avatar}
                        alt=""
                      />
                    </div>
                    <div
                      onClick={() => {
                        setIsChatOpen(!isChatOpen);
                        setCurrentChatId(chat._id);

                        socket.emit(
                          "join chat",
                          chat._id
                        );
                      }}
                      className={messageFromOutsideShow}
                    >
                      <p className="font-medium text-gray-800">
                        {receiver?.fullName}
                      </p>
                      <p
                        className={`text-gray-500 overflow-hidden  whitespace-nowrap overflow-ellipsis`}
                      >
                        Test messeges
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>

  );
};

export default MessagingModal;
