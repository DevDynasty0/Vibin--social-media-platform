import { Link } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import { useFollowUserMutation } from "../../../redux/features/user/userApi";
const FriendRequestCard = ({ user }) => {
  // console.log("user___", user);
  // console.log('frifoooooo', user?.follower?._id);
  const [followUser] = useFollowUserMutation();

  const handleFollow = async () => {
    const profile = user?.follower?._id; //person
    const follower = user?.profile; //ami

    const res = await followUser({ profile, follower });

    console.log(res);
  };

  return (
    <div className="py-8 px-8  mx-auto bg-white   rounded-xl shadow-md  sm:py-4 sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full">
      <Link to={`/profile/${user?.follower?._id}`}>
        {" "}
        <img
          className="block mx-auto h-24 rounded-full cursor-pointer sm:mx-0 sm:shrink-0"
          src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
          alt="Woman's Face"
        ></img>
      </Link>
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">
            {user?.follower?.fullName}
          </p>
          <p className="text-slate-500 font-medium">
            {user?.follower?.bio || "Let's Connect"}
          </p>
        </div>
        <button
          className="px-4 py-1 text-sm text-white bg-gradient-to-l from-pink-50 via-color-one  to-color-one font-semibold rounded-full   hover:text-black hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={handleFollow}
        >
          {" "}
          Follow Back
        </button>
      </div>
    </div>
    // <div classNameName="   rounded p-2 shadow-md border">
    //   <div classNameName="">
    //     <img
    //       classNameName="w-32 rounded-full h-32"
    //       src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
    //       alt=""
    //     />
    //   </div>
    //   <div classNameName="mt-5">
    //     <h5 classNameName="font-semibold text-xl">{user?.follower?.fullName}</h5>
    //     <div classNameName="mt-3 flex gap-2">
    //       <button classNameName="bg-color-one   px-2 py-1 rounded text-white">
    //         Follow Back
    //       </button>
    //       {/* <button classNameName="border   border-color-one px-2 py-1 rounded shadow">
    //         Decline
    //       </button> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default FriendRequestCard;
