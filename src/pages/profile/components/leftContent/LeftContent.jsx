import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import axios from "axios";
import { FaHome, FaUniversity } from "react-icons/fa";

export default function LeftContent({
  user,
  refetchUserInfo,
  refetchProfilePosts,
  loggedInUser,
}) {
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = async (avatar) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar); // append the image file

      const response = await axios.patch(
        "/api/v1/users/change-avatar",
        formData
      );

      // Assuming your response contains the updated image URL, you can update the profileImage state
      if (response.data && response.data.data.avatar !== "") {
        setProfileImage(response.data.data.avatar);
      }
      refetchUserInfo();
      refetchProfilePosts();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  console.log("Profile image", profileImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    handleImageChange(file);
  };
  console.log("userprofile", user?.data?.avatar);
  return (
    <div className="relative p-4 text-center ">
      <div className="relative">
        <img
          className="object-cover w-44  h-44 block mx-auto md:-mt-[35%] -mt-[30%] rounded-full"
          src={
            user?.data?.avatar ||
            "https://res.cloudinary.com/dsfyrjd8b/image/upload/v1707303580/by2cegfudppucnxbwvun.png"
          }
          alt="Profile"
        />
        {loggedInUser === user.data.email && (
          <>
            {" "}
            <div className="bg-gray-400  p-2 rounded-full absolute bottom-[82%] right-20">
              <label htmlFor="profileUpload" className="">
                <IoCamera className="cursor-pointer" />
              </label>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}
        <div className="mb-5 mt-3">
          <h2 className="font-bold md:text-2xl text-[10px]">
            {user?.data?.fullName}
          </h2>
          <span className="text-[14px] font-bold">@{user?.data?.userName}</span>
        </div>
        <div className="bg-white  rounded-tl-fulldescxdfd   px-2 py-6 my-2">
          <h1 className="font-bold text-lg">Intro</h1>
          <h2>{user?.data?.bio}</h2>
        </div>
        <div className="flex items-center gap-4 justify-center bg-white rounded-md px-2 py-6">
          <div className=" ">
            <h3 className="lg:text-xl font-semibold text-[10px] text-gray-500">
              Following
            </h3>
            <h3 className="font-bold text-[10px] md:text-sm">
              {user?.data?.followingCount}
            </h3>
          </div>
          <div className=" items-center">
            <h3 className="lg:text-xl text-[10px] font-semibold text-gray-500">
              Followers
            </h3>
            <h3 className="font-bold text-[10px] md:text-sm">
              {user?.data?.followersCount}
            </h3>
          </div>
        </div>
        <div className="bg-white px-2 py-6 my-2 text-start">
          <div className="flex flex-col justify-center items-center ">
            <FaUniversity className="text-2xl bg-slate-400 rounded-full w-7 p-1 h-7 "></FaUniversity>
            <p>
              {" "}
              <span className="font-bold ml-1"></span> {user?.data?.university}
            </p>
          </div>
          <div className="flex items-center my-2 flex-col ">
            <FaHome className="text-2xl bg-slate-400 rounded-full w-7 p-1 h-7 "></FaHome>
            <p>
              {" "}
              <span className="font-bold ml-1 mr-3 "></span>{" "}
              {user?.data?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
