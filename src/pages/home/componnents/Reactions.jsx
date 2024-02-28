import { motion } from "framer-motion";

const ReactionButton = ({ icon, onClick, isLiked, type }) => {
  return (
    <motion.button
      initial={{ y: 8, x: -15, scale: 0.6 }}
      animate={{ y: 0, x: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className={`${
        isLiked?.type === type && "bg-gray-300"
      } p-1 md:p-2 rounded-full border border-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400`}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  );
};

const Reactions = ({ onHandleReaction, react, postId, isLiked }) => {
  return (
    <motion.div
      initial={{ y: 28, x: -85, scale: 0.2, opacity: 0 }}
      animate={{
        y: [28, 20, 15, 10, 0],
        x: [-80, -60, -40, -20, 0],
        scale: [0.2, 0.4, 0.6, 0.8, 1],
        opacity: [0.2, 0.4, 0.6, 0.8, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      exit={{ x: -85, y: 20, scale: 0 }}
      onMouseOver={() => onHandleReaction(true)}
      onMouseLeave={() => onHandleReaction(false)}
      className="absolute bottom-12 mx-auto p-[2px] md:p-1 border border-gray-200 bg-white rounded-lg shadow-sm z-20"
    >
      <div className="flex justify-center space-x-1 md:space-x-2">
        <ReactionButton
          isLiked={isLiked}
          icon="❤️"
          type="love"
          onClick={(e) => react(e, postId, "love")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="👎"
          type="unlike"
          onClick={(e) => react(e, postId, "unlike")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="🤣"
          type="funny"
          onClick={(e) => react(e, postId, "funny")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="⚡"
          type="vibe boost"
          onClick={(e) => react(e, postId, "vibe boost")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="😬"
          type="awkward"
          onClick={(e) => react(e, postId, "awkward")}
        />
      </div>
    </motion.div>
  );
};

export default Reactions;
