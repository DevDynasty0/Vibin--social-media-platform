import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

export const followUser = async (profileId, followerId) => {
  try {
    const token = getAccessToken();
    const res = await axios.post(
      "https://vibin-social-media-platform-backend.onrender.com/api/v1/users/follow-user",
      {
        profile: profileId,
        follower: followerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
