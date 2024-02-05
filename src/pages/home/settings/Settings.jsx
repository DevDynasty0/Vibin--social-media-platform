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
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ChangePassword from "./components/changePassword";

const Settings = () => {
  const [getPostNotifications, setPostNotifications] = useState(true);

  const [getLikeNotifications, setLikeNotifications] = useState(true);

  const [getCommentNotifications, setCommentNotifications] = useState(true);


  // .................//
  const userEmail = useSelector((state)=> state.auth.user.email);
  const [userSetting, setUserSetting] = useState({});
  
  useEffect(()=> {
   fetch(`http://localhost:8000/api/v1/settings/getSetting/${userEmail}`)
    .then(res => res.json())
    .then(data => {
      setUserSetting(data)
    })
  },[userEmail])
  
  console.log(userSetting);
  
  // .................//

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Notification values", {
      posts: data.posts,
      likes: data.likes,
      comments: data.comments,
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
