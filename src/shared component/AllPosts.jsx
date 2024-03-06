///////
import PostCard from "../pages/home/componnents/PostCard";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SharePostCard from "../pages/home/componnents/SharePostCard";

import nodatafound from "../assets/images/No data-cuate.png";

const AllPosts = ({ posts = [], isSuccess, isLoading }) => {
  const currentUser = useSelector((state) => state.auth.user);
  let content;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center items-center h-52">
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    if (posts.length === 0) {
      content = (
        <div className="flex items-center justify-center flex-col">
          <img className="w-96" src={nodatafound} alt="" />
          <p className=" text-center font-bold">No posts ...!</p>
        </div>
      );
    } else {
      content = posts.map((post) => {
        if (post?.type === "shared") {
          return (
            <SharePostCard
              key={post._id}
              currentUser={currentUser}
              post={post}
            />
          );
        } else {
          return (
            <PostCard key={post._id} post={post} currentUser={currentUser} />
          );
        }
      });
    }
  }
  return <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>;
};

export default AllPosts;
