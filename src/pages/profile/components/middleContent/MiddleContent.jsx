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
const  MiddleContent=()=> {
  const { isOpen, onOpen, onClose } = useDisclosure()

 
  return (
    <div className=" mt-10">
     
      {/* Tab items */}
      <div>
      <Tabs>
  <TabList>
    <Tab>Post</Tab>
    <Tab>Highlights</Tab>
    <Tab>Likes</Tab>
    <Tab>About</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <FeedCards></FeedCards>
    </TabPanel>
    <TabPanel>
    <div className="w-full bg-white rounded-md h-64">
       <p className="font-bold text-lg text-center pt-16 "> No Highlights!!</p>
      </div>
    </TabPanel>
    <TabPanel>
      <div className="w-full bg-white h-64 rounded-md">
       <p className="font-bold text-lg text-center pt-16 "> You don't get any like yet!!</p>
      </div>
    </TabPanel>
    <TabPanel>
      <p>About</p>
      {/*  */}
     <div className="bg-white flex items-center justify-between rounded-md px-2">
    <div className="  p-2 flex gap-5 items-center ">
    <FaUser></FaUser>
    <p>  Rahida Priya</p>
    </div>
    
   <div className="">
   <button  onClick={onOpen}><MdModeEdit className="text-md"></MdModeEdit></button>
   <CustomModal  onClose={onClose} onOpen={onOpen} isOpen={isOpen}></CustomModal>
   </div>
     </div>
     <div className="bg-white flex my-2 items-center justify-between rounded-md px-2">
     <div className="bg-white   p-2 flex gap-5 items-center ">
   <FaUniversity></FaUniversity>
    <p> International Islamic University Chittagong</p>
    </div>
    <div className="">
   <button  onClick={onOpen}><MdModeEdit className="text-md"></MdModeEdit></button>
   <CustomModal  onClose={onClose} onOpen={onOpen} isOpen={isOpen}></CustomModal>
   </div>
   </div>
     {/*  */}
  

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