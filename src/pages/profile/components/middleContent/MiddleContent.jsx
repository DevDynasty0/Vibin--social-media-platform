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
  isLoading,loggedInUser
}) => {
  const MenuItems = () => {
    return (
      <MenuList>
        <MenuItem>Save Post</MenuItem>
        {loggedInUser == user.data.email &&   <MenuItem>Delete</MenuItem>}
      </MenuList>
    );
  };
  return (
    <div className=" mt-10">
      {/* Tab items */}
      <div>
        <Tabs className="mx-3 md:mx-0" >
          <div className="flex items-center  justify-between">
            <TabList>
              <Tab className="!px-2 md:!px-4 ">Post</Tab>
              <Tab className="!px-2 md:!px-4">Highlights</Tab>
              <Tab className="!px-2 md:!px-4">Likes</Tab>
              {loggedInUser == user.data.email &&  <Tab className="!px-2 md:!px-4">About</Tab>}
              <Tab className="!px-2 md:!px-4">Media</Tab>
            </TabList>
          {loggedInUser !== user.data.email && <div>
              <button className=" bg-color-one md:py-2  py-1 px-1 md:px-6 md:mr-3  rounded-md  text-xs md:text-xl text-white font-bold">
                Follow
              </button>
            </div>}
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

            {loggedInUser == user.data.email && <TabPanel>
              <About user={user} refetchUserInfo={refetchUserInfo}></About>
            </TabPanel>}
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
