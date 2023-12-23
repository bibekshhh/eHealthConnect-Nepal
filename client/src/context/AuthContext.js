import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkIfLoggedIn = async () => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      setUser(user);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/login`,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // check if the response is successful
      if (response.status === 200) {
        // save the user to localStorage
        localStorage.setItem("user", { ...response.data.user });
        // set the user to the state
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // remove the user from localStorage
    localStorage.removeItem("user");
    // set the user to null
    setUser(null);
  };

  const register = async (data) => {
    const { fName, lName, email, password } = data;

    const response = await axios.post(`http://localhost:3000/api/register`, {
      fName,
      lName,
      email,
      password,
    });
    // check if the response is successful
    if (response.status === 200) {
      // save the user to localStorage
      localStorage.setItem("user", response.data);
      // set the user to the state
      setUser(response.data);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
