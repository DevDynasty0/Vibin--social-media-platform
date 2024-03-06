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
import { RiContactsFill, RiContactsLine } from "react-icons/ri";
import { useUpdateUserInfoMutation } from "../../../../../redux/features/user/userApi";

const About = ({ user, refetchUserInfo, loggedInUser }) => {
  const { onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleEditOpen = (type, prevValue) => {
    setIsEditOpen(true);
    setEditType(type);
    setEditedValue(
      prevValue
      // type === editType || type === "dob"
      //   ? prevValue || ""
      //   : user[type] || ""
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
      // const response = await axios.patch(/api/v1/users/update-user-details, {
      //   [editType]: editedValue,
      // });

      // console.log(API response for updating ${editType}:, response.data);

      handleEditClose();
    } catch (error) {
      console.error(`Error updating ${editType}: `, error);
    }
  };
  // console.log("edited", editedValue);
  return (
    <div>
      {" "}
      {loggedInUser === user.data.email ? (
        <div className="h-full  py-2 px-4">
          {/* User Name */}
          <div className=" border  shadow-md border-color-one  flex items-center justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center">
              <FaUser></FaUser>
              <p>{user?.data?.fullName} </p>
            </div>

            <div className="">
              <button
                onClick={() => handleEditOpen("fullName", user?.data?.fullName)}
              >
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one  rounded-md"></MdModeEdit>
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
          <div className=" border  shadow-md border-color-one flex items-center my-3 justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center">
              <FaRegCircleUser></FaRegCircleUser>
              <p>{user?.data?.userName || "Add Your Username"} </p>
            </div>

            <div className="">
              <button
                onClick={() => handleEditOpen("userName", user?.data?.userName)}
              >
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
          <div className=" border  shadow-md border-color-one  flex items-center my-3 justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <BiMessageError />
              <p>{user?.data?.bio || "Add Bio"} </p>
            </div>

            <div className="">
              <button onClick={() => handleEditOpen("bio", user?.data?.bio)}>
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
          <div className="bg-gray-300 flex items-center my-3 justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <MdEmail></MdEmail>
              <p>{user?.data?.email} </p>
            </div>
          </div>
          {/* User Extra Email */}
          <div className=" border  shadow-md border-color-one  flex items-center my-3 justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <MdEmail></MdEmail>
              <p>{user?.data?.extraEmail || "Add Another  Email"} </p>
            </div>

            <div className="">
              <button
                onClick={() =>
                  handleEditOpen("extraEmail", user?.data?.extraEmail)
                }
              >
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
          <div className=" border  shadow-md border-color-one  flex items-center justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <CgCalendarDates></CgCalendarDates>
              <p>{user?.data?.dob || "Add Your Date of Birth"}</p>
            </div>
            <div>
              <button onClick={() => handleEditOpen("dob", user?.data?.dob)}>
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
          <div className="border  shadow-md border-color-one  flex my-2 items-center justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <FaUniversity></FaUniversity>
              <p> {user?.data?.university || "Add Your University"}</p>
            </div>

            <div className="">
              <button
                onClick={() =>
                  handleEditOpen("university", user?.data?.university)
                }
              >
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
          <div className=" border  shadow-md border-color-one  flex my-2 items-center justify-between rounded-md px-2">
            <div className="p-2 flex gap-5 items-center ">
              <FaRegAddressCard></FaRegAddressCard>
              <p> {user?.data?.address || "Add Your Address"}</p>
            </div>

            <div className="">
              <button
                onClick={() => handleEditOpen("address", user?.data?.address)}
              >
                <MdModeEdit className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></MdModeEdit>
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
      ) : (
        <div className="w-full p-6 bg-white h-64 rounded-md">
          <div className=" grid grid-cols-3 items-center justify-center">
            {/* <p>{user.data.fullName}</p> */}
            <div className="p-2 flex gap-5  items-center">
              {" "}
              <FaUser className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></FaUser>
              <p className="font-bold">Name</p>
            </div>
            <div className="col-span-2">
              <p>{user?.data?.fullName} </p>
            </div>

            <div className="p-2 flex gap-5 items-center ">
              <RiContactsFill className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></RiContactsFill>
              <p className="font-bold">Contact</p>
            </div>

            <div className="col-span-2">
              {" "}
              <p>
                {user?.data?.extraEmail ||
                  `${user.data.fullName} doesn't added contact yet`}{" "}
              </p>
            </div>

            <div className="p-2 flex gap-5 items-center ">
              <CgCalendarDates className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></CgCalendarDates>
              <p className="font-bold">Birth Date</p>
            </div>
            <div className="col-span-2">
              <p>
                {user?.data?.dob ||
                  `${user.data.fullName} doesn't added birth date yet`}
              </p>
            </div>

            <div className="p-2 flex gap-5 items-center ">
              <FaUniversity className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></FaUniversity>
              <p className="font-bold">University</p>
            </div>
            <div className="col-span-2">
              {" "}
              <p>
                {" "}
                {user?.data?.university ||
                  `${user.data.fullName} doesn't added university yet`}
              </p>
            </div>

            <div className="p-2 flex gap-5 items-center ">
              <FaRegAddressCard className="w-6 h-6 p-1 text-white bg-color-one rounded-md"></FaRegAddressCard>
              <p className="font-bold">Address</p>
            </div>
            <div className="col-span-2">
              {" "}
              <p>
                {" "}
                {user?.data?.address ||
                  `${user.data.fullName} doesn't added Address yet`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
