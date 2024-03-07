import { GoComment } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";
import { FaEllipsis } from "react-icons/fa6";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { useRef, useState } from "react";
import {
  useAddReactionMutation,
  useCreatePostMutation,
  useDeletePostMutation,
} from "../../../redux/features/post/postApi";
import ShowComments from "./ShowComments";
import reactionsMap from "../../../utils/reactionsMap";
import { CiHeart } from "react-icons/ci";
import Reactions from "./Reactions";
const SharePostCard = ({ post, currentUser }) => {
  const {
    post: sharedPostData,
    reactions,
    shares,
    comments,
    createdAt,
    user,
  } = post || {};
  const [addReaction] = useAddReactionMutation();
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [showComment, setShowComment] = useState(false);
  const isLiked = reactions?.find(
    (reaction) => reaction.user._id === currentUser?._id
  );
  const toast = useToast();
  const toastIdRef = useRef();

  const getPostAge = moment(sharedPostData?.createdAt).fromNow();
  const getSharedPostAge = moment(createdAt).fromNow();
  const [isShowReactions, setIsShowReactions] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (isHover) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(isHover);
      }, delay);
    };
  };
  const onHandleReaction = debounce(setIsShowReactions, 500);

  const react = (e, post, reaction) => {
    e.stopPropagation();
    addReaction({ post, type: reaction });
    setIsShowReactions(false);
  };

  const mostReaction = reactionsMap(reactions);

  const onHandleSharePost = async () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    const newPost = {
      post: sharedPostData._id,
      postId: post._id,
      userId: user._id,
      user: currentUser._id,
      type: "shared",
    };

    await createPost(newPost);

    toastIdRef.current = toast({
      duration: 1500,
      render: () => (
        <Box
          color="black"
          bg="white"
          p={1}
          className="shadow-md rounded-md text-center w-44"
        >
          You shared this post.
        </Box>
      ),
    });
  };

  const handleDeletePost = () => {
    deletePost({ postId: post._id, userId: post.user._id });
  };

  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4">
      <div className="  w-[90%] mx-auto pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />
            <h4 className="font-bold">{user?.fullName}</h4>
            <p>{getSharedPostAge}</p>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuList minWidth="120px" className="ml-auto">
              {currentUser.email === user?.email && (
                <MenuItem>
                  <div onClick={handleDeletePost}>Delete</div>{" "}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
        <div className="border bg-white my-6 shadow-sm rounded min-h-36 flex flex-col justify-between gap-4">
          <div className="  w-[90%] mx-auto pt-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={sharedPostData?.user?.avatar}
                  alt=""
                />
                <h4 className="font-bold">{sharedPostData?.user?.fullName}</h4>
                <p>{getPostAge}</p>
              </div>
            </div>
            <p className="mt-2 w-[90%]  text-md">{sharedPostData?.caption}</p>
          </div>
          {sharedPostData?.postContent &&
            sharedPostData.contentType == "image" && (
              <img
                className=" w-[90%] mx-auto h-[300px] md:h-[450px]"
                src={sharedPostData.postContent}
                alt=""
              />
            )}
          {sharedPostData?.postContent &&
            sharedPostData.contentType == "video" && (
              <video
                src={sharedPostData.postContent}
                width="320"
                height="240"
                autoPlay
                loop
                muted
                controls
                className="mt-2 w-full h-[300px] md:h-[450px]"
              >
                Your browser does not support the video tag.
              </video>
            )}
        </div>
        <div className="flex justify-between w-[90%] mx-auto">
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
        <div className="mt-2 relative pb-4 w-[90%] mx-auto flex items-center justify-between">
          {isShowReactions && (
            <Reactions
              key={post._id}
              post={post}
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
              <button onClick={(e) => react(e, post)}>
                {isLiked.type === "love" && <span>❤️ Love</span>}
                {isLiked.type === "unlike" && <span>👎 Unlike</span>}
                {isLiked.type === "funny" && <span>🤣 Funny</span>}
                {isLiked.type === "vibe boost" && <span>⚡ Vibe Boost</span>}
                {isLiked.type === "awkward" && <span>😬 Awkward</span>}
              </button>
            ) : (
              <button
                onClick={(e) => react(e, post, "love")}
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
              <GoComment className="md:text-2xl text-md" />
            </button>
            <p className="text-sm md:text-[16px]">Comment</p>
          </div>
          <div
            onClick={onHandleSharePost}
            className="flex items-center gap-1 md:gap-2"
          >
            <PiShareFatThin className="md:text-2xl text-md" />
            <p className="text-sm md:text-[16px]">Share</p>
          </div>
        </div>
      </div>
      <hr />
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
export default SharePostCard;
