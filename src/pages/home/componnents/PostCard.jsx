import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import {
  useAddReactionMutation,
  useSharePostMutation,
} from "../../../redux/features/post/postApi";
import ShowComments from "./ShowComments";
import Reactions from "./Reactions";

const PostCard = ({ post, currentUser }) => {
  const {
    user,
    reactions,
    shares,
    comments,
    caption,
    postContent,
    createdAt,
    contentType,
  } = post || {};
  const [showComment, setShowComment] = useState(false);
  const [isShowReactions, setIsShowReactions] = useState(false);
  const [sharePost] = useSharePostMutation();
  const isLiked = reactions?.find(
    (reaction) => reaction.user === currentUser?._id
  );
  const getPostAge = moment(createdAt).fromNow();
  const [addReaction] = useAddReactionMutation();
  // const [createNotification] = useCreateNotificationMutation();
  // const userData = useSelector((state) => state.auth.user);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (isHover) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(isHover);
      }, delay);
    };
  };

  const onHandleReaction = debounce(setIsShowReactions, 400);
  console.log("this is from postCard: ", reactions);
  const react = (postId, reaction) => {
    addReaction({ postId, type: reaction });
    // const data = {
    //   postId: postId,
    //   receiverId: user._id,
    //   senderId: userData?._id,
    //   message: `${userData?.fullName} liked your post.`,
    //   contentType: "postLike",
    // };
    // createNotification(data);
    setIsShowReactions(false);
  };

  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4  ">
      <div className="  w-[90%] mx-auto pt-4">
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
            <MenuList>
              <MenuItem>Save post</MenuItem>
              <MenuItem>Share</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <p className="mt-2 w-[90%]  text-xl">{caption}</p>
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

      <div className="flex justify-between items-center w-[90%] mx-auto">
        <span className="text-sm md:text-[16px]">
          {reactions?.length}{" "}
          {reactions?.length === 1 ? "Reaction" : "Reactions"}
        </span>
        <div className="flex items-center gap-2 md:gap-5">
          <p>
            <span className="mr-1 text-sm md:text-[16px]">
              {comments}
              {comments === 1 ? " Comment" : " Comments"}
            </span>
          </p>
          <span className="text-sm md:text-[16px]">
            {shares} {shares === 1 ? " Share" : " Shares"}
          </span>
        </div>
      </div>
      <div className="mt-2 relative pb-4 md:w-[90%] w-[96%] mx-auto flex items-center justify-between">
        {isShowReactions && (
          <Reactions
            postId={post._id}
            react={react}
            onHandleReaction={onHandleReaction}
          />
        )}
        <div
          onMouseEnter={() => onHandleReaction(true)}
          onMouseLeave={() => onHandleReaction(false)}
          className="flex items-center gap-1 md:gap-2"
        >
          {isLiked ? (
            <>
              {isLiked.type === "like" && (
                <AiFillLike
                  onClick={() => react(post._id)}
                  className="text-2xl text-color-one"
                />
              )}
              {isLiked.type === "love" && <span className="text-2xl">❤️</span>}
              {isLiked.type === "haha" && <span className="text-2xl">😆</span>}
              {isLiked.type === "wow" && <span className="text-2xl">😮</span>}
              {isLiked.type === "sad" && <span className="text-2xl">😢</span>}
              {isLiked.type === "angry" && <span className="text-2xl">😡</span>}
            </>
          ) : (
            <AiOutlineLike
              onClick={() => react(post._id, "like")}
              className="text-2xl"
            />
          )}
          <div>
            <p>Like</p>
          </div>
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
