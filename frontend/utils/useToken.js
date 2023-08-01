import { useEffect, useState } from "react";

export default function useToken() {
  const [tokenString, setTokenString] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    setTokenString(sessionStorage.getItem("token"));
    setToken(getToken());
    setUser(getUser());
  }, [, tokenString]);

  const getUser = () => {
    try {
      const userToken = JSON.parse(tokenString);
      return userToken?.user;
    } catch (error) {
      return null;
    }
  };
  const getToken = () => {
    try {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    } catch (error) {
      return null;
    }
  };

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    user,
    token,
    setToken: saveToken,
  };
}
