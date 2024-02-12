import CustomModal from "../../Modal/CustomModal";
import { MdEmail, MdModeEdit } from "react-icons/md";
import { FaUniversity, FaUser } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CgCalendarDates } from "react-icons/cg";
// import { MdEdit } from 'react-icons/md';
// import {FcAbout} from 'react-icons/fc';
import { BiMessageError } from "react-icons/bi";
import { PiApertureLight } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useUpdateUserInfoMutation } from "../../../../../redux/features/user/userApi";

const About = ({ user, refetchUserInfo }) => {
  const { onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleEditOpen = (type) => {
    setIsEditOpen(true);
    setEditType(type);
    setEditedValue(
      type === editType || type === "dob"
        ? user?.data?.editedValue || ""
        : user[type] || ""
    );

    onOpen();
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditType("");
    setEditedValue("");
    onClose();
  };

  const handleEdit = async () => {
    try {
      updateUserInfo({ [editType]: editedValue });
      refetchUserInfo();
      // const response = await axios.patch(`/api/v1/users/update-user-details`, {
      //   [editType]: editedValue,
      // });

      // console.log(`API response for updating ${editType}:`, response.data);

      handleEditClose();
    } catch (error) {
      console.error(`Error updating ${editType}:`, error);
    }
  };

  return (
    <div className="h-full bg-white py-2 px-4">
      

      {/* User Name */}
      <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center">
          <FaUser></FaUser>
          <p>{user?.data?.fullName} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("fullName")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "fullName"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="fullName"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
      {/* change username */}
      <div className="bg-blue-200 flex items-center my-3 justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center">
          <FaRegCircleUser></FaRegCircleUser>
          <p>{user?.data?.userName || "Add Your Username"} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("userName")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "userName"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="userName"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
      {/* add bio */}
      <div className="bg-blue-200 flex items-center my-3 justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <BiMessageError />
          <p>{user?.data?.bio || "Add Bio"} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("bio")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "bio"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="bio"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
     
      {/* user default email */}
      <div className="bg-gray-200 flex items-center my-3 justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <MdEmail></MdEmail>
          <p>{user?.data?.email} </p>
        </div>
      </div>
      {/* User Extra Email */}
      <div className="bg-blue-200 flex items-center my-3 justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <MdEmail></MdEmail>
          <p>{user?.data?.extraEmail || "Add Another  Email"} </p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("extraEmail")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "extraEmail"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="extraEmail"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
      {/* User Date of Birth */}
      <div className="bg-blue-200 flex items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <CgCalendarDates></CgCalendarDates>
          <p>{user?.data?.dob || "Add Your Date of Birth"}</p>
        </div>
        <div>
          <button onClick={() => handleEditOpen("dob")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "dob"}
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
          <p> {user?.data?.university || "Add Your University"}</p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("university")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "university"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="university"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>

      {/* user address */}
      <div className="bg-blue-200 flex my-2 items-center justify-between rounded-md px-2">
        <div className="p-2 flex gap-5 items-center ">
          <FaRegAddressCard></FaRegAddressCard>
          <p> {user?.data?.address || "Add Your Address"}</p>
        </div>

        <div className="">
          <button onClick={() => handleEditOpen("address")}>
            <MdModeEdit></MdModeEdit>
          </button>
          <CustomModal
            isOpen={isEditOpen && editType === "address"}
            onClose={handleEditClose}
            // initialRef={editRef}
            onEdit={handleEdit}
            value={editedValue}
            editType="address"
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
