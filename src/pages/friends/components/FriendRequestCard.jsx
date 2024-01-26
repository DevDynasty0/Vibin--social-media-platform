

const FriendRequestCard = () => {
    return (
        <div className="border flex flex-col gap-3 rounded p-2">
            <img className="w-full h-[200px]" src="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" alt="" />
            <h5 className="font-semibold px-2 text-xl">Mr Jodu</h5>
            <div className="px-2 flex justify-between">
                <button className="bg-color-one px-2 py-1 rounded text-white">Confirm</button>
                <button className="border border-color-one px-2 py-1 rounded shadow">Delete</button>
            </div>
        </div>
    );
};

export default FriendRequestCard;