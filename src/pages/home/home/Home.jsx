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
import AllPosts from "../../../shared component/AllPosts";

const Home = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    refetch: postsRefetch,
  } = useGetPostsQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="w-full max-w-[600px] mx-auto">
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
      <AllPosts
        posts={posts}
        postsRefetch={postsRefetch}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />{" "}
    </section>
  );
};

export default Home;
