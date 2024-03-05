import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FriendRequestCard from "./components/FriendRequestCard";
import AlreadyFriendCard from "./components/AlreadyFriendCard";
import { getFollowers, getFollowingUsers } from "../../hooks/getFollowers";
import {
  useGetFollowersQuery,
  useGetFollowingUsersQuery,
} from "../../redux/features/user/userApi";
import Skeleton from "../../shared component/Skeleton";
const Friends = () => {
  const { data: followers, isLoading: followersLoading } =
    useGetFollowersQuery();
  const { data: followingUsers, isLoading: followingUsersLoading } =
    useGetFollowingUsersQuery();

  console.log(followers, followingUsers, "friends____________");

  const [acitveTab, setActiveTab] = useState(1);
  // const [following, setFollowing] = useState([]);
  // const [followers, setFollowers] = useState([]);

  // console.log(following);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const followersData = await getFollowers();
  //       const followingData = await getFollowingUsers();

  //       setFollowers(followersData);
  //       setFollowing(followingData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <section className="mx-auto ">
      <Tabs
        variant="enclosed"
        acitveTab={acitveTab}
        onChange={(index) => setActiveTab(index)}
      >
        <TabList>
          <Tab className=" text-black">
            Following{" "}
            <span className="text-white ml-2 bg-purple-500 rounded-full w-6 h-6">
              {followingUsers?.data?.length}
            </span>
          </Tab>
          <Tab>
            Followers{" "}
            <span className="text-white ml-2 bg-green-500 rounded-full w-6 h-6">
              {followers?.data?.length}
            </span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-3 grid gap-8 grid-cols-1  lg:grid-cols-3 ">
              {followingUsersLoading ? (
                [1, 2, 3, 4].map((idx) => (
                  <Skeleton
                    key={idx}
                    noOfLines="4"
                    spacing="4"
                    skeletonHeight="2"
                  />
                ))
              ) : followers?.data?.length > 0 ? (
                followingUsers?.data?.map((user) => (
                  <AlreadyFriendCard key={user?._id} user={user} />
                ))
              ) : (
                <p className="text-xl">Not Followeing anyone yet!!</p>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-3 grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3">
              {followersLoading ? (
                [1, 2, 3, 4].map((idx) => (
                  <Skeleton
                    key={idx}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                ))
              ) : followers?.data?.length > 0 ? (
                followers?.data?.map((user) => (
                  <FriendRequestCard key={user?._id} user={user} />
                ))
              ) : (
                <p className="text-xl">No Followers yet.</p>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};

export default Friends;
