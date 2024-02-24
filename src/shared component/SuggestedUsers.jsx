import { useEffect, useState } from "react";
import axios from "axios";
import RightButton from "./RightButton";
import getAccessToken from "../utils/getAccessToken";

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const token = getAccessToken();
  console.log(suggestedUsers);

  useEffect(() => {
    axios("/api/v1/users/suggested-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setSuggestedUsers(data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h4 className=" text-color-one text-opacity-85 underline font-semibold   mb-3">
        Suggested Friends
      </h4>
      {suggestedUsers?.map((user) => (
        <RightButton key={user._id} person={user} />
      ))}
    </>
  );
};

SuggestedUsers.propTypes = {};

export default SuggestedUsers;
