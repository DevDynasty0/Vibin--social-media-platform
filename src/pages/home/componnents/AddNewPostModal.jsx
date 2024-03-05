import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/images/avatar.png";
import { FaPlus, FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

const AddNewPostModal = ({
  isOpen,
  onClose,
  caption,
  setCaption,
  selectedItem,
  setSelectedItem,
  postsRefetch,
}) => {
  const user = useSelector((state) => state.auth.user);
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setButtonSpinner(true);
    const formData = new FormData();
    formData.append("postContent", selectedItem?.[0]);
    formData.append("caption", caption);
    formData.append("contentType", selectedItem?.[0].type.split("/")[0]);

    const newPost = {
      user: user._id,
      caption,
      type: "post",
      postContent: formData.get("postContent"),
      contentType: selectedItem ? selectedItem[0].type.split("/")[0] : "",
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/posts/post",
        newPost,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res?.data?.newPost) {
        postsRefetch();
        setButtonSpinner(false);
        onClose();
        setCaption("");
        setSelectedItem(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex gap-2 items-center px-2">
              <img
                className="h-10 w-10 rounded"
                src={user?.avatar ? user.avatar : avatar}
                alt=""
              />
              <h3 className="text-xl font-semibold">{user?.fullName}</h3>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlePostSubmit}>
            <ModalBody>
              <textarea
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                placeholder={`What are you vibin', ${user?.fullName}`}
                className="border-0 w-full outline-none p-2 rounded resize-none"
                name="caption"
                id="caption"
                rows="2"
              />
              <div className="mt-2 relative">
                <div
                  onClick={() => setSelectedItem(null)}
                  className={`${
                    selectedItem ? "block" : "hidden"
                  } absolute right-0 cursor-pointer z-50 bg-gray-400 p-1 rounded-full`}
                >
                  <FaXmark className="text-white" size="1.5rem" />
                </div>

                {selectedItem ? (
                  selectedItem[0].type.split("/")[0] === "video" ? (
                    <video
                      preload="none"
                      controls
                      className="mt-2 h-[350px] w-full"
                      src={URL.createObjectURL(selectedItem[0])}
                    />
                  ) : (
                    <img
                      className="mt-2 h-[350px] w-full"
                      src={URL.createObjectURL(selectedItem[0])}
                    />
                  )
                ) : (
                  <div>
                    <input
                      className="hidden"
                      type="file"
                      accept="video/*,image/*"
                      name="content"
                      id="content"
                      onChange={(e) => setSelectedItem(e.target.files)}
                    />
                    <label className="block" htmlFor="content">
                      <div className=" bg-gray-100 h-[200px] w-full flex justify-center items-center flex-col gap-2 cursor-pointer">
                        <div className="p-2 rounded bg-white">
                          <FaPlus size="1.5rem" />
                        </div>
                        <span>Add photo/video</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button> */}
              {/* {buttonSpinner ? (
                <Spinner size="lg" />
              ) : (
                <button
                  type="submit"
                  className="w-full block py-1.5 px-3 bg-color-one rounded text-lg font-semibold text-white"
                >
                  Vibe
                </button>
              )} */}

              <Button
                isLoading={buttonSpinner}
                colorScheme="color-one"
                spinner={<LoaderIcon size={8} color="white" />}
                type="submit"
                className="w-full block py-1.5 px-3
                 bg-color-one rounded text-2xl font-semibold text-white"
              >
                Drop Vibe
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewPostModal;
