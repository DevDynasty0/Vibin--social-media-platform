import { NavLink } from "react-router-dom";
import "./settings.css";

const Settings = () => {

  const settingsMenu = <>

   <li><NavLink>Your account</NavLink></li>
   <li> <NavLink>Privacy</NavLink></li>
   <li> <NavLink>Notification</NavLink></li>
   <li> <NavLink>Posts</NavLink></li>
   <li> <NavLink>Blocking</NavLink></li>
   <li> <NavLink>Followers</NavLink></li>
   <li> <NavLink>Dark Mode</NavLink></li>
   <li> <NavLink>Help Center</NavLink></li>

  </>

  return (
    <div>
      <section className="mt-2">
        {/* main div */}
        <div className="flex gap-4">
          {/* settings route */}
          <div className="w-[40%]">
            <h1 className="text-2xl font-semibold">Settings</h1>

            <div className="  w-full mt-4  flex gap-2 items-center  pointer-events-none">
              {" "}
              <input
                className="px-2 py-1 rounded-r-full rounded-l-full hover:cursor-text shadow drop-shadow text-black focus:cursor-text w-full border-2"
                type="text"
                placeholder="Search..."
              />
              <svg
                className="w-4 h-4 -ml-10 z-10 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <div className="mt-4 overflow-y-scroll max-h-[100vh]">
                <ul className="space-y-4 text-xl font-semibold settings-menu">
                    {settingsMenu}
                </ul>
            </div>

          </div>
          {/* settings route */}

          {/* setting information */}
          <div className="w-[60%]">
            <h1>This is information page</h1>
          </div>
          {/* setting information */}
        </div>
        {/* main div */}
      </section>
    </div>
  );
};

export default Settings;
