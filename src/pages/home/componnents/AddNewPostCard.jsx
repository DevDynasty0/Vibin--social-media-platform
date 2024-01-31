import { IoImageOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import avatar from "../../../assets/images/avatar.png";


// import { MdOutlineVideoLibrary } from "react-icons/md";
import { HiOutlineGif } from "react-icons/hi2";
const AddNewPostCard = ({isOpen, onOpen, onClose, caption, setCaption }) => {
  // console.log(onOpen);
  const user = useSelector((state) => state.auth.user);

  return (
    <form  className="bg-white shadow-md p-4 rounded">
      <div className="flex gap-3 items-start">
        <img
          className="h-10 w-10 rounded"
          src={user?.avatar ? user.avatar : avatar}
          alt=""
        />

        <div className="w-full">
          <input
            placeholder="What are you vibin'?"
            className="focus:outline-gray-500 w-full rounded p-2 bg-gray-100"
            type="text"
            name="title"
            id="title"
            value={caption? caption : ""}
            onClick={onOpen}
          
          />
          <div className="mt-2 flex items-center gap-3">
            <IoImageOutline size="1.5rem" onClick={onOpen} className="cursor-pointer" />
            {/* <MdOutlineVideoLibrary size="1.5rem" /> */}
            <HiOutlineGif size="1.5rem" />
            {/* <button className="block ml-auto py-0.5 px-3 bg-color-one rounded text-lg font-semibold text-white">
              Vibe{" "}
            </button> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewPostCard;
