import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Checkbox } from '@chakra-ui/react'
import { IoMdNotifications } from "react-icons/io";
import { ImBlocked } from "react-icons/im";
import { MdPrivacyTip } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";

const Settings = () => {

  return (
    <div className="mt-9">
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

     <div className="mt-6">
     <Accordion>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                className="text-xl font-semibold flex gap-2"
                as="span"
                flex="1"
                textAlign="left"
              >
               <IoMdNotifications className="mt-1"/> Notification
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
         
         <AccordionPanel className="text-medium font-semibold">
          <div className="flex gap-6">
          <Checkbox>Check if you don't wan't notification for posts</Checkbox>
          {/* <Checkbox >Checkbox</Checkbox> */}
          </div>
         </AccordionPanel>
         
        </AccordionItem>

        <AccordionItem className="mt-2">
          <h2>
            <AccordionButton>
              <Box
                className="text-xl font-semibold flex gap-2"
                as="span"
                flex="1"
                textAlign="left"
              >
               <ImBlocked className="mt-1"/> Block
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
         
         <AccordionPanel className="text-medium font-semibold">
          <div className="flex gap-6">
          <Checkbox >Checkbox</Checkbox>
          <Checkbox >Checkbox</Checkbox>
          </div>
         </AccordionPanel>
         
        </AccordionItem>

        <AccordionItem className="mt-2">
          <h2>
            <AccordionButton>
              <Box
                className="text-xl font-semibold flex gap-2"
                as="span"
                flex="1"
                textAlign="left"
              >
               <MdPrivacyTip className="mt-1"/>Privacy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
         
         <AccordionPanel className="text-medium font-semibold">
          <div className="flex gap-6">
          <Checkbox >Make your account private?</Checkbox>
          {/* <Checkbox >Checkbox</Checkbox> */}
          </div>
         </AccordionPanel>
         
        </AccordionItem>
       
      </Accordion>
     </div>
    </div>
  );
};

export default Settings;
