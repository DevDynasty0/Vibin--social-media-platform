import { useDeletePostMutation, useGetPostsQuery, useSavePostMutation } from "../../../redux/features/post/postApi";
import AddNewPostCard from "../componnents/AddNewPostCard";
import { useDisclosure } from "@chakra-ui/react";
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
console.log(posts,"posts_______________________________________");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const[deletePost]=useDeletePostMutation();
  // const[savePost]=useSavePostMutation();
  const MenuItems = ({postId}) => {
    const handleDeletePost = () => {
      deletePost({ postId });
      console.log('postttttttid',postId);
    };
    // const handleSavePost=()=>{
    //   savePost({postId});

<<<<<<< HEAD
    // }
    return (
      <MenuList>
        <MenuItem><button  onClick={handleSavePost}>Save post</button></MenuItem>
        <MenuItem><button  onClick={handleDeletePost}>Delete</button></MenuItem>
        <MenuItem>Edit</MenuItem>
        {/* <MenuItem>Share</MenuItem> */}
      </MenuList>
    );
  };

=======
>>>>>>> bf412f0a260c2540380007874c136b384ee56638
  return (
    <section className="w-full max-w-[70%] mx-auto">
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
      <AllPosts posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
    </section>
  );
};

export default Home;
