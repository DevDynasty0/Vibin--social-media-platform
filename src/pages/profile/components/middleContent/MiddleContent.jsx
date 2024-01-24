import { TbBrandFeedly } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import FeedCards from "./FeedCards";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function MiddleContent() {
  return (
    <div className="ps-10 mt-10">
      <div className="lg:ml-0 lg:-mt-8 lg:pb-20 -mt-8 -ml-16">
      <h2 className="font-bold md:text-2xl  text-[16px]">Ismail Hosen</h2>
      <span className="text-[10px]">@ismailhosen</span>

      </div>
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
      

      {/* Feed Cards  */}
      {/* <FeedCards /> */}
    </div>
  );
}
