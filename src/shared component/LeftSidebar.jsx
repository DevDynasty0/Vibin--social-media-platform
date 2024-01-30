import LeftButton from "./LeftButton";
import { FaUser, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import avatar from "../assets/images/avatar.png";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col  h-[calc(100vh-56px)]  relative">
      <div className="flex items-center border-b pb-4 justify-between">
        <a href="/" className="flex items-center  gap-3  ">
          <img
            src={user?.avatar ? user.avatar : avatar}
            className="h-8"
            alt="Vibin' user"
          />
          <span className="self-center font-semibold text-xl tracking-wide whitespace-nowrap  text-gray-800">
            {user?.fullName}{" "}
          </span>
        </a>
        {/* <SearchButton /> */}
      </div>

      <div className="mt-10 h-full  ">
        <LeftButton name={"Home"} path={"home"} icon={FaHome} />
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
