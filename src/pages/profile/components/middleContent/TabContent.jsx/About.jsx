import React from 'react';
import CustomModal from '../../Modal/CustomModal';
import { MdModeEdit } from 'react-icons/md';
import { FaUniversity, FaUser } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';

const About = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className='h-64 bg-white py-2 px-4'>
              <p>About</p>
      {/*  */}
     <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
    <div className="  p-2 flex gap-5 items-center ">
    <FaUser></FaUser>
    <p>  Rahida Priya</p>
    </div>
    
   <div className="">
   <button  onClick={onOpen}><MdModeEdit className="text-md"></MdModeEdit></button>
   <CustomModal  onClose={onClose} onOpen={onOpen} isOpen={isOpen}></CustomModal>
   </div>
     </div>
     <div className="bg-blue-200 flex my-2 items-center justify-between rounded-md px-2">
     <div className="   p-2 flex gap-5 items-center ">
   <FaUniversity></FaUniversity>
    <p> International Islamic University Chittagong</p>
    </div>
    <div className="">
   <button  onClick={onOpen}><MdModeEdit className="text-md"></MdModeEdit></button>
   <CustomModal  onClose={onClose} onOpen={onOpen} isOpen={isOpen}></CustomModal>
   </div>
   </div>
        </div>
    );
};

export default About;