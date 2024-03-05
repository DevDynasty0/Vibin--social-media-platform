import { useState } from "react";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "../../../redux/features/post/postApi";
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import moment from "moment";
import { FaEllipsis } from "react-icons/fa6";

const Comment = ({ comment, post, currentUser }) => {
  const [editCommentMode, setEditCommentMode] = useState(false); // Track if edit mode is enabled for comment
  const [editedComment, setEditedComment] = useState({
    content: "",
    commentId: "",
  });
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useEditCommentMutation();
  const onCommentDelete = (commentId) => {
    deleteComment({
      commentId: commentId,
      postId: post._id,
      userId: post.user._id,
    });
    setEditCommentMode(false);
  };

  const onCommentEdit = (commentId, existingComment) => {
    setEditCommentMode((prev) => !prev); // Enable edit mode for this comment
    setEditedComment({ ...editedComment, content: existingComment, commentId }); // Set the current comment as the edited comment
  };

  const onCommentUpdateHandler = () => {
    editComment({ ...editedComment, postId: post._id });
    setEditCommentMode(false);
  };

  const onCUpdateEnterKeyHandler = (e) => {
    if (e.key === "Enter") {
      editComment({ ...editedComment, postId: post._id });
      setEditCommentMode(false);
    }
  };

  return (
    <div key={comment._id}>
      <div className="flex md:gap-5 gap-1 items-start mb-2">
        <Image
          borderRadius="full"
          // boxSize="35px"
          className=" w-8 h-8 md:w-15 md:h-15"
          src={comment.user.avatar}
          alt={comment.user.fullName}
        />

        <div className="w-full bg-gray-100 rounded-md md:p-3 p-1">
          <div className="flex justify-between items-center">
            <div className="flex  items-center justify-start gap-1 md:gap-4">
              <p className="font-bold text-[10px] md:text-[15px]">
                {comment.user.fullName}
              </p>
              <p className="text-[7px] md:text-[12px]">
                {moment(comment.updatedAt).fromNow()}
              </p>
            </div>
            {currentUser?._id === comment?.user?._id ||
            currentUser?._id === post?.user?._id ? (
              <div>
                <Menu>
                  <MenuButton>
                    <FaEllipsis className="md:text-md text-sm " />
                  </MenuButton>
                  {/* Post action bar */}
                  <MenuList minWidth="120px">
                    <MenuItem
                      className=""
                      onClick={() => onCommentDelete(comment._id)}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem
                      className=""
                      onClick={() =>
                        onCommentEdit(comment._id, comment.comment)
                      }
                    >
                      {editCommentMode &&
                      editedComment.commentId === comment._id
                        ? "Discard edit"
                        : "Edit"}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : null}
          </div>
          {editCommentMode &&
          currentUser?._id === comment?.user?._id &&
          editedComment.commentId === comment._id ? (
            <InputGroup size="md">
              <Input
                value={editedComment.content}
                onKeyDown={(e) => onCUpdateEnterKeyHandler(e)}
                onChange={(e) =>
                  setEditedComment({
                    content: e.target.value,
                    commentId: comment._id,
                  })
                }
                placeholder="Edit your comment"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  bg="#904486"
                  textColor="white"
                  onClick={onCommentUpdateHandler}
                >
                  Save
                </Button>
              </InputRightElement>
            </InputGroup>
          ) : (
            <p className="mt-2 text-sm md:text-md ">{comment.comment}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
