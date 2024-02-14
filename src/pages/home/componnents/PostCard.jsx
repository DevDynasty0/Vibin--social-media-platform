import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton } from "@chakra-ui/react";
import { useState } from "react";
import { useSharePostMutation } from "../../../redux/features/post/postApi";
import ShowComments from "./ShowComments";

const PostCard = ({ post, currentUser, onLikeHandler, MenuItems }) => {
  const {
    user,
    likes,
    shares,
    comments,
    caption,
    postContent,
    createdAt,
    contentType,
  } = post || {};
  const [showComment, setShowComment] = useState(false);
  const [sharePost] = useSharePostMutation();
  const isLiked = likes?.indexOf(currentUser?.email);
  const getPostAge = moment(createdAt).fromNow();

  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4">
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
            {/* Post action bar */}

            <MenuItems></MenuItems>
          </Menu>
        </div>
        <p className="mt-2 w-[90%]  text-xl">{caption}</p>
      </div>
      {postContent && contentType == "image" && (
        <img
          className=" w-[90%] mx-auto h-[300px] md:h-[450px]"
          src={postContent}
          alt=""
        />
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
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span>
        <div className="flex items-center gap-2 md:gap-5">
          <p>
            <span className="mr-1 text-sm md:text-[16px]">{comments}
            {comments === 1 ? " Comment" : " Comments"}</span>
          </p>
          <span className="text-sm md:text-[16px]">
            {shares} {shares === 1 ? " Share" : " Shares"}
          </span>
        </div>
      </div>
      <div className="mt-2  pb-4 md:w-[90%] w-[96%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-2">
          {isLiked !== -1 ? (
            <AiFillLike
              onClick={onLikeHandler}
              className="text-2xl text-color-one"
            />
          ) : (
            <AiOutlineLike onClick={onLikeHandler} className="md:text-2xl text-md" />
          )}
          <div>
            <p className="text-sm md:text-[16px]">Likes</p>
          </div>
        </div>
        <div
          onClick={() => setShowComment((c) => !c)}
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
        >
          <button className=" cursor-pointer">
            {" "}
            <GoComment className="md:text-2xl text-md"  />
          </button>
          <p className="text-sm md:text-[16px]">Comment</p>
        </div>

        <div
          onClick={() => sharePost({ postId: post._id })}
          className="flex items-center gap-1 md:gap-2"
        >
          <PiShareFatThin className="md:text-2xl text-md"  />
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
