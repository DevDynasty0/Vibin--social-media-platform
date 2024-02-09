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
import Highlights from "./TabContent.jsx/Highlights";
import Likes from "./TabContent.jsx/Likes";
import Media from "./TabContent.jsx/Media";
import AllPosts from "../../../../shared component/AllPosts";

const MiddleContent = ({
  user,
  setUser,
  userProfile,
  refetchUserInfo,
  myPost,
  isLoading,
  isSuccess,
}) => {
  const MenuItemsForProfile = () => {
    return (
      <MenuList>
        <MenuItem>Save post</MenuItem>
        <MenuItem>delete</MenuItem>
      </MenuList>
    );
  };
  return (
    <div className=" mt-10">
      {/* Tab items */}
      <div>
        <Tabs>
          <div className="flex items-center justify-between">
            <TabList>
              <Tab>Post</Tab>
              <Tab>Highlights</Tab>
              <Tab>Likes</Tab>
              <Tab>About</Tab>
              <Tab>Media</Tab>
            </TabList>
            <div>
              <button className="btn bg-color-one py-2  px-6 mr-3 rounded-md text-white font-bold">
                Follow
              </button>
            </div>
          </div>

          <TabPanels>
            <TabPanel>
              <AllPosts
                posts={myPost}
                isLoading={isLoading}
                isSuccess={isSuccess}
                MenuItems={MenuItemsForProfile}
              />
            </TabPanel>

            <TabPanel>
              <Highlights></Highlights>
            </TabPanel>

            <TabPanel>
              <Likes></Likes>
            </TabPanel>

            <TabPanel>
              <About
                user={user}
                setUser={setUser}
                userProfile={userProfile}
                refetchUserInfo={refetchUserInfo}
              ></About>
            </TabPanel>
            <TabPanel>
              <Media></Media>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      {/* Feed Cards  */}
      {/* <FeedCards /> */}
    </div>
  );
};
export default MiddleContent;
