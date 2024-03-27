import { motion } from "framer-motion";
import { useState } from "react";

const ReactionButton = ({
  icon,
  onClick,
  isLiked,
  type,
  isHover,
  onHoverHandler,
  setIsHover,
}) => {
  const onHandleHover = () => {
    setIsHover(null);
    onHoverHandler(type);
  };
  return (
    <motion.button
      onMouseOver={onHandleHover}
      onMouseLeave={() => setIsHover(null)}
      initial={{ y: 8, x: -15, scale: 0.6 }}
      animate={{ y: 0, x: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className={`${
        isLiked?.type === type && "bg-gray-300"
      } relative p-1 md:p-2 rounded-full border border-gray-200
       hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 
       flex items-center justify-center`}
      onClick={onClick}
    >
      {isHover === type && (
        <span className="bg-white shadow-sm text-color-one text-sm bottom-11 rounded-md py-1 px-2 absolute capitalize">
          {isHover}
        </span>
      )}
      {icon}
    </motion.button>
  );
};

const Reactions = ({ onHandleReaction, react, post, isLiked }) => {
  const [isHover, setIsHover] = useState(null);

  const debounce = (delay) => {
    let timeoutId;
    return function (isHover) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsHover(isHover);
      }, delay);
    };
  };

  const onHandleHover = debounce(1000);

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
      className="absolute bottom-12 mx-auto p-[2px] md:p-1 border border-gray-200
       bg-white rounded-lg shadow-sm z-10"
    >
      <div className="flex justify-center space-x-1 md:space-x-2">
        <ReactionButton
          isLiked={isLiked}
          icon="❤️"
          onHoverHandler={onHandleHover}
          setIsHover={setIsHover}
          isHover={isHover}
          type="love"
          onClick={(e) => react(e, post, "love")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="👎"
          onHoverHandler={onHandleHover}
          setIsHover={setIsHover}
          isHover={isHover}
          type="unlike"
          onClick={(e) => react(e, post, "unlike")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="🤣"
          onHoverHandler={onHandleHover}
          setIsHover={setIsHover}
          isHover={isHover}
          type="funny"
          onClick={(e) => react(e, post, "funny")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="⚡"
          onHoverHandler={onHandleHover}
          setIsHover={setIsHover}
          isHover={isHover}
          type="vibe boost"
          onClick={(e) => react(e, post, "vibe boost")}
        />
        <ReactionButton
          isLiked={isLiked}
          icon="😬"
          onHoverHandler={onHandleHover}
          setIsHover={setIsHover}
          isHover={isHover}
          type="awkward"
          onClick={(e) => react(e, post, "awkward")}
        />
      </div>
    </motion.div>
  );
};
export default Reactions;
