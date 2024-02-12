import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import moment from "moment";
import {
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Menu,
  MenuButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useSharePostMutation,
} from "../../../redux/features/post/postApi";

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
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [sharePost] = useSharePostMutation();
  const { data: commentsDetails } = useGetCommentsQuery(
    {
      postId: post._id,
    },
    { skip: !showComment }
  );
  const isLiked = likes?.indexOf(currentUser?.email);
  const getPostAge = moment(createdAt).fromNow();

  const onCommentHandler = () => {
    createComment({ comment, user: user._id, postId: post._id });
    setComment("");
  };

  console.log("This is from postCard", shares);

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
            {post.postType && post.postType === "post" && (
              <MenuItems></MenuItems>
            )}
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
          className="mt-2 w-full h-[300px] md:h-[450px]"
        >
          Your browser does not support the video tag.
        </video>
      )}

      <div className="flex justify-between w-[90%] mx-auto">
        <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span>
        <div className="flex gap-5">
          <p>
            <span className="mr-1">{comments}</span>
            {comments === 1 ? "Comment" : "Comments"}
          </p>
          <span>
            {shares} {shares === 1 ? "Share" : "Shares"}
          </span>
        </div>
      </div>
      <div className="mt-2  pb-4 w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLiked !== -1 ? (
            <AiFillLike
              onClick={onLikeHandler}
              className="text-2xl text-color-one"
            />
          ) : (
            <AiOutlineLike onClick={onLikeHandler} className="text-2xl" />
          )}
          <div>
            <p>Likes</p>
          </div>
          {/* <GoComment className="text-2xl" /> */}
        </div>
        {/* <span>
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </span> */}
        <div
          onClick={() => setShowComment((c) => !c)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <button className=" cursor-pointer">
            {" "}
            <GoComment className="text-xl" />
          </button>
          <p>Comment</p>
        </div>

        <div
          onClick={() => sharePost({ postId: post._id })}
          className="flex items-center gap-2"
        >
          <PiShareFatThin className="text-2xl" />
          <p>Share</p>
        </div>
      </div>
      <hr />
      {/* post comment */}
      {showComment && (
        <div className=" px-5 py-3 transition delay-150 duration-300 ease-in-out">
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Enter your comment"
              value={comment}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="2rem"
                size="lg"
                bg="#904486"
                textColor="white"
                marginEnd="3"
                onClick={onCommentHandler}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* show comment */}
          <hr className="mt-3"></hr>
          <div className="w-[90%] mt-4 px-5">
            {commentsDetails?.data?.map((comment) => (
              <div key={comment._id}>
                <div className="flex gap-5  items-start mb-2">
                  <Image
                    borderRadius="full"
                    boxSize="35px"
                    src={comment.user.avatar}
                    alt="Dan Abramov"
                  />

                  <div className="w-full bg-gray-100 rounded-md p-3">
                    <div className="flex items-center justify-start gap-4">
                      <p className="font-bold">{comment.user.fullName}</p>
                      <p className="text-[12px]">
                        {moment(comment.createdAt).fromNow()}
                      </p>
                    </div>
                    <p className="mt-2">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
