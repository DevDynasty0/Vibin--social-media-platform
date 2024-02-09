import React from 'react';

const Images = ({reversedPosts}) => {
    
    return (
        <div>
            <div className='grid grid-cols-3 gap-4'>
        {reversedPosts && reversedPosts.map((singlePost, index) => (
          singlePost.contentType === "image" && singlePost.postContent ?(
            <div className=' p-2 rounded-xl shadow-md' key={index}>
              <img className='mr-1 bg-white w-full' src={singlePost.postContent} alt={`media-${index}`} />
            </div>
          ) : (
            <div key={index} style={{ display: "none" }}></div>
          )
          
        ))}
      </div> 
        </div>
    );
};

export default Images;