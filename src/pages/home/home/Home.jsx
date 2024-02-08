import { MenuItem, Spinner } from "@chakra-ui/react";
import {
  useGetPostsQuery,
  useLikeMutation,
} from "../../../redux/features/post/postApi";
import AddNewPostCard from "../componnents/AddNewPostCard";
import PostCard from "../componnents/PostCard";
import avatar from "../../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import AddNewPostModal from "../componnents/AddNewPostModal";
import { useRef, useState } from "react";

const Home = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    refetch: postsRefetch,
  } = useGetPostsQuery();
  const user = useSelector((state) => state.auth.user);
  const [like] = useLikeMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const likeHandler = (postId) => {
    like({ postId });
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
        postTime={post.createdAt}
        likes={post.likes}
        onLikeHandler={() => likeHandler(post._id)}
        caption={post.post || post.caption}
        img={post.postContent}
        user={user}
      >
        <MenuItem>Save post</MenuItem>
        <MenuItem>Share</MenuItem>
      </PostCard>
    ));
  }

  return (
    <section className="max-w-[600px] mx-auto mt-16 ">
      <AddNewPostCard
        caption={caption}
        setCaption={setCaption}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <AddNewPostModal
        postsRefetch={postsRefetch}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        caption={caption}
        setCaption={setCaption}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <div className="mt-5 grid grid-cols-1 gap-5">{content}</div>
    </section>
  );
};

export default Home;
