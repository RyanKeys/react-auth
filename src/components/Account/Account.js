import React, { useEffect, useState } from "react";
import "./Account.css";
export default function Account() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const userInfo = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8080/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: token,
      });
      const newData = await response.json();
      console.log(newData);
      setEmail(newData.email);
      setFirstName(newData.firstName);
      setLoading(false);
    };
    userInfo();
  }, [token]);
  if (!loading) {
    return (
      <div className="account">
        <h2>{firstName}'s Account</h2>
        <p>{email}</p>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
