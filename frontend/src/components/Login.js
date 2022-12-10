import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { account } from "../appwrite/appwriteConfig";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(user.password);
    try {
      await account.createEmailSession(user.email, user.password);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Login</div>
      <form action="#" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button type="submit" onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
