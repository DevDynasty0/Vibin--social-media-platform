import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../../../redux/features/post/postApi";
import Comment from "./Comment";

const ShowComments = ({ post, showComment, currentUser }) => {
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();

  const { data: commentsDetails } = useGetCommentsQuery(
    {
      postId: post._id,
    },
    { skip: !showComment }
  );

  const onCommentHandler = () => {
    createComment({ comment, user: currentUser._id, postId: post._id });
    setComment("");
  };

  const onSetCommentHandler = (e) => {
    setComment(e.target.value);
    if (e.key === "Enter") {
      createComment({ comment, user: currentUser._id, postId: post._id });
      setComment("");
    }
  };

  return (
    <div className=" px-5 py-3 transition delay-150 duration-300 ease-in-out">
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          onKeyDown={(e) => onSetCommentHandler(e)}
          onChange={(e) => onSetCommentHandler(e)}
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
      <div className="md:w-[90%] w-full mt-4 md:px-5 px-1">
        {commentsDetails?.data?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            post={post}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowComments;
