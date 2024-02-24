const getAccessToken = () => {
  const localAuth = localStorage?.getItem("auth");
  const auth = JSON.parse(localAuth);
  return auth?.accessToken;
};

export default getAccessToken;
