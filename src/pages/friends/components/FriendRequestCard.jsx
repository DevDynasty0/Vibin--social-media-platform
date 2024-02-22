import avatar from "../../../assets/images/avatar.png";
const FriendRequestCard = ({ user }) => {

  return (
    <div className="flex items-center  gap-3 rounded p-2 shadow-md border">
      <div className="w-[120px] shrink-0">
        <img
          className="w-full rounded"
          src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
          alt=""
        />
      </div>
      <div className="flex-1">
        <h5 className="font-semibold text-xl">{user?.follower?.fullName}</h5>
        <div className="mt-3 flex gap-2">
          <button className="bg-color-one   px-2 py-1 rounded text-white">
            Accept
          </button>
          <button className="border   border-color-one px-2 py-1 rounded shadow">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
