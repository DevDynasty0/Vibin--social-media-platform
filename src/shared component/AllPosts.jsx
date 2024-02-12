import PostCard from "../pages/home/componnents/PostCard";
import { Spinner } from "@chakra-ui/react";
import { useLikeMutation } from "../redux/features/post/postApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AllPosts = ({ posts, isSuccess, isLoading, MenuItems }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [like] = useLikeMutation();

  const likeHandler = (postId, userId) => {
    like({ postId, userId });
  };

  let content;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && isSuccess) {
    content = posts?.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        onLikeHandler={() => likeHandler(post._id, id)}
        currentUser={currentUser}
        MenuItems={MenuItems}
      ></PostCard>
    ));
  }

  return <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>;
};

export default AllPosts;
