import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import avatar from "../assets/images/user-profile.webp";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout({ userId: user?._id });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center overflow-scroll">
      <div className=" border-b pb-4 px-2 w-full">
        <NavLink
          to={`/profile/${user?._id}`}
          className="flex items-center  gap-3  "
        >
          <img
            src={user?.avatar ? user.avatar : avatar}
            className="h-10 "
            alt="user"
          />
          <span className="self-center font-semibold text-xl tracking-wide text-wrap text-gray-800">
            {user?.fullName}{" "}
          </span>
        </NavLink>
        {/* <SearchButton /> */}
      </div>

      <div className="mt-10  w-full ">
        <LeftButton name={"Home"} path={"/"} icon={FaHome} />

        <LeftButton
          name={"Profile"}
          path={`/profile/${user?._id}`}
          icon={FaUser}
        />

        {/* <LeftButton
          name={"Notifications"}
          path={"notifications"}
          icon={FaBell}
        /> */}
        <LeftButton name={"Friends"} path={"friends"} icon={FaUserFriends} />
        <LeftButton name={"Settings"} path={"settings"} icon={FaCog} />
        <LeftButton name={"Saved Posts"} path="/savePost" icon={FaBookmark} />
      </div>

      <div
        // onClick={handleLogout}
        // className="flex flex-col absolute w-full  bottom-[48px]"
        className="w-full mt-auto   "
      >
        <hr />
        <LeftButton name={"Dashboard"} icon={MdDashboard} path={"/admin"} />
        <hr />
        <div onClick={(e) => handleLogout(e)}>
          <LeftButton name={"Logout"} icon={MdLogout} />
        </div>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;
