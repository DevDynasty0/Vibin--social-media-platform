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
    <section className="mt-10">
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
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {following?.map((user) => (
                <AlreadyFriendCard key={user?._id} user={user} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {followers.length > 0 ? (
                followers?.map((user) => (
                  <FriendRequestCard key={user?._id} user={user} />
                ))
              ) : (
                <p>No Followers yet.</p>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};

export default Friends;
