import { useState } from "react";
import AddNewPostCard from "../pages/home/componnents/AddNewPostCard";
import AddNewPostModal from "../pages/home/componnents/AddNewPostModal";
import PostCard from "../pages/home/componnents/PostCard";
import { Spinner } from "@chakra-ui/react";
import { useLikeMutation } from "../redux/features/post/postApi";
import { useSelector } from "react-redux";

const AllPosts = ({ posts, postsRefetch, isSuccess, isLoading }) => {
  const currentUser = useSelector((state) => state.auth.user);
  //   const [like] = useLikeMutation();

  //   const likeHandler = (postId) => {
  //     like({ postId });
  //   };

  let content;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && isSuccess) {
    content = posts.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        // likes={post.likes}
        postsRefetch={postsRefetch}
        currentUser={currentUser}
      ></PostCard>
    ));
  }

  return <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>;
};

export default AllPosts;
