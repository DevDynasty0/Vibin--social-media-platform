import CustomModal from '../../Modal/CustomModal';
import { MdEmail, MdModeEdit } from 'react-icons/md';
import { FaUniversity, FaUser } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { CgCalendarDates } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import { FaRegAddressCard } from "react-icons/fa";

const About = ({ userProfile }) => {
  const { onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editType, setEditType] = useState('');
  const [editedValue, setEditedValue] = useState('');

  const handleEditOpen = (type) => {
    setIsEditOpen(true);
    setEditType(type);
    setEditedValue(type === editType || type === 'dob' ? userProfile?.editedValue || '' : userProfile[type] || '');

    onOpen();
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditType('');
    setEditedValue('');
    onClose();
  };

  const handleEdit = async () => {
    try {
      const response = await axios.patch(`/api/v1/users/update-user-details`, {
        [editType]: editedValue,
      });

      console.log(`API response for updating ${editType}:`, response.data);

      // Update the user state
      // const updatedUser = { ...user, [editType]: editedValue };

      
      // setUser(updatedUser);
      

      
      handleEditClose();
    } catch (error) {
      console.error(`Error updating ${editType}:`, error);
    }
  };

 
  return (
    <div className="h-full bg-white py-2 px-4">
      <p>About</p>

      {/* User Name */}
      <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center">
          <FaUser></FaUser>
          <p>{userProfile?.fullName} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen('fullName')}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === 'fullName'}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="fullName"
            editedValue={editedValue} setEditedValue={setEditedValue}
          />
        </div>
      </div>
      <div className="bg-gray-200 flex items-center my-3 justify-between rounded-md px-2">
      <div className="p-2 flex gap-5 items-center ">
          <MdEmail></MdEmail>
          <p>{userProfile?.email} </p>
        </div>
        </div>
      {/* User Extra Email */}
      <div className="bg-blue-200 flex items-center my-3 justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <MdEmail></MdEmail>
          <p>{userProfile?.extraEmail ||'Add Another  Email'} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen('extraEmail')}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === 'extraEmail'}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="extraEmail"
            editedValue={editedValue} setEditedValue={setEditedValue}
          />
        </div>
      </div>
       {/* User Date of Birth */}
       <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <CgCalendarDates></CgCalendarDates>
          <p>{userProfile?.dob || 'Add Your Date of Birth'}</p>
        </div>
        <div>
          <button onClick={() => handleEditOpen('dob')}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === 'dob'}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="dob"
            editedValue={editedValue} 
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
      

      {/* User University */}
      <div className="bg-blue-200 flex my-2 items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <FaUniversity></FaUniversity>
          <p> {userProfile?.university || 'Add Your University'}</p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen('university')}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === 'university'}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="university"
            editedValue={editedValue} setEditedValue={setEditedValue}
          />
        </div>
      </div>

     
      {/* user address */}
      <div className="bg-blue-200 flex my-2 items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <FaRegAddressCard></FaRegAddressCard>
          <p> {userProfile?.address || 'Add Your Address'}</p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen('address')}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === 'address'}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="address"
            editedValue={editedValue} setEditedValue={setEditedValue}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
