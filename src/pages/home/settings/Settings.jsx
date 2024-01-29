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
import { useState } from "react";
import BlockedFriendCard from "./components/BlockedFriendCard";
import { useForm } from "react-hook-form";

const Settings = () => {
  const [getPostNotifications, setPostNotifications] = useState(false);

  const [getLikeNotifications, setLikeNotifications] = useState(false);

  const [getCommentNotifications, setCommentNotifications] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Notification values", {
      posts: data.posts,
      likes: data.likes,
      comments: data.comments,
    });
  };

  const handlePasswordChange = (data) => {
    console.log("Password field data", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="mt-12">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <FormControl className=" flex gap-4 items-center">
                    <Switch
                      {...register("posts")}
                      id="posts"
                      isChecked={getPostNotifications}
                      onChange={() =>
                        setPostNotifications(!getPostNotifications)
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
                      {...register("likes")}
                      id="likes"
                      isChecked={getLikeNotifications}
                      onChange={() =>
                        setLikeNotifications(!getLikeNotifications)
                      }
                    />
                    <FormLabel htmlFor="likes" mb="0">
                      Turn off notification for likes
                    </FormLabel>
                  </FormControl>

                  <FormControl className=" flex gap-4 items-center">
                    <Switch
                      {...register("comments")}
                      id="comments"
                      isChecked={getCommentNotifications}
                      onChange={() =>
                        setCommentNotifications(!getCommentNotifications)
                      }
                    />
                    <FormLabel htmlFor="comments" mb="0">
                      Turn off notification for comments
                    </FormLabel>
                  </FormControl>
                </div>
                <button
                  className="mt-4 font-medium px-3 py-1 shadow rounded"
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
                <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard>
                <BlockedFriendCard></BlockedFriendCard>
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
                    <form onSubmit={handleSubmit(handlePasswordChange)}>
                      <div>
                        <h1 className="font-medium">
                          Change Password
                        </h1>

                        <div className="flex gap-4">
                          {/* Old Password */}
                          <div className="relative my-2 w-[90%] md:w-[35%]">
                            <input
                              required
                              id="oldPassword"
                              aria-label="Old Password"
                              className="block rounded-t-lg px-2 pb-2 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                              type="password"
                              {...register("oldPassword", { required: true })}
                              placeholder=" "
                            />
                            <label
                              htmlFor="oldPassword"
                              className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                              Old Password
                            </label>
                          </div>

                          {/* New Password */}
                          <div className="relative my-2 w-[90%] md:w-[35%]">
                            <input
                              required
                              id="newPassword"
                              aria-label="New Password"
                              className="block rounded-t-lg px-2 pb-2 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                              type="password"
                              {...register("newPassword", { required: true })}
                              placeholder=" "
                            />
                            <label
                              htmlFor="newPassword"
                              className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                              New Password
                            </label>
                          </div>
                        </div>

                        {/* Add a button to submit the form */}
                        <button
                          className="mt-1 font-medium px-3 py-1 shadow rounded"
                          type="submit"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
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
