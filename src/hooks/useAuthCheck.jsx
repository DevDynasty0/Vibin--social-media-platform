import { useEffect, useState } from "react";
import useGetCurrentUser from "./useGetCurrentUser";

export default function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useGetCurrentUser();
  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      setUser(auth);
    }
    setLoading(false);
  }, [setUser]);

  

  return { user, loading };
}
