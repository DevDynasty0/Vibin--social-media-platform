import React from "react";
import nomedia from '../../../../../../../assets/images/no media.png'
const Images = ({ reversedPosts }) => {
  // Check if reversedPosts is defined and not null
  
  // Filter image posts
  const imagePosts = reversedPosts?.filter(
    (singlePost) =>
      singlePost?.contentType === "image" && singlePost.postContent
  );
  if (!reversedPosts || imagePosts?.length === 0) {
    return <div className="flex flex-col justify-center items-center">
<img src={nomedia} className="  w-72 h-64" alt="" />
      <p className="font-bold text-center">No photos uploaded yet!</p>
    </div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {imagePosts.map((singlePost, index) => (
          <div className=" p-2 rounded-xl shadow-md" key={index}>
            <img
              className="mr-1 bg-white w-full"
              src={singlePost.postContent}
              alt={`media-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
