import { useGetPostsQuery } from "../../../redux/features/post/postApi";
import AddNewPostCard from "../componnents/AddNewPostCard";
import { MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import AddNewPostModal from "../componnents/AddNewPostModal";
import { useState } from "react";
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

  const MenuItems = () => {
    return (
      <MenuList>
        <MenuItem>Save post</MenuItem>
        <MenuItem>Share</MenuItem>
      </MenuList>
    );
  };

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
        MenuItems={MenuItems}
        posts={posts}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </section>
  );
};

export default Home;
