import { IoCamera } from "react-icons/io5";
import MiddleContent from "./components/MiddleContent";

export default function Profile() {
  const coverPhoto = true;
  const avatar = true;
  return (
    <div className="bg-gray-100">
      <div className="w-full bg-gray-300 h-[55vh] relative">
        {coverPhoto && (
          <img
            src="https://media.istockphoto.com/id/1473510693/photo/writing-business-and-portrait-of-black-woman-in-office-for-meeting-planning-and.jpg?s=2048x2048&w=is&k=20&c=NXMy25KtyqiREwIaJNEwDRuEa6IZNag-9ViiwNSbnQg="
            alt=""
            className="w-full h-full"
          />
        )}
        <button className="flex items-center justify-center absolute text-green-600 border-[3px] border-green-600 bg-white bottom-5 right-5 cursor-pointer rounded-sm px-3 py-2">
          <h3 className="uppercase font-semibold">Change Image</h3>
        </button>
      </div>
      <div className="w-[60vw] mx-auto flex pb-10">
        {/* Left Content Begin */}
        <div className="flex justify-center relative w-3/12">
          {/* Profile image begin */}
          <div className="bg-white p-1 h-52 w-52 absolute -top-32 rounded-full">
            {avatar && (
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-full rounded-full"
              />
            )}
            <div className="flex items-center justify-center absolute bg-green-600 w-10 h-10 rounded-full bottom-8 right-1 cursor-pointer">
              <IoCamera className="text-white" />
            </div>
          </div>
          {/* Left Content Begin */}
          <div className="bg-white w-full">Left Content Here</div>
        </div>

        {/* Middle Content Begin */}
        <div className="w-6/12">
          <MiddleContent />
        </div>

        {/* Right Content Begin */}
        <div className="w-3/12">Right Content Here</div>
      </div>
    </div>
  );
}
