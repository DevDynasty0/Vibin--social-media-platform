
import { BsMessenger } from "react-icons/bs";
import { BiBlock } from "react-icons/bi";
import { LuUserX2 } from "react-icons/lu";


const AlreadyFriendCard = () => {
    return (
        <div className="border p-2 flex flex-col gap-3 cursor-pointer rounded">
            <img className="w-full h-[200px]" src="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" alt="" />
            <h5 className="font-semibold text-xl px-2">Mr Jodu</h5>
            <div className="flex justify-between px-2">
                <BiBlock size="1.5rem" />
                <LuUserX2 size="1.5rem" />
                <BsMessenger size="1.5rem" />
            </div>
        </div>
    );
};

export default AlreadyFriendCard;