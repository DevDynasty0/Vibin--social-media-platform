import PostCard from "../pages/home/componnents/PostCard";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SharePostCard from "../pages/home/componnents/SharePostCard";
import SavePosts from "../pages/profile/components/middleContent/TabContent.jsx/SavePosts";
import ShowSavePosts from "../pages/profile/ShowSavePosts";


const AllPosts = ({
  posts,
  isSuccess,
  isLoading,
  //  MenuItems
}) => {
  const currentUser = useSelector((state) => state.auth.user);
console.log('allpost',posts);
  let content;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && isSuccess) {
    content = posts?.map((post) => {
      if (post?.post) {
        return (
          <>
          <SharePostCard key={post._id} currentUser={currentUser} post={post} />
          {/* <ShowSavePosts key={post._id} post={post} ></ShowSavePosts> */}
          </>
        );
      }
      return (
        <PostCard
          key={post._id}
          post={post}
          currentUser={currentUser}
        ></PostCard>
      );
    });
  }

  return <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>;
};

export default AllPosts;
