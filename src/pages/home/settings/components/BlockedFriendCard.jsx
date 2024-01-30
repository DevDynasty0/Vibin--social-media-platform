

const BlockedFriendCard = () => {
    return (
        <div className="flex items-center gap-4 ">
            
            <img className="w-[80px] h-[80px] rounded" src="https://i.ibb.co/8KdxKhD/cat-bed-looking-camera-23-2147888586.jpg" alt="" />

            <div className="space-y-2">
                <h3 className="font-medium text-xl">Foyez Ahamed</h3>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Unblock</button>
            </div>

        </div>
    );
};

export default BlockedFriendCard;