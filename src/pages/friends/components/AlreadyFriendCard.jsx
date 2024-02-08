import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../../assets/images/avatar.png";
import {  Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { useUnfollowUserMutation } from "../../../redux/features/user/settingApi";
const AlreadyFriendCard = ({ user }) => {

  const { user: currentUser } = useAuthCheck();

  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollow = async () => {
    const data = {
      follower : currentUser._id,
      profile : user.profile._id
     };
     const res = await unfollowUser(data);
     console.log(res.data.data, "Ninja data");
  }

  const handleBlock = () => {
    const data = {
      blockedPerson : user.profile._id,
      blockedBy : currentUser._id

    };
      fetch(
      `http://localhost:8000/api/v1/settings/blockUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    .then(res => res.json())
    .then(data => console.log(data))
  };

  return (
    <div className="border p-2 flex flex-col gap-3 cursor-pointer rounded relative">
      <img
        className="w-full h-[200px]"
        src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
        alt=""
      />
      <h5 className="font-semibold text-xl px-2">{user?.profile?.fullName}</h5>
      <div className="flex justify-between px-2">
        {/* <BiBlock size="1.5rem" />
        <LuUserX2 size="1.5rem" /> */}
        <BsMessenger size="1.5rem" />
        <Menu placement="top">
  <MenuButton>
  <BsThreeDotsVertical size="1.5rem" />
  </MenuButton>
  <MenuList >
    <MenuItem onClick={handleUnfollow}>Unfollow</MenuItem>
    <MenuItem onClick={handleBlock}>Block</MenuItem>
  </MenuList>
</Menu>
      </div>
    </div>
  );
};

export default AlreadyFriendCard;
