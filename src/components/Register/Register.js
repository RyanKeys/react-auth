import React, { useState } from "react";
import PropTypes from "prop-types";

async function registerUser(credentials) {
  return fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Register({ setToken }) {
  const [errors, setErrors] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await registerUser({
      firstName,
      lastName,
      email,
      password,
      password2,
    });
    if (token[0] !== undefined) {
      setErrors(token[0].error);
    } else {
      setToken(token);
    }
  };
  if (errors) {
    return (
      <div className="login-wrapper">
        <h1>Create an Account</h1>
        <h3>Error: {errors}</h3>

        <form onSubmit={handleSubmit}>
          <label>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <p>Email</p>
            <input
              type="text"
              name="email"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>Repeat Password</p>
            <input
              type="password"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="login-wrapper">
      <h1>Create an Account</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="text"
            name="email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Repeat Password</p>
          <input
            type="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};
