import FeedCard from "./FeedCard";

export default function FeedCards() {
  const postData = {
    userName: "ismail hosen",
    userProfile: "",
    postTime: "",
    caption: "",
    img: "",
  };

  return (
    <div className="flex flex-col gap-4">
      <FeedCard posts={postData} />
      <FeedCard posts={postData} />
      <FeedCard posts={postData} />
    </div>
  );
}
