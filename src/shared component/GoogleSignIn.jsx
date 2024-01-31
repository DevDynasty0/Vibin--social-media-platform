import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const GoogleSignIn = () => {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await axios.post(
            "/api/v1/users/google-login",
            credentialResponse
          );
          console.log(res);
          window.location.reload();
        } catch (error) {
          console.log(error, "in google login");
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
};

GoogleSignIn.propTypes = {};

export default GoogleSignIn;
