import axios from "axios";

export const followUser = async (profileId, followerId) => {
  try {
    const res = await axios.post("/api/v1/users/follow-user", {
      profile: profileId,
      follower: followerId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
