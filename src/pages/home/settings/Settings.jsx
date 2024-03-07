import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { ImBlocked } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import BlockedFriendCard from "./components/BlockedFriendCard";
// import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ChangePassword from "./components/changePassword";
import useAuthCheck from "../../../hooks/useAuthCheck";



const Settings = () => {
  // const [getPostNotifications, setPostNotifications] = useState(true);

  // const [getLikeNotifications, setLikeNotifications] = useState(true);

  // const [getCommentNotifications, setCommentNotifications] = useState(true);

  // const { user } = useAuthCheck();
  const currentUser = useSelector((state) => state.auth.user);
 
  // console.log(user, "__________afafafaff");

  const [blockedUsers, setBlockUsers] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch(`https://vibin-c5r0.onrender.com/api/v1/settings/getblockUsers/${currentUser?._id}`)
      .then((res) => res.json())
      .then((data) => setBlockUsers(data.data));
  }, [currentUser, reload]);

  console.log(blockedUsers);
  // .................//
  const userEmail = useSelector((state) => state?.auth?.user?.email);

  const [userSetting, setUserSetting] = useState({
    posts: false,
    likes: false,
    comments: false,
  });

  useEffect(() => {
    fetch(`https://vibin-c5r0.onrender.com/api/v1/settings/getSetting/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setUserSetting(data);
        console.log(data, "anfalkjfal;'kjfa");
      });
  }, [userEmail]);

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // console.log(userSetting);
    const data = {
      userEmail: userEmail,
      ...userSetting,
    };
    fetch(`https://vibin-c5r0.onrender.com/api/v1/settings/update/${userEmail}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1 className="text-2xl font-bold p-2">Settings</h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 p-2">
        <div className="flex-1">
          <h1 className="text-xl font-semibold shadow-md p-2 rounded">
            Account
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <img
                className="w-[70px] h-[70px] rounded-full"
                src={currentUser?.avatar}
                alt=""
              />
            </div>

            <div>
              <h1>{currentUser?.fullName}</h1>
              <p>{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* notification */}
        <div className="flex-1">
          <div>
            <form onSubmit={handleNotificationSubmit}>
              <h3 className="text-xl font-semibold shadow-md p-2 rounded">
                Preferences
              </h3>
              <div className="mt-5 flex flex-col gap-4 p-2">
                <FormControl className=" flex gap-4 items-center justify-between">
                  <FormLabel htmlFor="posts" mb="0">
                    <h3 className="text-xl font-medium">
                      Turn off notification for posts
                    </h3>
                    <p className="mt-2">
                      Turn off if you do not want to get notification for posts
                    </p>
                  </FormLabel>
                  <Switch
                    id="posts"
                    isChecked={userSetting.posts}
                    onChange={() =>
                      setUserSetting({
                        ...userSetting,
                        posts: !userSetting.posts,
                      })
                    }
                  />
                </FormControl>

                <FormControl className=" flex gap-4 items-center justify-between">
                  <FormLabel htmlFor="likes" mb="0">
                    <h3 className="text-xl font-medium">
                      Turn off notification for likes
                    </h3>
                    <p className="mt-2">
                      Please turn off if you do not want to get notification for
                      likes
                    </p>
                  </FormLabel>
                  <Switch
                    id="likes"
                    isChecked={userSetting.likes}
                    onChange={() =>
                      setUserSetting({
                        ...userSetting,
                        likes: !userSetting.likes,
                      })
                    }
                  />
                </FormControl>

                <FormControl className=" flex gap-4 items-center justify-between">
                  <FormLabel htmlFor="comments" mb="0">
                    <h3 className="text-xl font-medium">
                      Turn off notification for comments
                    </h3>
                    <p className="mt-2">
                      Please turn off if you do not want to get notification for
                      comments
                    </p>
                  </FormLabel>
                  <Switch
                    id="comments"
                    isChecked={userSetting.comments}
                    onChange={() =>
                      setUserSetting({
                        ...userSetting,
                        comments: !userSetting.comments,
                      })
                    }
                  />
                </FormControl>
              </div>
              <button
                className="mx-2 mt-4 bg-color-one text-white font-medium px-3 py-1 shadow rounded hover:bg-zinc-600"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        {/* notification */}
      </div>

      {/* Block list */}
      <div className="mt-7">
        <h3 className="text-2xl font-semibold shadow-md p-2 rounded">
          Blocklist
        </h3>
        <div className="mt-5 px-2">
          {blockedUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockedUsers.map((blockedUser) => (
                <BlockedFriendCard
                  key={blockedUser._id}
                  blockedUser={blockedUser}
                  setReload ={setReload}
                ></BlockedFriendCard>
              ))}
            </div>
          ) : (
            <p className="text-xl">No have no blocked users</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;