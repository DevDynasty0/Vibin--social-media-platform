import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../../assets/images/avatar.png";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { useUnfollowUserMutation } from "../../../redux/features/user/settingApi";
const AlreadyFriendCard = ({ user }) => {
  const { user: currentUser } = useAuthCheck();

  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollow = async () => {
    const data = {
      follower: currentUser._id,
      profile: user.profile._id,
    };
    const res = await unfollowUser(data);
    console.log(res.data.data, "Ninja data");
  };

  const handleBlock = () => {
    const data = {
      blockedPerson: user.profile._id,
      blockedBy: currentUser._id,
    };
    fetch(`https://vibin-c5r0.onrender.com/api/v1/settings/blockUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="border p-2 flex items-center gap-3  rounded shadow-md">

      <div className="w-[120px] shrink-0">
        <img
          className="w-full rounded"
          src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
          alt=""
        />
      </div>
      <div className="flex-1">
        <h5 className="font-semibold text-xl">{user?.profile?.fullName}</h5>
        <div className="mt-3 flex gap-2 justify-between">
          <Menu placement="top">
            <BsMessenger size="1.5rem" />
            <MenuButton>
              <BsThreeDotsVertical size="1.5rem" className="cursor-pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleUnfollow}>Unfollow</MenuItem>
              <MenuItem onClick={handleBlock}>Block</MenuItem>
            </MenuList>
          </Menu>
        </div>

      </div>
    </div>
  );
};

export default AlreadyFriendCard;
