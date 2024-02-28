import { FaEllipsis } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import {
  useAddReactionMutation,
  useDeletePostMutation,
  useSavePostMutation,
  useSharePostMutation,
} from "../../../redux/features/post/postApi";
import ShowComments from "./ShowComments";
import Reactions from "./Reactions";
import reactionsMap from "../../../utils/reactionsMap";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useSelector } from "react-redux";
import useSocket from "../../../hooks/useSocket";

const PostCard = ({ post, currentUser, postOwner }) => {
  const {
    reactions,
    shares,
    comments,
    caption,
    postContent,
    createdAt,
    contentType,
  } = post || {};
  const user = postOwner ? postOwner : post.user;
  const [showComment, setShowComment] = useState(false);
  const [isShowReactions, setIsShowReactions] = useState(false);
  const [sharePost] = useSharePostMutation();
  const isLiked = reactions?.find(
    (reaction) => reaction.user._id === currentUser?._id
  );
  const getPostAge = moment(createdAt).fromNow();
  const [addReaction] = useAddReactionMutation();
  const [createNotification] = useCreateNotificationMutation();

  const userData = useSelector((state) => state.auth.user);
  const loggedInUser = userData?.email;
  const [isPostSaved, setIsPostSaved] = useState(false);
  const { socket } = useSocket();

  const [deletePost] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();

  const debounce = (func, delay) => {
    let timeoutId;
    return function (isHover) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(isHover);
      }, delay);
    };
  };

  const handleDeletePost = () => {
    deletePost({ postId: post._id });
  };

  const handleSavePost = () => {
    const newSavePost = {
      postContent: post.postContent,
      post: post?._id,
      postOwner: user._id,
      user: userData._id,
      // contentType: "savePost"
    };
    savePost(newSavePost);
    setIsPostSaved(true);
  };

  const onHandleReaction = debounce(setIsShowReactions, 500);
  const react = (e, postId, reaction) => {
    e.stopPropagation();
    addReaction({ postId, type: reaction });
    setIsShowReactions(false);
    // if like then send notification
    if (!isLiked) {
      const data = {
        postId: postId,
        receiverId: user._id,
        senderId: userData?._id,
        message: `${userData?.fullName} liked your post.`,
        contentType: "postLike",
      };
      const emitData = {
        ...data,
        isRead: false,
        senderId: { senderId: userData?._id, avatar: userData?.avatar },
      };

      // store data on database
      createNotification(data);

      // send notification to reciever
      socket.emit("new notification", emitData);
    }
  };

  const mostReaction = reactionsMap(reactions);

  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4  ">
      <div className="  w-[90%]  mx-auto pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />

            <h4 className="font-bold">{user?.fullName}</h4>
            <p>{getPostAge}</p>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuList minWidth="120px" className="ml-auto">
              {loggedInUser != user?.email && (
                <MenuItem className="">
                  {" "}
                  <div onClick={isPostSaved ? null : handleSavePost}>
                    {isPostSaved ? "Saved" : "Save post"}
                  </div>
                </MenuItem>
              )}
              {loggedInUser == user?.email && (
                <MenuItem>
                  {" "}
                  <div onClick={handleDeletePost}>Delete</div>{" "}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
        <p className="mt-2 w-[90%]  text-md">{caption}</p>
      </div>

      {postContent && contentType == "image" && (
        <img className=" w-[90%]  mx-auto" src={postContent} alt="" />
      )}
      {postContent && contentType == "video" && (
        <video
          src={postContent}
          width="320"
          height="240"
          autoPlay
          loop
          muted
          controls
          className="md:mt-2 w-[90%] mx-auto h-[300px] md:h-[450px]"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="flex text-[8px] sm:text-sm md:text-md justify-between items-center w-[90%] mx-auto">
        {reactions?.length > 0 ? (
          <div className="flex items-center">
            <div className="flex space-x-[-5px] md:space-x-[-7px]">
              <span className="bg-gray-50 rounded-full p-[2px] z-20">
                {mostReaction[0][0]}
              </span>
              {mostReaction[1] && (
                <span className="bg-gray-50 rounded-full p-[2px] z-10">
                  {mostReaction[1][0]}
                </span>
              )}
              {mostReaction[2] && (
                <span className="bg-gray-50 rounded-full p-[2px]">
                  {mostReaction[2][0]}
                </span>
              )}
            </div>
            <span className="ml-[2px] md:ml-2">
              {reactions?.length > 5 && isLiked
                ? `You and ${reactions.length - 1} others`
                : reactions?.length > 5 && !isLiked
                ? `${reactions[reactions.length - 1].user.fullName} and ${
                    reactions.length - 1
                  } others`
                : reactions?.length}
            </span>
          </div>
        ) : (
          <span></span>
        )}
        <div className="flex items-center gap-2 md:gap-5">
          <p>
            <span className="mr-1">
              {comments}
              {comments === 1 ? " Comment" : " Comments"}
            </span>
          </p>
          <span>
            {shares} {shares === 1 ? " Share" : " Shares"}
          </span>
        </div>
      </div>
      <div className="mt-2 relative pb-4 md:w-[90%] w-[96%] mx-auto flex items-center justify-between">
        {isShowReactions && (
          <Reactions
            postId={post._id}
            react={react}
            isLiked={isLiked}
            onHandleReaction={onHandleReaction}
          />
        )}
        <div
          onMouseOver={() => onHandleReaction(true)}
          onMouseLeave={() => onHandleReaction(false)}
          onMouseDown={() => onHandleReaction(true)}
          className="flex items-center gap-1 md:gap-2"
        >
          {isLiked ? (
            <button onClick={(e) => react(e, post._id)}>
              {isLiked.type === "love" && <span>❤️ Love</span>}
              {isLiked.type === "unlike" && <span>👎 Unlike</span>}
              {isLiked.type === "funny" && <span>🤣 Funny</span>}
              {isLiked.type === "vibe boost" && <span>⚡ Vibe Boost</span>}
              {isLiked.type === "awkward" && <span>😬 Awkward</span>}
            </button>
          ) : (
            <button
              onClick={(e) => react(e, post._id, "love")}
              className="flex justify-center items-center space-x-1"
            >
              <CiHeart className="text-2xl" />
              <span>Love</span>
            </button>
          )}
        </div>
        <div
          onClick={() => setShowComment((c) => !c)}
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
        >
          <button className=" cursor-pointer">
            {" "}
            <GoComment className="md:text-2xl text-md" />
          </button>
          <p className="text-sm md:text-[16px]">Comment</p>
        </div>

        <div
          onClick={() => sharePost({ postId: post._id })}
          className="flex items-center gap-1 md:gap-2"
        >
          <PiShareFatThin className="md:text-2xl text-md" />
          <p className="text-sm md:text-[16px]">Share</p>
        </div>
      </div>
      <hr />
      {/* post comment */}
      {showComment && (
        <ShowComments
          post={post}
          showComment={showComment}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default PostCard;
