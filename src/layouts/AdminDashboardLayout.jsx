import { useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { IoBook, IoFileTray } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa";
import "../../src/styles/color.css";
import {
  MdAddReaction,
  MdAdminPanelSettings,
  MdArrowCircleLeft,
  MdArrowCircleRight,
  MdHelpCenter,
  MdLogout,
  MdNotificationAdd,
  MdPeople,
  MdPostAdd,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);

  return (
    <div className=" relative">
      {/*  Header */}

      {/* <!-- gray background--> */}
      <div
        onDoubleClick={() => setOpen(!open)}
        // className="flex-1 flex  relative "
      >
        {/*sidebar arrow for md: */}
        <MdArrowCircleRight
          onClick={() => setOpen(!open)}
          size={"2rem"}
          className="text-gray-500 absolute left-0  lg:hidden"
        />
        {/* left sidebar */}
        <div
          className={`p-2 bg-blue-800
 w-60 flex flex-col   top-0 lg:left-0  fixed  h-full z-50 transition-all duration-300  ${
   open ? "left-0" : "-left-60"
 }  `}
          id="sideNav"
        >
          <div>
            <MdArrowCircleLeft
              onClick={() => setOpen(!open)}
              size={"2rem"}
              color="white"
              className="ml-auto lg:hidden"
            />
          </div>

          <nav>
            <div className="flex gap-2 items-center py-1 px-4 my-2">
              <img
                className="w-[30px] h-[30px] rounded"
                src={user.avatar}
                alt=""
              />
              <h3 className="text-white font-medium text-xl">
                {user.fullName}
              </h3>
            </div>

            <button className="inline-flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white">
              <MdNotificationAdd size={"2rem"} />
              Notification
            </button>

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <MdAdminPanelSettings size={"2rem"} />
              Admin
            </NavLink>

            <NavLink
              to="/admin/suspendedUsers"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <FaUserSlash size={"2rem"} />
              Suspended Users
            </NavLink>

            <NavLink
              to="/interactions"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <MdAddReaction size={"2rem"} />
              Total Interactions
            </NavLink>

            <NavLink
              to="/admin/allUsers"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <IoMdPeople size={"2rem"} />
              All Users
            </NavLink>

            <NavLink
              to="/allPosts"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <IoBook size={"2rem"} />
              All Posts
            </NavLink>

            <NavLink
              to="/helpCenter"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2  py-1 px-4 my-2 rounded transition duration-200 bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                  : "flex items-center gap-2 text-gray-50 py-1 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              }
            >
              <MdHelpCenter size={"2rem"} />
              Help Center Issues
            </NavLink>
          </nav>

          <NavLink
            to="/"
            className="block   py-1 px-4 my-2 rounded transition duration-200 bg-white font-medium  hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white mt-auto "
            href="#"
          >
            Back To Newsfeed{" "}
          </NavLink>
        </div>
        {/* left sidebar */}

        {/* <!-- Área de contenido principal --> */}
        <div className="lg:w-[calc(100%-240px)] p-8 ml-auto ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
