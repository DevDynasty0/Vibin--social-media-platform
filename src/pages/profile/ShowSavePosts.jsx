
import { useSelector } from "react-redux";

import PostCard from "../home/componnents/PostCard";
import { useGetSavePostQuery } from "../../redux/features/post/postApi";
import { FaBookmark } from "react-icons/fa";
const ShowSavePosts = () => {
    
  const { data:savePostsData } = useGetSavePostQuery();
 
  const userData = useSelector((state) => state.auth.user);
 



  return (
    <div className="w-full max-w-[70%] mx-auto ">
       {savePostsData && savePostsData.length > 0 ?( savePostsData.map(post =>(
        
        <PostCard  key={post._id} post={post.post} postOwner={post.postOwner} currentUser={userData}></PostCard>
      ))):(
       <div className=" flex-col  flex items-center justify-center text-center mt-[30%]"> <FaBookmark className="text-white text-6xl  "></FaBookmark>
       <p className="text-xl text-gray-400 font-bold">No posts found</p>
       <p>When you save a post, it will appear here </p>
       </div>
        )}
    </div>
  );
};

export default ShowSavePosts;