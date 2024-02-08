import FeedCard from "./FeedCard";

export default function FeedCards({myPost,user,reversedPosts}) {
  // const postData = {
  //   userName: "ismail hosen",
  //   userProfile: "",
  //   postTime: "",
  //   caption: "",
  //   img: "",
  // };

  return (
    <div className="flex flex-col gap-4">
       {reversedPosts && reversedPosts.map((singlePost, index) => (
          <div key={index}>
           
            <FeedCard singlePost={singlePost} index={index} user={user}  />
          </div>
        ))}
     
      
    </div>
  );
}
