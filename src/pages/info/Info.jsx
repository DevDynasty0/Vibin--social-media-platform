import { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserInfoMutation } from "../../redux/features/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { isOpenModal } from "../../redux/features/user/userSlice";

const Info = () => {
  const [updateUserInfo, { isLoading: isLoading2, isError }] =
    useUpdateUserInfoMutation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.user.isModalOpen);
  const [scrollBehavior] = useState("inside");
  const btnRef = useRef(null);
  const navigate = useNavigate();

  const onCloseHandle = () => {
    dispatch(isOpenModal(false));
    navigate("/");
    return false;
  };

  const [userInfo, setUserInfo] = useState({
    gender: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    bio: "",
    religion: "",
  });

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await updateUserInfo(userInfo);
      if (results.data.success) {
        dispatch(isOpenModal(false));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      onClose={onCloseHandle}
      finalFocusRef={btnRef}
      isOpen={isModalOpen}
      scrollBehavior={scrollBehavior}
      isLazy
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fill the following information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={handleUserInfoSubmit}
            className="space-y-3
            "
          >
            <div className="flex flex-col w-[90%] md:w-[85%] mx-auto space-y-2">
              <label htmlFor="gender" className="font-medium">
                Gender:
              </label>
              <select
                className="myDropdown"
                name="gender"
                id="gender"
                value={userInfo?.gender}
                onChange={handleUserInfoChange}
                required
              >
                <option value="" disabled selected>
                  Select Your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col w-[90%] md:w-[85%] space-y-2 mx-auto">
              <label htmlFor="dateOfBirth" className="font-medium">
                Date of Birth:
              </label>
              <input
                className="myDropdown"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleUserInfoChange}
                required
              />
            </div>
            <div className="flex flex-col w-[90%] md:w-[85%] space-y-2 mx-auto">
              <label htmlFor="religion" className="font-medium">
                Religion:
              </label>
              <select
                className="myDropdown"
                name="religion"
                id="religion"
                value={userInfo?.religion}
                onChange={handleUserInfoChange}
                required
              >
                <option value="" disabled selected>
                  Select Your Religion
                </option>
                <option value="islam">Islam</option>
                <option value="christianity">Christianity</option>
                <option value="buddhism">Buddhism</option>
                <option value="hinduism">Hinduism</option>
              </select>
            </div>
            <div className="relative w-[90%] md:w-[85%] mx-auto">
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                pattern="[0-9]{11}"
                value={userInfo.contactNumber}
                onChange={handleUserInfoChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full  text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
                placeholder=""
              />
              <label
                htmlFor="contactNumber"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Contact Number
              </label>
            </div>
            <div className="flex flex-col relative w-[90%] md:w-[85%] mx-auto">
              <textarea
                required
                rows={3}
                type="text"
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full  text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
                placeholder=""
              />
              <label
                htmlFor="address"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Address
              </label>
            </div>
            <div className="flex flex-col relative w-[90%] md:w-[85%] mx-auto">
              <textarea
                required
                rows={3}
                type="text"
                id="bio"
                name="bio"
                value={userInfo.bio}
                onChange={handleUserInfoChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full  text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#904486] peer"
                placeholder=""
              />
              <label
                htmlFor="bio"
                className="absolute text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#904486] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Bio
              </label>
            </div>

            <div className="w-[40%] mx-auto">
              <button
                disabled={isLoading2}
                className={` px-6 py-3 text-center w-full   border-[1px] text-gray-800 bg-white shadow-md rounded-md ${
                  isLoading2
                    ? "cursor-not-allowed"
                    : "hover:text-gray-600 hover:bg-gray-200  "
                }`}
                type="submit"
              >
                {isLoading2 ? (
                  <svg
                    className="animate-spin mx-auto h-6 w-6 text-[#904486]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      fill="currentColor"
                      d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </path>
                  </svg>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <p>Save</p>
                  </div>
                )}
              </button>
            </div>
            {isError && (
              <span className="text-rose-600 my-1">
                Ops, can&apos;t save your info. Please try again!
              </span>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Info;
