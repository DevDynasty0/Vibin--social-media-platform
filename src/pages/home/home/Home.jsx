import AddNewPostCard from "../componnents/AddNewPostCard";
import PostCard from "../componnents/PostCard";

const Home = () => {
  return (
    <section className="max-w-[600px] mx-auto mt-16 ">
      <AddNewPostCard />
      <div className="mt-5 grid grid-cols-1 gap-5">
        <PostCard
          userName="Tasfin Ahmed"
          userProfile="https://i.ibb.co/ZTF5Q6y/smiling-young-man-with-crossed-arms-outdoors-1140-255.jpg"
          postTime="1h"
          caption="No one understands my crazy like my friends."
          img="https://i.ibb.co/qnYcG2L/happy-friends-standing-row-road-hitchhiking-23-2147874720.jpg"
        />
        <PostCard
          userName="Muntaha Tanha"
          userProfile="https://i.ibb.co/0jcbcHr/side-view-young-female-enjoying-view-23-2148375063.jpg"
          postTime="1d"
          caption="Time is a limited resouce..."
          img="https://i.ibb.co/cJPT11f/rear-view-asian-woman-walking-along-street-grayscale-53876-14046.jpg"
        />
        <PostCard
          userName="Hriddhi Eshita"
          userProfile="https://i.ibb.co/HTyfPZ0/portrait-woman-holding-vinyl-disc-23-2148432082.jpg"
          postTime="1d"
          caption="Feeling the warmth of the sun's rays."
          img="https://i.ibb.co/WGSH0jS/woman-seaside-with-headphones-23-2148574867.jpg"
        />
      </div>
    </section>
  );
};

export default Home;
