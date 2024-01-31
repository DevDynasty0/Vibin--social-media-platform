import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../redux/features/auth/authApi";

const GoogleSignIn = () => {
  const [googleLogin] = useGoogleLoginMutation();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await googleLogin(credentialResponse);
          if (res?.data?.success) {
            window.location.reload();
          }
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
export default GoogleSignIn;
