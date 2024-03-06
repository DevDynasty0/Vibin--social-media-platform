import { Spinner } from "@chakra-ui/react";
import { useGetTrendingPostsQuery } from "../../redux/features/post/postApi";
import nodatafound from "../../assets/images/No data-cuate.png";
import SharePostCard from "../home/componnents/SharePostCard";
import { useSelector } from "react-redux";
import PostCard from "../home/componnents/PostCard";

const Trending = () => {
  const { data, isLoading, isError } = useGetTrendingPostsQuery();
  const currentUser = useSelector((state) => state.auth.user);

  let content;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    content = <span className="text-color-one">Ops, Were lacking here!</span>;
  }

  if (data?.length === 0) {
    content = (
      <div className="flex items-center justify-center flex-col">
        <img className="w-96" src={nodatafound} alt="" />
        <p className=" text-center font-bold">No trending ...!</p>
      </div>
    );
  }

  if (data?.length) {
    content = data?.map((post) => {
      if (post.type === "shared") {
        return (
          <SharePostCard key={post._id} currentUser={currentUser} post={post} />
        );
      } else {
        return (
          <PostCard key={post._id} post={post} currentUser={currentUser} />
        );
      }
    });
  }

  return <div className="max-w-[1200px] mx-4">{content}</div>;
};

export default Trending;
