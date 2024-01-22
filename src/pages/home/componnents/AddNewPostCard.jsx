import { IoImageOutline } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { HiOutlineGif } from "react-icons/hi2";
const AddNewPostCard = () => {
  return (
    <form className="bg-gray-100 p-4 rounded">
      <div className="flex gap-3 items-start">
        <img
          className="h-10 w-10 rounded-full"
          src="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg"
          alt=""
        />

        <div className="w-full">
          <input
            placeholder="What are you vibin'?"
            className="focus:outline-gray-500 w-full rounded p-2"
            type="text"
            name="title"
            id="title"
          />
          <div className="mt-2 flex items-center gap-3">
            <IoImageOutline size="1.5rem" />
            <MdOutlineVideoLibrary size="1.5rem" />
            <HiOutlineGif size="1.5rem" />
            <button className="block ml-auto py-0.5 px-3 bg-color-one rounded text-lg font-semibold text-white">
              Vibe{" "}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewPostCard;
