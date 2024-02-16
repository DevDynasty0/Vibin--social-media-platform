import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
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
      </div>

      <div
        // onClick={handleLogout}
        // className="flex flex-col absolute w-full  bottom-[48px]"
        className="w-full mt-auto"
      >
        <hr />
        <LeftButton name={"Dashboard"} icon={MdDashboard} path={"/admin"} />
        <hr />
        <div onClick={handleLogout}>
          <LeftButton
            onHandleClick={handleLogout}
            name={"Logout"}
            icon={MdLogout}
          />
        </div>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

export default LeftSidebar;
