import { useParams } from "react-router-dom";
import { useDeletePostMutation, useGetSavePostQuery, useLikeMutation, useSavePostMutation, useSharePostMutation } from "../../redux/features/post/postApi";
import { useState } from "react";
import moment from "moment";
import { useCreateNotificationMutation } from "../../redux/features/notification/notificationApi";
import { useSelector } from "react-redux";
import ShowComments from "../home/componnents/ShowComments";
import { PiShareFatThin } from "react-icons/pi";
import React from "react";
import PostCard from "../home/componnents/PostCard";

const ShowSavePosts = () => {
    
  const { data:savePostsData } = useGetSavePostQuery();
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [sharePost] = useSharePostMutation();
  const userData = useSelector((state) => state.auth.user);
  const [deletePost] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();
  const [like] = useLikeMutation();
  const [createNotification] = useCreateNotificationMutation();

//   const handleDeletePost = (postId) => {
//     deletePost({ postId });
//     console.log('postttttttid', postId);
//   }

//   const handleSavePost = (postId) => {
//     const newSavePost = {
//       postContent: postId.postContent,
//       post: postId._id,
//       user: userData._id,
//     }
//     savePost(newSavePost);
//     console.log('newsave post', newSavePost);
//     console.log('post save successfully', postId._id, postId.user._id)
//   }

//   const onLikeHandler = (postId, userId) => {
//     like({ postId, userId });
//     const data = {
//       postId: postId,
//       receiverId: postId.user._id,
//       senderId: userData._id,
//       message: `${userData.fullName} liked your post.`,
//       contentType: "postLike"
//     }
//     createNotification(data)
//   };
console.log('data',savePostsData);
// console.log(data[1]?.post.caption);

  return (
    <div>
      {savePostsData && savePostsData.map(post =>(
        // <div key={post._id} className="border bg-white mt-2 shadow-md rounded min-h-36 flex flex-col justify-between gap-4">
        //   <div className="w-[90%] mx-auto pt-4">
        //     <div className="flex justify-between items-center">
        //       <div className="flex gap-2 items-center">
        //         <img className="w-10 h-10 rounded-full" src={post?.user?.avatar} alt="" />
        //         <h4 className="font-bold">{post?.postOwner?.fullName}</h4>
        //         <p>{moment(post?.createdAt).fromNow()}</p>
        //       </div>
        //     </div>
        //     <p className="mt-2 w-[90%]  text-xl">{post?.caption}</p>
        //   </div>
        //   {post?.postContent && post?.contentType === "image" && (
        //     <img
        //       className="w-[90%]  mx-auto"
        //       src={post?.postContent}
        //       alt=""
        //     />
        //   )}
        //   {post?.postContent && post?.contentType === "video" && (
        //     <video
        //       src={post?.postContent}
        //       width="320"
        //       height="240"
        //       autoPlay
        //       loop
        //       muted
        //       controls
        //       className="md:mt-2 w-[90%] mx-auto h-[300px] md:h-[450px]"
        //     >
        //       Your browser does not support the video tag.
        //     </video>
        //   )}

        //   {/* <div className="flex justify-between items-center w-[90%] mx-auto">
        //     <span className="text-sm md:text-[16px]">
        //       {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        //     </span>
        //     <div className="flex items-center gap-2 md:gap-5">
        //       <p>
        //         <span className="mr-1 text-sm md:text-[16px]">
        //           {post.comments}
        //           {post.comments === 1 ? " Comment" : " Comments"}
        //         </span>
        //       </p>
        //       <span className="text-sm md:text-[16px]">
        //         {post.shares} {post.shares === 1 ? " Share" : " Shares"}
        //       </span>
        //     </div>
        //   </div> */}
        //   {/* <div className="mt-2  pb-4 md:w-[90%] w-[96%] mx-auto flex items-center justify-between">
        //     <div className="flex items-center gap-1 md:gap-2">
        //       {isLiked !== -1 ? (
        //         <AiFillLike
        //           onClick={() => onLikeHandler(data.post._id, id)}
        //           className="text-2xl text-color-one"
        //         />
        //       ) : (
        //         <AiOutlineLike
        //           onClick={() => onLikeHandler(data.post._id, id)}
        //           className="text-2xl"
        //         />
        //       )}
        //       <div>
        //         <p>Like</p>
        //       </div>
        //     </div>
        //     <div
        //       onClick={() => setShowComment((c) => !c)}
        //       className="flex items-center gap-1 md:gap-2 cursor-pointer"
        //     >
        //       <button className=" cursor-pointer">
        //         {" "}
        //         <GoComment className="md:text-2xl text-md" />
        //       </button>
        //       <p className="text-sm md:text-[16px]">Comment</p>
        //     </div>
    
        //     <div
        //       onClick={() => sharePost({ postId: post._id })}
        //       className="flex items-center gap-1 md:gap-2"
        //     >
        //       <PiShareFatThin
        //        className="md:text-2xl text-md" />
        //       <p className="text-sm md:text-[16px]">Share</p>
        //     </div>
        //   </div> */}
        //   <hr />
        //   {/* post comment */}
        //   {/* {showComment && (
        //     <ShowComments
        //       post={post}
        //       showComment={showComment}
        //       currentUser={currentUser}
        //     />
        //   )} */}
        // </div>
        <PostCard key={post._id} post={post.post} postOwner={post.postOwner} currentUser={userData}></PostCard>
      ))}
    </div>
  );
};

export default ShowSavePosts;