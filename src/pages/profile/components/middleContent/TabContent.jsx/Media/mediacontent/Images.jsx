import React from "react";

const Images = ({ reversedPosts }) => {
  // Check if reversedPosts is defined and not null
  
  // Filter image posts
  const imagePosts = reversedPosts?.filter(
    (singlePost) =>
      singlePost?.contentType === "image" && singlePost.postContent
  );
  if (!reversedPosts || imagePosts?.length === 0) {
    return <p className="font-bold">No photos uploaded yet!</p>;
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
