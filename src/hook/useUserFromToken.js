import { useState, useEffect } from "react";

function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export default function useUserFromToken() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  return user;
}