import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton } from "@chakra-ui/react";
import { BiShare } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostCard = ({ post, currentUser, onLikeHandler, MenuItems }) => {
  const { user, realUser, likes, caption, postContent, createdAt, contentType } =
    post || {};
  const isLiked = likes?.indexOf(currentUser?.email);
  const getPostAge = moment(createdAt).fromNow();

  return (
    <div className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-10">
      <div className=" px-4 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${user._id}`}>
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt=""
              />
            </Link>

            <Link to={`/profile/${user._id}`}>
              <h4 className="font-bold">{user?.fullName}</h4>
            </Link>
            <p>{getPostAge}</p>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuItems />
          </Menu>
        </div>
        <p className="mt-2 text-xl">{caption}</p>
      </div>
      {postContent && contentType == "image" && (
        <img
          className="mt-2 w-full h-[300px] md:h-[450px]"
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
          className="mt-2 w-full h-[300px] md:h-[450px]"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="mt-2 px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLiked !== -1 ? (
            <AiFillLike
              onClick={onLikeHandler}
              className="text-2xl text-color-one"
            />
          ) : (
            <AiOutlineLike onClick={onLikeHandler} className="text-2xl" />
          )}
          <GoComment className="text-2xl" />
        </div>
        <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span>
        <BiShare className="text-2xl" />
      </div>
    </div>
  );
};

export default PostCard;
