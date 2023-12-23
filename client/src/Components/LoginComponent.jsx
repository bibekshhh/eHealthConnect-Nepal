import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginComponent = ({}) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      alert("Please enter email and password");
      return;
    }

    login(data.email, data.password);
  };

  return (
    <div>
      <h1>Login as Doctor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <style jsx>{``}</style>
    </div>
  );
};

export default LoginComponent;
