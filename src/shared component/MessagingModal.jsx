import { useState } from "react";
import useAuthCheck from "../hooks/useAuthCheck";
import avatar from "../assets/images/avatar.png";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { LuMailPlus } from "react-icons/lu";

import { useGetConversationsQuery } from "../redux/features/chat/chatApi";
import ChatBox from "./ChatBox";
import {
  useGetFollowersQuery,
  useGetFollowingUsersQuery,
  useSearchUsersQuery,
} from "../redux/features/user/userApi";
import { FaSpinner } from "react-icons/fa6";
import Skeleton from "./Skeleton";
import SearchButton from "./SearchButton";

const MessagingModal = ({ socket, userData }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [fullChatList, setFullChatList] = useState(false);
  const [newMessage, setNewMessage] = useState(0);

  const messageAvatarStyle =
    "w-[40px] border border-[#904486]  h-[40px] rounded";
  const messageFromOutsideShow = " p-1 text-sm w-[77%] md:w-[82%] ";
  const { data: followingUsers, isLoading: followingUsersLoading } =
    useGetFollowingUsersQuery();
  const { data: followers, isLoading: followersLoading } =
    useGetFollowersQuery();
  const [userInput, setUserInput] = useState("");
  const {
    data: allChats,
    isLoading: allChatsLoading,
    refetch: allChatsRefetch,
  } = useGetConversationsQuery(userData?._id, { skip: !userData?._id });
  const {
    data: searchUsers,
    isLoading,
    isSuccess,
    refetch: searchUsersRefetch,
  } = useSearchUsersQuery(userInput.length > 0 && userInput);
  // console.log(searchUsers, "search in meassaging ");
  // console.log(newMessage);
  const [currentChatId, setCurrentChatId] = useState("");
  const [otherUserInfo, setOtherUserInfo] = useState({});

  if (allChatsLoading || followersLoading || followingUsersLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center  mt-10">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} noOfLines="2" spacing="4" skeletonHeight="2" />
        ))}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsMessageOpen(!isMessageOpen)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-color-one hover:scale-110 m-0 cursor-pointer   border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>
      <div
        className={`  cursor-pointer  bg-gray-50 shadow-md rounded-lg  fixed bottom-24 right-1 md:right-10 max-w-[420px] w-full transition-all duration-500  ${
          isMessageOpen
            ? "transition-all duration-500  h-[540px] md:h-[600px]"
            : " hidden"
        }`}
      >
        <div
          className="flex justify-between rounded-t-lg  
        items-center bg-white h-[50px]  px-1.5   border-[.8px] border-b 
        shadow-md"
        >
          <div className="flex items-center gap-3  w-full">
            {!isChatOpen ? (
              <img
                src={userData?.avatar ? userData.avatar : avatar}
                className="w-[40px] text-gray-800 border-2 border-[#904486] h-[40px] p-1 rounded"
              />
            ) : (
              <IoArrowUndoOutline
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  setFullChatList(false);
                }}
                className="text-3xl text-color-one   hover:bg-color-one hover:text-white
                   rounded-full p-0.5"
              />
            )}
            <div className=" w-full    flex items-center justify-between   ">
              <div
                // onClick={() => {
                //   setIsMessageOpen(!isMessageOpen);
                //   setFullChatList(false);
                //   setIsChatOpen(false);
                // }}
                className="font-medium  text-lg  w-full pr-4 text-color-one   "
              >
                <input
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setFullChatList(true);
                    setIsChatOpen(false);
                  }}
                  className="w-full px-5 outline outline-1 cursor-text py-0.5 outline-gray-300  rounded-l-full rounded-r-full"
                  type="search"
                  name=""
                  id=""
                />
              </div>

              <h4
                onClick={() => {
                  setIsChatOpen(false);
                  setFullChatList(!fullChatList);
                }}
                className="   "
              >
                {isMessageOpen && (
                  <LuMailPlus
                    size={"2rem"}
                    className="gradient-two   text-color-one   border rounded    p-0.5 font-bold  border-color-one"
                  />
                )}
              </h4>
            </div>
          </div>

          <div className="">
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
          <div className="space-y-3 overflow-y-auto h-[calc(100%-4rem)] cursor-default  relative overflow-x-hidden">
            {isChatOpen ? (
              <div className="relative pb-5 ">
                <ChatBox
                  setNewMessage={setNewMessage}
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
                      // console.log(chat, "all chat mapppppppppppppp");
                      const otherUser = chat.participants.find(
                        (person) => person._id != userData._id
                      );
                      console.log(otherUser);
                      return (
                        chat.lastMessage && (
                          <div
                            key={chat._id}
                            className="flex items-center px-4 cursor-pointer   hover:bg-gray-100   h-[80px]"
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
                  : userInput.length > 1
                  ? searchUsers?.users?.map((people) => {
                      const otherUser = people;

                      return (
                        <div
                          key={people._id}
                          className="flex items-center px-4 cursor-pointer  border-b  hover:bg-gray-100   h-[80px]"
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
                    })
                  : [...followingUsers.data, ...followers.data].map(
                      (people) => {
                        const otherUser =
                          typeof people.profile === "object"
                            ? people.profile
                            : people.follower;
                        console.log(otherUser);

                        return (
                          <div
                            key={people._id}
                            className="flex items-center px-4 cursor-pointer  border-b  hover:bg-gray-100   h-[80px]"
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
                      }
                    )}

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
    </>
  );
};

export default MessagingModal;
