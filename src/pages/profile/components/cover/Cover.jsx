import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Cover = ({ user, refetchUserInfo,loggedInUser }) => {
  const [coverImage, setCoverImage] = useState("");

  const handleCoverChange = async (coverImage) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);

      const response = await axios.patch(
        "/api/v1/users/change-cover-image",
        formData
      );
      console.log(response);

      if (response.data && response.data.data.coverImage) {
        setCoverImage(response.data.data.coverImage);
        console.log("cover dekhbo", response.data.data.coverImage);
      }
      refetchUserInfo();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  console.log("cover", coverImage);
  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    handleCoverChange(file);
  };

  return (
    <div className="relative">
      <div className="w-full 
       lg:h-[72vh] md:h-[44vh] h-[32vh] relative">
        <img
          src={user?.data?.coverImage}
          alt=""
          className="w-full h-full rounded-md"
        />
        <label
          htmlFor="imageUpload"
          className="absolute bottom-2 right-2 cursor-pointer text-white"
        >
         {loggedInUser === user.data.email && <FaEdit className="bg-gray-400 w-7 h-7 p-1 rounded-full"></FaEdit>}
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleCoverFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Cover;
