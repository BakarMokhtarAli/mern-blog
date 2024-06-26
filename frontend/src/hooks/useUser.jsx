import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expirationTime)) {
        setUser(JSON.parse(storedUser));
      } else {
        logOut();
      }
    }
  }, []);

  const logIn = (userData, expiresIn) => {
    // 07-01-2024
    const expirationTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem("expirationTime", expirationTime.toString());
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
