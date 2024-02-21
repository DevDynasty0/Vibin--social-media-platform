



import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useDeletePostMutation,
  useLikeMutation,
  useSavePostMutation,
  useSharePostMutation,
} from "../../../redux/features/post/postApi";
import ShowComments from "./ShowComments";
import { useParams } from "react-router-dom";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useSelector } from "react-redux";

const PostCard = ({ post, currentUser,postOwner}) => {
  const {
    // user,
    likes,
    shares,
    comments,
    caption,
    postContent,
    createdAt,
    contentType,
  } = post || {};
  const user=postOwner? postOwner : post.user;
  
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [sharePost] = useSharePostMutation();
  const isLiked = likes?.indexOf(currentUser?.email);
  // console.log("is liked", isLiked);
  const getPostAge = moment(createdAt).fromNow();
  const [like] = useLikeMutation();
  const [createNotification] = useCreateNotificationMutation()

  const userData = useSelector((state) => state.auth.user);
  console.log('post....',post);

  const onLikeHandler = (postId, userId) => {
    like({ postId, userId });

    // if like then send notification
    if (isLiked < 0) {

      const data = {
        postId: postId,
        receiverId: user._id,
        senderId: userData?._id,
        message: `${userData?.fullName} liked your post.`,
        contentType: "postLike"
      }
      const emitData = {
        ...data,
        isRead: false,
        senderId: { senderId: userData?._id, avatar: userData?.avatar }
      }

      // store data on database
      createNotification(data)

      // send notification to reciever 
      socket.emit("new notification", emitData)
    }
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
              <FaEllipsis className="text-2xl"/>
            </MenuButton>
            <MenuList>
              <MenuItem><button onClick={handleSavePost}>Save post</button></MenuItem>
              <MenuItem> <button onClick={handleDeletePost }>Delete</button> </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <p className="mt-2 w-[90%]  text-xl">{caption}</p>
      </div>
      {postContent && contentType == "image" && (
        <img
          className=" w-[90%]  mx-auto"
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
        <span className="text-sm md:text-[16px] ">
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
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
      <div className="mt-2  pb-4 md:w-[90%] w-[96%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-2 cursor-pointer ">
          {isLiked !== -1 ? (
            <AiFillLike
              onClick={() => onLikeHandler(post._id, id)}
              className="text-2xl text-color-one "
            />
          ) : (
            <AiOutlineLike
              onClick={() => onLikeHandler(post._id, id)}
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
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
        >
          <PiShareFatThin className="md:text-2xl text-md" />
          <p className="text-sm md:text-[16px] ">Share</p>
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