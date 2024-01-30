import { BsMessenger } from "react-icons/bs";
import { BiBlock } from "react-icons/bi";
import { LuUserX2 } from "react-icons/lu";
import avatar from "../../../assets/images/avatar.png";
const AlreadyFriendCard = ({ user }) => {
  return (
    <div className="border p-2 flex flex-col gap-3 cursor-pointer rounded">
      <img
        className="w-full h-[200px]"
        src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
        alt=""
      />
      <h5 className="font-semibold text-xl px-2">{user?.profile?.fullName}</h5>
      <div className="flex justify-between px-2">
        <BiBlock size="1.5rem" />
        <LuUserX2 size="1.5rem" />
        <BsMessenger size="1.5rem" />
      </div>
    </div>
  );
};

export default AlreadyFriendCard;
