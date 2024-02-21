import React from "react";

const Videos = ({ reversedPosts }) => {
  // Check if there are any video posts
  const hasVideos = reversedPosts.some(
    (singlePost) => singlePost.contentType === "video" && singlePost.postContent
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {reversedPosts.map((singlePost, index) =>
          singlePost.contentType === "video" && singlePost.postContent ? (
            <div className="p-2 rounded-xl shadow-md bg-white" key={index}>
              <video className="mr-1 bg-white w-full" controls>
                <source src={singlePost.postContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : null // Render nothing for non-video posts
        )}
        {/* Render the message only if there are no video posts */}
        {!hasVideos && (
          <div className="col-span-3">
            <p className="text-center">No videos uploaded yet!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
