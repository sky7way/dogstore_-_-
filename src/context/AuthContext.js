import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.react-learning.ru/v2/gr-9/users/me",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const responce = await res.json();
      setCurrentUser(responce);
      console.log(responce);
    };

    fetchData();
  }, []);
  return (
    // {{children}}
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
