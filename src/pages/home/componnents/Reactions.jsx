const ReactionButton = ({ icon, onClick, isLiked, type }) => {
  return (
    <button
      className={`${
        isLiked?.type === type && "bg-gray-300"
      } p-1 md:p-2 rounded-full border border-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const Reactions = ({ onHandleReaction, react, postId, isLiked }) => {
  return (
    <div
      onMouseEnter={() => onHandleReaction(true)}
      onMouseLeave={() => onHandleReaction(false)}
      className="absolute bottom-12 mx-auto p-[2px] md:p-1 border border-gray-200 bg-white rounded-lg shadow-sm z-20"
    >
      <div className="flex justify-center space-x-1 md:space-x-2">
        <ReactionButton
          isLiked={isLiked}
          icon="❤️"
          type="love"
          onClick={() => react(postId, "love")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="👎"
          type="unlike"
          onClick={() => react(postId, "unlike")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="🤣"
          type="funny"
          onClick={() => react(postId, "funny")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="⚡"
          type="vibe boost"
          onClick={() => react(postId, "vibe boost")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="😬"
          type="awkward"
          onClick={() => react(postId, "awkward")}
        />
      </div>
    </div>
  );
};

export default Reactions;
