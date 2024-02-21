const ReactionButton = ({ icon, onClick }) => {
  return (
    <button
      className="p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const Reactions = ({ onHandleReaction, react, postId }) => {
  return (
    <div
      onMouseEnter={() => onHandleReaction(true)}
      onMouseLeave={() => onHandleReaction(false)}
      className="absolute bottom-12 max-w-md mx-auto p-2 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex justify-center space-x-4">
        <ReactionButton icon="👍" onClick={() => react(postId, "like")} />
        <ReactionButton icon="❤️" onClick={() => react(postId, "love")} />
        <ReactionButton icon="😆" onClick={() => react(postId, "haha")} />
        <ReactionButton icon="😮" onClick={() => react(postId, "wow")} />
        <ReactionButton icon="😢" onClick={() => react(postId, "sad")} />
        <ReactionButton icon="😡" onClick={() => react(postId, "angry")} />
      </div>
    </div>
  );
};

export default Reactions;
