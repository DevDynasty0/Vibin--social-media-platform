import React from "react";

const Videos = ({ reversedPosts }) => {
  // Check if reversedPosts is defined and not null
  if (!reversedPosts || reversedPosts.length === 0) {
    return <p>No videos uploaded yet!</p>;
  }

  // Filter video posts
  const videoPosts = reversedPosts.filter(
    (singlePost) =>
      singlePost.contentType === "video" && singlePost.postContent
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {videoPosts.map((singlePost, index) => (
          <div className=" p-2 rounded-xl shadow-md bg-white" key={index}>
            <video className="mr-1 bg-white w-full" controls>
              <source src={singlePost.postContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
