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

  const { user } = useAuthCheck();
  console.log(user, "__________afafafaff");

  const [blockedUsers, setBlockUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/settings/getblockUsers/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setBlockUsers(data.data));
  }, [user]);

  console.log(blockedUsers);
  // .................//
  const userEmail = useSelector((state) => state.auth.user.email);

  const [userSetting, setUserSetting] = useState({
    posts: false,
    likes: false,
    comments: false,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/settings/getSetting/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setUserSetting(data);
        console.log(data, "anfalkjfal;'kjfa");
      });
  }, [userEmail]);

  // .................//

  // const { register, handleSubmit } = useForm();

  // const onSubmit = (data) => {
  //   // console.log(userSetting, "User settings state");
  //   console.log("Notification values", {
  //     posts: data.posts,
  //     likes: data.likes,
  //     comments: data.comments,
  //   });
  // };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // console.log(userSetting);
    const data = {
      userEmail: userEmail,
      ...userSetting,
    };
    fetch(`http://localhost:8000/api/v1/settings/update/${userEmail}`, {
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
    <div className=" mt-10  max-w-4xl mx-auto">
      {/* <div>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div> */}

      <div className="mt-10">
        <Accordion allowMultiple>
          {/* notification */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  className="text-xl font-semibold flex gap-2"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <IoMdNotifications className="mt-1" /> Notification
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel className="text-medium font-semibold">
              <form onSubmit={handleNotificationSubmit}>
                <div className="flex flex-col gap-4">
                  <FormControl className=" flex gap-4 items-center">
                    <Switch
                      id="posts"
                      isChecked={userSetting.posts}
                      onChange={() =>
                        setUserSetting({
                          ...userSetting,
                          posts: !userSetting.posts,
                        })
                      }
                      // colorScheme="purple"
                      // trackColor={{ true: "#904486", false: "#edf2f7" }}
                    />
                    <FormLabel htmlFor="posts" mb="0">
                      Turn off notification for posts
                    </FormLabel>
                  </FormControl>

                  <FormControl className=" flex gap-4 items-center">
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
                    <FormLabel htmlFor="likes" mb="0">
                      Turn off notification for likes
                    </FormLabel>
                  </FormControl>

                  <FormControl className=" flex gap-4 items-center">
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
                    <FormLabel htmlFor="comments" mb="0">
                      Turn off notification for comments
                    </FormLabel>
                  </FormControl>
                </div>
                <button
                  className="mt-4 bg-color-one text-white font-medium px-3 py-1 shadow rounded"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </AccordionPanel>
          </AccordionItem>

          {/* block */}
          <AccordionItem className="mt-2">
            <h2>
              <AccordionButton>
                <Box
                  className="text-xl font-semibold flex gap-2"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <ImBlocked className="mt-1" /> Blocklist
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel className="text-medium font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard> */}
                {blockedUsers.map((blockedUser) => (
                  <BlockedFriendCard
                    key={blockedUser._id}
                    blockedUser={blockedUser}
                  ></BlockedFriendCard>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>

          {/* privacy */}
          <AccordionItem className="mt-2">
            <h2>
              <AccordionButton>
                <Box
                  className="text-xl font-semibold flex gap-2"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <MdAccountCircle className="mt-1" />
                  Account Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel className="text-medium font-semibold">
              {/* ......... */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      className="text-xl font-semibold"
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      Account Privacy
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <div>
                    <ChangePassword></ChangePassword>
                  </div>
                </AccordionPanel>
              </AccordionItem>
              {/* ......... */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Settings;
