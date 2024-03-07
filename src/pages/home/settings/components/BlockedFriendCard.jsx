import { useSelector } from "react-redux";
import defaultAvatar from "../../../../assets/images/avatar.png";
import useAuthCheck from "../../../../hooks/useAuthCheck";
import getAccessToken from "../../../../utils/getAccessToken";

const BlockedFriendCard = ({ blockedUser, setReload }) => {
  const user = useSelector((state) => state?.auth?.user);
  const token = getAccessToken();

  const handleUnBlock = () => {
    const data = {
      blockedPerson: blockedUser?.blockedPerson?._id,
      blockedBy: user?._id,
    };
    fetch(`https://vibin-c5r0.onrender.com/api/v1/settings/unBlockUser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.data.deletedCount
          ) {
            setReload((pre) => !pre );
          }
      } );
  };

  // console.log(blockedUser.blockedPerson);
  return (
    <div className="flex items-center gap-4 ">
      <img
        className="w-[80px] h-[80px] rounded"
        src={blockedUser?.blockedPerson?.avatar || defaultAvatar}
        alt=""
      />

      <div className="space-y-2">
        <h3 className="font-medium text-xl">
          {blockedUser?.blockedPerson?.fullName}
        </h3>
        <button
          onClick={handleUnBlock}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Unblock
        </button>
      </div>
    </div>
  );
};

export default BlockedFriendCard;
