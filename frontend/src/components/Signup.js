import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Signup

  const signupUser = async (e) => {
    e.preventDefault();
    console.log("Signup called")
    const promise = account.create(
      uuid(),
      user.email,
      user.password,
      user.name
    );
        console.log(promise ," called promise")
    promise.then(
      function (res) {
        console.log(res);
        navigate("/login"); //success
      },
      function (err) {
        console.log(err); // failed
      }
    );
  };

  return (
    <div>
      <div>Sign Up</div>
      <form action="#" method="POST">
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            onChange={(e) => {
              setUser({
                ...user,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <button type="submit" onClick={signupUser}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
