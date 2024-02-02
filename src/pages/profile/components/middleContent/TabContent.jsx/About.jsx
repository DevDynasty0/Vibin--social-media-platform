

import CustomModal from '../../Modal/CustomModal';
import { MdEmail, MdModeEdit } from 'react-icons/md';
import { FaUniversity, FaUser } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg"

const About = ({user}) => {
 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isEmailEditOpen, setIsEmailEditOpen] = useState(false);
  const [isUniEditOpen, setIsUniEditOpen] = useState(false);
  const [isDobEditOpen, setIsDobEditOpen] = useState(false);

  const handleNameEditOpen = () => {
    setIsNameEditOpen(true);
  };

  const handleNameEditClose = () => {
    setIsNameEditOpen(false);
  };

  const handleEmailEditOpen = () => {
    setIsEmailEditOpen(true);
  };

  const handleEmailEditClose = () => {
    setIsEmailEditOpen(false);
  };
  const handleUniEditOpen = () => {
    setIsUniEditOpen(true);
  };

  const handleUniEditClose = () => {
    setIsUniEditOpen(false);
  };

  const handleDobEditOpen = () => {
    setIsDobEditOpen(true);
  };

  const handleDobEditClose = () => {
    setIsDobEditOpen(false);
  };


  // //////
  const handleNameEdit = (editedValue) => {
    console.log('Save logic for Name:', editedValue);
    // For example, if you are using state in your component, you might do something like:
    // setUser({ ...user, fullName: editedValue });
    handleNameEditClose();
  };

  const handleEmailEdit = (editedValue) => {
    // Implement logic to update the email in your application state or API
    console.log('Save logic for Email:', editedValue);
    // For example, if you are using state in your component, you might do something like:
    // setUser({ ...user, email: editedValue });
    handleEmailEditClose();
  };
  const handleUniEdit = (editedValue) => {
    // Implement logic to update the email in your application state or API
    console.log('Save logic for University:', editedValue);
    // For example, if you are using state in your component, you might do something like:
    // setUser({ ...user, email: editedValue });
    handleUniEditClose();
  };
  const handleDobEdit = (editedValue) => {
    // Implement logic to update the date of birth in your application state or API
    console.log('Save logic for Date of Birth:', editedValue);
    // For example, if you are using state in your component, you might do something like:
    // setUser({ ...user, dob: editedValue });
    handleDobEditClose();
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const dobRef = useRef(null);
  const uniRef = useRef(null);



//     const { isOpen: isNameEditOpen, onOpen: onNameEditOpen, onClose: onNameEditClose } = useDisclosure();
// const { isOpen: isEmailEditOpen, onOpen: onEmailEditOpen, onClose: onEmailEditClose } = useDisclosure();
// const { isOpen: isUniEditOpen, onOpen: onUniEditOpen, onClose: onUniEditClose } = useDisclosure();
    return (
        <div className='h-64 bg-white py-2 px-4'>
              <p>About</p>
      {/*  */}
     <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
    <div className="  p-2 flex gap-5 items-center ">
    <FaUser></FaUser>
    <p>{user?.fullName} </p>
    </div>
    
   <div className="">
   {/* Button to open the name edit modal */}
   <button onClick={handleNameEditOpen}><MdModeEdit></MdModeEdit></button>
      {/* CustomModal for editing name */}
      <CustomModal
        isOpen={isNameEditOpen}
        onClose={handleNameEditClose}
        initialRef={nameRef}
        onEdit={handleNameEdit}
        value={user?.fullName}
        editType="Name"
      />
   </div>
     </div>
     {/*  */}
     <div className="bg-blue-200 flex items-center my-3 justify-between rounded-md px-2">
    <div className="p-2 flex gap-5 items-center ">
        <MdEmail></MdEmail>
        <p>{user?.email || 'Add Your Email'} </p>
    </div>
    
    <div className="">
    {/* Button to open the email edit modal */}
    <button onClick={handleEmailEditOpen}><MdModeEdit></MdModeEdit></button>
      {/* CustomModal for editing email */}
      <CustomModal
        isOpen={isEmailEditOpen}
        onClose={handleEmailEditClose}
        initialRef={emailRef}
        onEdit={handleEmailEdit}
        value={user?.email}
        editType="Email"
      />
    </div>
</div>
     {/*  */}
     <div className="bg-blue-200 flex my-2 items-center justify-between rounded-md px-2">
     <div className="   p-2 flex gap-5 items-center ">
   <FaUniversity></FaUniversity>
    <p> {isUniEditOpen || 'Add Your University'}</p>
    </div>
    <div className="">
    <button onClick={handleUniEditOpen}><MdModeEdit></MdModeEdit></button>
      {/* CustomModal for editing date of birth */}
      <CustomModal
        isOpen={isUniEditOpen}
        onClose={handleUniEditClose}
        initialRef={uniRef}
        onEdit={handleUniEdit}
        value={isUniEditOpen}
        editType="University"
        
      />
    </div>
   </div>


<div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
   <div className="   p-2 flex gap-5 items-center ">
   <CgCalendarDates></CgCalendarDates>
  
    <p>{isDobEditOpen || 'Add Your  Date of Birth'}</p>
    </div>
   <div>
   {/* Button to open the date of birth edit modal */}
   <button onClick={handleDobEditOpen}><MdModeEdit></MdModeEdit></button>
      {/* CustomModal for editing date of birth */}
      <CustomModal
        isOpen={isDobEditOpen}
        onClose={handleDobEditClose}
        initialRef={dobRef}
        onEdit={handleDobEdit}
        value={isDobEditOpen}
        editType="Date of Birth"
      />
   </div>
   </div>
        </div>
    );
};

export default About;