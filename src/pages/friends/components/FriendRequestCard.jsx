import avatar from "../../../assets/images/avatar.png";
const FriendRequestCard = ({ user }) => {
  
  return (
    <div className="border flex flex-col gap-3 rounded p-2">
      <img
        className="w-full h-[200px]"
        src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
        alt=""
      />
      <h5 className="font-semibold text-xl px-2">{user?.follower?.fullName}</h5>
      <div className="px-2 flex justify-between">
        <button className="bg-color-one px-2 py-1 rounded text-white">
          Confirm
        </button>
        <button className="border border-color-one px-2 py-1 rounded shadow">
          Delete
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
