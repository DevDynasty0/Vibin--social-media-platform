const reactionsMap = (reactions) => {
  const reactionsMap = new Map();
  for (let i = 0; i < reactions?.length; i++) {
    const type = reactions[i].type;
    switch (type) {
      case "love":
        reactionsMap.set("❤️", (reactionsMap.get("❤️") || 0) + 1);
        break;
      case "unlike":
        reactionsMap.set("👎", (reactionsMap.get("👎") || 0) + 1);
        break;
      case "funny":
        reactionsMap.set("🤣", (reactionsMap.get("🤣") || 0) + 1);
        break;
      case "vibe boost":
        reactionsMap.set("⚡", (reactionsMap.get("⚡") || 0) + 1);
        break;
      case "awkward":
        reactionsMap.set("😬", (reactionsMap.get("😬") || 0) + 1);
        break;
      default:
        break;
    }
  }

  // Convert Map to array of [key, value] pairs and sort by value in descending order
  const sortedArray = Array.from(reactionsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedArray;
};

export default reactionsMap;
