import React from 'react';

const Videos = ({ reversedPosts }) => {
    console.log('post',reversedPosts);
  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {reversedPosts && reversedPosts.map((singlePost, index) => (
          singlePost.contentType === "video" && singlePost.postContent ? (
            <div className=' p-2 rounded-xl shadow-md bg-white' key={index}>
              <video className='mr-1 bg-white w-full' controls>
                <source src={singlePost.postContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div key={index} style={{ display: "none" }}></div>
          )
        ))}
      </div>
    </div>
  );
};

export default Videos;
