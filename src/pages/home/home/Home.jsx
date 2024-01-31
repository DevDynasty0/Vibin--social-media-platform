import { Spinner } from "@chakra-ui/react";
import {
  useGetPostsQuery,
  useLikeMutation,
} from "../../../redux/features/post/postApi";
import AddNewPostCard from "../componnents/AddNewPostCard";
import PostCard from "../componnents/PostCard";
import avatar from "../../../assets/images/avatar.png";
import { useSelector } from "react-redux";

const Home = () => {
  const { data: posts, isLoading, isSuccess } = useGetPostsQuery();
  const user = useSelector((state) => state.auth.user);
  const [like] = useLikeMutation();

  const likeHandler = (postId, email) => {
    like({ postId, email: { email } });
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
    content = posts.map((post) => (
      <PostCard
        key={post._id}
        userName={post.user.name}
        userProfile={post.user.avatar || avatar}
        postTime="1d"
        likes={post.likes}
        onLikeHandler={() => likeHandler(post._id, user.email)}
        caption={post.post}
        img={post.postImage}
        user={user}
      />
    ));
  }

  return (
    <section className="max-w-[600px] mx-auto mt-16 ">
      <AddNewPostCard />
      <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>
    </section>
  );
};

export default Home;
