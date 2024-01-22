import { TbBrandFeedly } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import FeedCards from "./FeedCards";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function MiddleContent() {
  return (
    <div className="ps-10 mt-10">
      <h2 className="font-semibold text-2xl">Ismail Hosen</h2>
      <span>@ismailhosen</span>

      {/* Tab items */}
      <div>
      <Tabs>
  <TabList>
    <Tab>Post</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <FeedCards></FeedCards>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
      </div>
      {/* <div className="flex my-6">
        <div className="flex flex-col justify-center w-20 h-16 text-green-500 cursor-pointer">
          <TbBrandFeedly className="text-3xl" />
          <span>Feed</span>
        </div>
        <div className="flex flex-col justify-center w-20 h-16 text-gray-500 cursor-pointer">
          <IoInformationCircleOutline className="text-3xl" />
          <span>Info</span>
        </div>
        <div className="flex flex-col justify-center w-20 h-16 text-gray-500 cursor-pointer">
          <TbBrandFeedly className="text-3xl" />
          <span>Feed</span>
        </div>
        <div className="flex flex-col justify-center w-20 h-16 text-gray-500 cursor-pointer">
          <TbBrandFeedly className="text-3xl" />
          <span>Feed</span>
        </div>
      </div> */}

      {/* Feed Cards  */}
      {/* <FeedCards /> */}
    </div>
  );
}
