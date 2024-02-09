import { TbBrandFeedly } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import FeedCards from "./FeedCards";
import { FaUser } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Input } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";

import { Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure } from '@chakra-ui/react'

import CustomModal from "../Modal/CustomModal";
import About from "./TabContent.jsx/About";
import Highlights from "./TabContent.jsx/Highlights";
import Likes from "./TabContent.jsx/Likes";
import Media from "./TabContent.jsx/Media/Media";
const  MiddleContent=({user,setUser,userProfile,profileRefetch ,myPost,reversedPosts})=> {
 

 
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
    <button className="btn bg-color-one py-2  px-6 mr-3 rounded-md text-white font-bold">Follow</button>
  </div>
  </div>

  <TabPanels>
    <TabPanel>
      <FeedCards myPost={myPost} user={user} reversedPosts={reversedPosts}></FeedCards>
    </TabPanel>

    <TabPanel>
   <Highlights></Highlights>
    </TabPanel>

    <TabPanel>
     <Likes></Likes>
    </TabPanel>

    <TabPanel>
    <About user={user} setUser={setUser} userProfile={userProfile} profileRefetch={profileRefetch}  ></About>

    </TabPanel>
    <TabPanel>
   <Media  myPost={myPost} user={user} reversedPosts={reversedPosts}></Media>

    </TabPanel>
  </TabPanels>
</Tabs>
      </div>
      

      {/* Feed Cards  */}
      {/* <FeedCards /> */}
    </div>
  );
}
export default MiddleContent;