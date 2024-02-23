import { useState } from "react";
import useAuthCheck from "../hooks/useAuthCheck";
import avatar from "../assets/images/avatar.png";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { LuMailPlus } from "react-icons/lu";

import {
  useCreateMessageMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "../redux/features/chat/chatApi";
import ChatBox from "./ChatBox";
import { useGetFollowingUsersQuery } from "../redux/features/user/userApi";

const MessagingModal = ({ socket, userData }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [fullChatList, setFullChatList] = useState(false);

  const messageAvatarStyle =
    "w-[40px] border border-[#904486]  h-[40px] rounded";
  const messageFromOutsideShow = " p-1 text-sm w-[77%] md:w-[82%] ";
  const { data: followingUsers } = useGetFollowingUsersQuery();
  console.log(followingUsers, "following in message modal");

  const { data: allChats, refetch: allChatsRefetch } = useGetConversationsQuery(
    userData?._id
  );
  console.log("____________allchat", allChats);

  const [currentChatId, setCurrentChatId] = useState("");
  const [otherUserInfo, setOtherUserInfo] = useState({});

  // console.log(messeges);

  return (
    <div
      className={`lg:max-w-[450px] cursor-pointer  bg-gray-50 shadow-md rounded-t-lg     fixed bottom-0 left-1/2 transform -translate-x-1/2 md:left-auto md:-right-9 lg:-right-32  w-[59%] md:w-[36%] lg:w-[27%] transition-all duration-500  ${
        isMessageOpen
          ? "transition-all duration-500 h-[51vh] md:h-[49vh] lg:h-[61vh]"
          : "transition-all duration-500 h-[45px] "
      }`}
    >
      <div className="flex justify-between   items-center   px-1.5 border-color-one border-b-[.5px] ">
        <div className="flex items-center gap-3  w-full ">
          {!isChatOpen ? (
            <img
              src={userData?.avatar ? userData.avatar : avatar}
              className="w-[50px] text-gray-800 border-2 border-[#904486] h-[45px] rounded"
            />
          ) : (
            <IoArrowUndoOutline
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                setFullChatList(false);
              }}
              className="text-3xl   text-color-one hover:bg-white
                   rounded-full p-0.5"
            />
          )}
          <div className=" w-full   flex items-end justify-between pr-2 p-0.5">
            <h4
              onClick={() => {
                setIsMessageOpen(!isMessageOpen);
                setFullChatList(false);
                setIsChatOpen(false);
              }}
              className="font-medium  text-xl w-full   text-color-one   "
            >
              Messages
            </h4>
            <h4
              onClick={() => {
                setIsChatOpen(false);
                setFullChatList(!fullChatList);
              }}
              className="   "
            >
              <LuMailPlus
                size={"2rem"}
                className="gradient-two   text-color-one   border rounded    p-0.5 font-bold  border-color-one"
              />
            </h4>
          </div>
        </div>

        <div className=" ">
          <i
            onClick={() => {
              setIsMessageOpen(!isMessageOpen);
              setIsChatOpen(false);
            }}
            style={{ display: "inline-block", width: "2.2rem" }}
            className={`fa-solid text-2xl text-[#904486] text-center hover:bg-gray-100 hover:rounded-full transition-all duration-500 ${
              isMessageOpen ? "fa-arrow-down" : "fa-arrow-up"
            }`}
          ></i>
        </div>
      </div>

      {isMessageOpen && (
        <div className="space-y-3 overflow-y-auto h-[calc(100%-4rem)]   relative overflow-x-hidden">
          {isChatOpen ? (
            <div className="relative pb-5">
              <ChatBox
                allChatsRefetch={allChatsRefetch}
                currentChatId={currentChatId}
                socket={socket}
                userData={userData}
                otherUserInfo={otherUserInfo}
              />
            </div>
          ) : (
            <div>
              {!fullChatList
                ? allChats?.results.length > 0 &&
                  allChats?.results?.map((chat) => {
                    console.log(chat, "all chat mapppppppppppppp");
                    const otherUser = chat.participants.find(
                      (person) => person._id != userData._id
                    );
                    console.log(otherUser);
                    return (
                      chat.lastMessage && (
                        <div
                          key={chat._id}
                          className="flex items-center px-4    hover:bg-gray-100   h-[80px]"
                        >
                          <div
                            onClick={() => {
                              setIsChatOpen(!isChatOpen);

                              console.log(otherUser);
                              setCurrentChatId(otherUser._id);
                              setOtherUserInfo(otherUser);

                              socket.emit("join chat", otherUser._id);
                            }}
                            className="items-center flex  w-14"
                          >
                            <img
                              className={messageAvatarStyle}
                              src={otherUser?.avatar || avatar}
                              alt=""
                            />
                          </div>
                          <div
                            onClick={() => {
                              setIsChatOpen(!isChatOpen);
                              setCurrentChatId(otherUser._id);
                              setOtherUserInfo(otherUser);
                              socket.emit("join chat", otherUser._id);
                            }}
                            className={messageFromOutsideShow}
                          >
                            <p className="font-medium text-gray-800">
                              {otherUser?.fullName}
                            </p>
                            <p
                              className={`text-gray-500 overflow-hidden  whitespace-nowrap overflow-ellipsis`}
                            >
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                      )
                    );
                  })
                : followingUsers.data.map((following) => {
                    const otherUser = following.profile;
                    console.log(otherUser);

                    return (
                      <div
                        key={following._id}
                        className="flex items-center px-4   border-b  hover:bg-gray-100   h-[80px]"
                      >
                        <div
                          onClick={() => {
                            setIsChatOpen(!isChatOpen);
                            setCurrentChatId(otherUser._id);
                            setOtherUserInfo(otherUser);
                            setFullChatList(!fullChatList);

                            socket.emit("join chat", otherUser._id);
                          }}
                          className="items-center flex  w-14 "
                        >
                          <img
                            className={messageAvatarStyle}
                            src={otherUser.avatar || avatar}
                            alt=""
                          />
                        </div>
                        <div
                          onClick={() => {
                            setIsChatOpen(!isChatOpen);
                            setCurrentChatId(otherUser._id);
                            setOtherUserInfo(otherUser);
                            socket.emit("join chat", otherUser._id);
                          }}
                          className={messageFromOutsideShow}
                        >
                          <p className="font-medium text-xl text-gray-700 ">
                            {otherUser?.fullName}
                          </p>
                        </div>
                      </div>
                    );
                  })}

              {!fullChatList && !allChats?.results.length > 0 && (
                <div className="text-center mt-10">
                  {" "}
                  You are yet to create a conversation!
                  <br />{" "}
                  <button
                    onClick={() => {
                      setFullChatList(true);
                      allChatsRefetch();
                    }}
                    className="p-2 gradient-two text-color-one rounded mt-5 border-color-one border-[.5px]"
                  >
                    Start A New Conversation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagingModal;
