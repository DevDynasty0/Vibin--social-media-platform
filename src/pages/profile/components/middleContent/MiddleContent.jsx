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
import Media from "./TabContent.jsx/Media/Media";
import AllPosts from "../../../../shared component/AllPosts";

const MiddleContent = ({
  user,
  refetchUserInfo,
  reversedPosts,
  isSuccess,
  isLoading,
}) => {
  const MenuItems = () => {
    return (
      <MenuList>
        <MenuItem>Save Post</MenuItem>
        <MenuItem>Delete</MenuItem>
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
              <button className="btn bg-color-one py-2  md:px-6 md:mr-3 rounded-md text-white font-bold">
                Follow
              </button>
            </div>
          </div>

          <TabPanels>
            <TabPanel>
              <AllPosts
                isSuccess={isSuccess}
                isLoading={isLoading}
                posts={reversedPosts}
                MenuItems={MenuItems}
              ></AllPosts>
            </TabPanel>

            <TabPanel>
              <Highlights></Highlights>
            </TabPanel>

            <TabPanel>
              <Likes></Likes>
            </TabPanel>

            <TabPanel>
              <About user={user} refetchUserInfo={refetchUserInfo}></About>
            </TabPanel>
            <TabPanel>
              <Media reversedPosts={reversedPosts} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
export default MiddleContent;
