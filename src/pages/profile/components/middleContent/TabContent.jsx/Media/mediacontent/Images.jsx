import React from "react";

const Images = ({ reversedPosts }) => {
  // Check if there are any image posts
  const hasImages = reversedPosts.some(
    (singlePost) => singlePost.contentType === "image" && singlePost.postContent
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {reversedPosts.map((singlePost, index) =>
          singlePost.contentType === "image" && singlePost.postContent ? (
            <div className="p-2 rounded-xl shadow-md" key={index}>
              <img
                className="mr-1 bg-white w-full"
                src={singlePost.postContent}
                alt={`media-${index}`}
              />
            </div>
          ) : null // Render nothing for non-image posts
        )}
        {/* Render the message only if there are no image posts */}
        {!hasImages && (
          <div className="col-span-3">
            <p className="text-center">No photos uploaded yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
