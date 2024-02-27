import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../../assets/images/avatar.png";
import cover from '../../../assets/images/coverdefault.png'
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { useUnfollowUserMutation } from "../../../redux/features/user/settingApi";
import { Link } from "react-router-dom";
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
    fetch(`http://localhost:8000/api/v1/settings/blockUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  console.log('userfriends',user);

  return (
    <div className="">
  
<div
    className="max-w-2xl mx-4 h-96 w-10/12 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-1 bg-white shadow-xl rounded-lg text-gray-900">
<Link  to ={`/profile/${user?.profile?._id}`}><div>
<div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src={user?.profile?.coverImage
 ? user?.profile?.coverImage
 : cover} alt='Mountain'></img>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32"  src={user?.profile?.avatar ? user?.profile?.avatar : avatar} alt='Woman looking front'></img>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{user?.profile?.fullName}</h2>
        <p className="text-gray-500">{user?.profile?.bio || "Let's Vibe"}</p>
    </div>
</div></Link>
    
    <div className="p-4 border-t mx-8 mt-2 flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap  gap-3">
        <button onClick={handleUnfollow} className="xl:w-1/2 w-full  mx-auto rounded-full bg-color-one hover:shadow-lg font-semibold text-white px-2 py-2">Unfollow</button>
        <button onClick={handleBlock} className="xl:w-1/2 w-full  mx-auto rounded-full bg-white border-2 border-color-one hover:shadow-lg font-semibold text-black px-2 py-2">Block</button>
            
    </div>
</div>
    </div>
    // <div classNameName="border p-2 flex items-center gap-3  rounded shadow-md">
          
    //   <div classNameName="w-[120px] shrink-0">
    //     <img
    //       classNameName="w-full rounded"
    //       src={user?.profile?.avatar ? user?.profile?.avatar : avatar}
    //       alt=""
    //     />
    //   </div>
    //   <div classNameName="flex-1">
    //     <h5 classNameName="font-semibold text-xl">{user?.profile?.fullName}</h5>
    //     <div classNameName="mt-3 flex gap-2 justify-between">
    //       <Menu placement="top">
    //         <BsMessenger size="1.5rem"/>
    //         <MenuButton>
    //           <BsThreeDotsVertical size="1.5rem" classNameName="cursor-pointer" />
    //         </MenuButton>
    //         <MenuList>
    //           <MenuItem onClick={handleUnfollow}>Unfollow</MenuItem>
    //           <MenuItem onClick={handleBlock}>Block</MenuItem>
    //         </MenuList>
    //       </Menu>
    //     </div>

    //   </div>
    // </div>
  );
};

export default AlreadyFriendCard;
