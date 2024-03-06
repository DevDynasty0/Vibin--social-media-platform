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
import getAccessToken from "../../../utils/getAccessToken";

const Settings = () => {
  const token = getAccessToken();
  const { user } = useAuthCheck();
  const [blockedUsers, setBlockUsers] = useState([]);

  useEffect(() => {
    fetch(
      `https://vibin-c5r0.onrender.com/api/v1/settings/getblockUsers/${user?._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setBlockUsers(data.data));
  }, [user, token]);

  // console.log(blockedUsers);
  // .................//
  const userEmail = useSelector((state) => state.auth.user?.email);

  const [userSetting, setUserSetting] = useState({
    posts: false,
    likes: false,
    comments: false,
  });

  useEffect(() => {
    fetch(
      `https://vibin-c5r0.onrender.com/api/v1/settings/getSetting/${userEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserSetting(data);
        // console.log(data, "anfalkjfal;'kjfa");
      });
  }, [userEmail, token]);

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // console.log(userSetting);
    const data = {
      userEmail: userEmail,
      ...userSetting,
    };
    fetch(
      `https://vibin-c5r0.onrender.com/api/v1/settings/update/${userEmail}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleNotificationSubmit}>
        <h3 className="text-2xl font-semibold shadow-md p-2 rounded">
          Notifications
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
                Please turn off if you do not want to get notification for likes
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
          className="mx-2 mt-4 bg-color-one text-white font-medium px-3 py-1 shadow rounded"
          type="submit"
        >
          Save
        </button>
      </form>
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
                ></BlockedFriendCard>
              ))}
            </div>
          ) : (
            <p className="text-xl">No have no blocked users</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
