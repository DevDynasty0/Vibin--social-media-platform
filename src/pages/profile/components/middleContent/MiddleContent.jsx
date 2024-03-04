import { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import About from "./TabContent.jsx/About";

import Media from "./TabContent.jsx/Media/Media";
import AllPosts from "../../../../shared component/AllPosts";
// import {  getFollowingUsers } from "../../../../hooks/getFollowers";
import { useSelector } from "react-redux";
// import { followUser } from "../../../../hooks/followUser";
import { useFollowUserMutation, useGetFollowingUsersQuery } from "../../../../redux/features/user/userApi";
import SavePosts from "./TabContent.jsx/SavePosts";



const MiddleContent = ({
  user,
  refetchUserInfo,
  reversedPosts,
  isSuccess,
  isLoading,
  loggedInUser,
}) => {
  // const [following, setFollowing] = useState([]);
  const userData = useSelector((state) => state.auth.user);
  const [followUser] = useFollowUserMutation()
  const {data,refetch : getFollowingRefetch} = useGetFollowingUsersQuery()
  console.log(data);

  const handleFollow = async (id) => {
    // setFollow([...follow, id]);
    const profile = id;
    const follower = userData?._id
    console.log(follower, "you");
    const res = await followUser({profile, follower});
    getFollowingRefetch()
    refetchUserInfo()
    console.log(res);
    // const data = {
    
    //   receiverId: profile,
    //     senderId: follower,
    //     message: `${userData?.fullName} followed you.`,
    //     contentType: "follow"
    // }
    // createNotification(data)
  };
    
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const followingData = await getFollowingUsers();
  //       setFollowing(followingData);
  //       console.log(user.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const MenuItems = () => {
   
  //   return (
  //     <MenuList>
  //       <MenuItem>Save Post</MenuItem>
  //       {loggedInUser == user.data.email && <MenuItem>Delete</MenuItem>}
  //     </MenuList>
  //   );
  // };
  return (
    <div className=" mt-16">
      {/* Tab items */}
      <div>
        <Tabs className="mx-3 md:mx-0">
          <div className="flex items-center  justify-between">
            <TabList>
              <Tab className="!px-2 md:!px-4 ">Post</Tab>
              {loggedInUser == user.data?.email && (   <Tab className="!px-2 md:!px-4">Saved</Tab>)}
              {/* <Tab className="!px-2 md:!px-4">Likes</Tab> */}
              {/* {loggedInUser == user.data.email && ( */}
                <Tab className="!px-2 md:!px-4">About</Tab>
              {/* )} */}
              {loggedInUser == user.data?.email && (   <Tab className="!px-2 md:!px-4">Media</Tab>)}
            </TabList>
            {loggedInUser !== user.data?.email && (
              <div>
                <button
                 onClick={() => handleFollow(user?.data?._id)}
                className=" bg-color-one md:py-2  py-1 px-1 md:px-6 md:mr-3  rounded-md  text-xs md:text-xl text-white font-bold">

                {data?.data?.find((singleFollowing) => singleFollowing?.profile?._id === user?.data?._id) ? "Following" : "Follow"}
                
                </button>
                
              </div>
            )}
          </div>

          <TabPanels>
            <TabPanel>
              <AllPosts
                isSuccess={isSuccess}
                isLoading={isLoading}
                posts={reversedPosts}
                // MenuItems={MenuItems}
              ></AllPosts>
            </TabPanel>

            {loggedInUser == user.data.email && ( <TabPanel>
             <SavePosts></SavePosts>
            </TabPanel>)}

            {/* {loggedInUser != user.data.email && (<TabPanel>
             <AboutForVisitors user={user} loggedInUser={loggedInUser}></AboutForVisitors>
            </TabPanel>)} */}

            {/* {loggedInUser == user.data.email && ( */}
              <TabPanel>
                <About user={user} loggedInUser={loggedInUser} refetchUserInfo={refetchUserInfo}></About>
              </TabPanel>
            {/* )} */}
             {loggedInUser == user.data.email && (
            <TabPanel>
              <Media reversedPosts={reversedPosts} />
            </TabPanel>)}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
export default MiddleContent;
