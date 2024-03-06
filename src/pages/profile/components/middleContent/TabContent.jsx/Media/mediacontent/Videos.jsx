
import nomedia from '../../../../../../../assets/images/no media.png'
const Videos = ({ reversedPosts }) => {
  

  // Filter video posts
  const videoPosts = reversedPosts?.filter(
    (singlePost) =>
      singlePost?.contentType === "video" && singlePost?.postContent
    
  );
  if (!reversedPosts || videoPosts?.length === 0) {
    return  <div className="flex flex-col justify-center items-center">
    <img src={nomedia} className="  w-72 h-64" alt="" />
          <p className="font-bold text-center">No videos uploaded yet!</p>
        </div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {videoPosts.map((singlePost, index) => (
          <div className=" p-2 rounded-xl shadow-md h-[200px]" key={index}>
            <video className=" bg-white w-full rounded-xl  h-full object-cover" controls>
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
