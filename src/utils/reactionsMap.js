const reactionsMap = (reactions) => {
  const reactionsMap = new Map();
  if (reactions?.length > 0) {
    for (let i = 0; i < reactions.length; i++) {
      const reaction = reactionsMap[reactions[i].type];
      const type = reactions[i].type;
      switch (type) {
        case "love":
          if (!reaction) {
            reactionsMap["❤️"] = 0;
          }
          reactionsMap["❤️"]++;
          break;
        case "unlike":
          if (!reaction) {
            reactionsMap["👎"] = 0;
          }
          reactionsMap["👎"]++;
          break;
        case "funny":
          if (!reaction) {
            reactionsMap["🤣"] = 0;
          }
          reactionsMap["🤣"]++;
          break;
        case "vibe boost":
          if (!reaction) {
            reactionsMap["⚡"] = 0;
          }
          reactionsMap["⚡"]++;
          break;
        case "awkward":
          if (!reaction) {
            reactionsMap["😬"] = 0;
          }
          reactionsMap["😬"]++;
          break;
        default:
          break;
      }
    }
  }

  return Object.keys(reactionsMap);
};

export default reactionsMap;
