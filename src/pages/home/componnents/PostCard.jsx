import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiOutlineShareAlt, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";

const PostCard = ({
  children,
  userName,
  userProfile,
  postTime,
  caption,
  img,
  onLikeHandler,
  likes,
  user = null,
}) => {

  const isLiked = likes?.indexOf(user.email);

  const getPostAge = moment(postTime).fromNow();

  return (
    <div className="border bg-white mt-2 shadow-md rounded ">
      <div className=" px-4 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img className="w-10 h-10 rounded-full" src={userProfile} alt="" />

            <h4 className="font-bold">{userName}</h4>
            <p>{getPostAge}</p>
          </div>
          <Menu>
            <MenuButton>
              <FaEllipsis className="text-2xl" />
            </MenuButton>
            <MenuList>{children}</MenuList>
          </Menu>
        </div>
        <p className="mt-2 text-xl">{caption}</p>
      </div>
      {img && (
        <img className="mt-2 w-full h-[300px] md:h-[450px]" src={img} alt="" />
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
        <AiOutlineShareAlt className="text-2xl" />
      </div>
    </div>
  );
};

export default PostCard;
