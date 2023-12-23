import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegisterComponent = ({}) => {
  const history = useHistory();
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !data.fName ||
      !data.lName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(data);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/register`,
        JSON.stringify({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          password: data.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      history.push("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register Doctor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            value={data.fName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            value={data.lName}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <style jsx>{``}</style>
    </div>
  );
};

export default RegisterComponent;
