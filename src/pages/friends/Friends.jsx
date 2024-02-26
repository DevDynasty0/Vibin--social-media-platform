import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FriendRequestCard from "./components/FriendRequestCard";
import AlreadyFriendCard from "./components/AlreadyFriendCard";
import { getFollowers, getFollowingUsers } from "../../hooks/getFollowers";
const Friends = () => {
  const [acitveTab, setActiveTab] = useState(1);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  console.log(following);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const followersData = await getFollowers();
        const followingData = await getFollowingUsers();

        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="mx-auto">
      <Tabs
        variant="enclosed"
        acitveTab={acitveTab}
        onChange={(index) => setActiveTab(index)}
      >
        <TabList>
          <Tab>Following</Tab>
          <Tab>Followers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-3 grid gap-5 grid-cols-1  lg:grid-cols-2">
              {following?.map((user) => (
                <AlreadyFriendCard key={user?._id} user={user} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-3 grid gap-5 grid-cols-1  lg:grid-cols-2">
              {followers?.length > 0 ? (
                followers?.map((user) => (
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
