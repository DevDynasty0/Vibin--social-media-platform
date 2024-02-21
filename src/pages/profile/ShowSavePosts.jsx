
import { useSelector } from "react-redux";

import PostCard from "../home/componnents/PostCard";
import { useGetSavePostQuery } from "../../redux/features/post/postApi";

const ShowSavePosts = () => {
    
  const { data:savePostsData } = useGetSavePostQuery();
 
  const userData = useSelector((state) => state.auth.user);
 



  return (
    <div className="w-full max-w-[70%] mx-auto">
      {savePostsData && savePostsData.map(post =>(
        
        <PostCard  key={post._id} post={post.post} postOwner={post.postOwner} currentUser={userData}></PostCard>
      ))}
    </div>
  );
};

export default ShowSavePosts;