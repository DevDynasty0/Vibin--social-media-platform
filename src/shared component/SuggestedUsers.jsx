import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  console.log(suggestedUsers);

  useEffect(() => {
    axios("/api/v1/users/suggested-users")
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
        <RightButton key={user._id} user={user} />
      ))}
    </>
  );
};

SuggestedUsers.propTypes = {};

export default SuggestedUsers;
