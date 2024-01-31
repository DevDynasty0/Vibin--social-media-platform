import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import avatar from "../assets/images/avatar.png";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const results = await logout();
    if (results?.data?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="h-[calc(100vh-56px)]  relative">
      <div className=" border-b pb-4 px-2 ">
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

      <div className="mt-10 h-full  ">

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

        <div
          onClick={handleLogout}
          className="flex flex-col absolute w-full bottom-[48px]"
        >
          <hr />
          <LeftButton name={"Logout"} icon={MdLogout} />
        </div>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;
