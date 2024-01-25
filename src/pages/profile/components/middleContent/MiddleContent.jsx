import { TbBrandFeedly } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import FeedCards from "./FeedCards";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function MiddleContent() {
  return (
    <div className=" mt-10">
     
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
