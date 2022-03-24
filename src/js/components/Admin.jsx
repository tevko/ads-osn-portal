import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Admin(props) {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [createUserLoading, setCreateUserLoading] = useState(false);

  const role = props["https://mzfweb2.adssglobal.net/api/roles"];
  if (role[0] !== "Admin") return <h1>Access Denied</h1>;

  const { userTypesData, userTypeserror, userTypesloading } = useFetch(
    `${window.API_BASE_URL}/user-types`
  );

  const createUser = (e) => {
    e.preventDefault();
    setCreateUserLoading(true);
    window
      .fetch(`${window.API_BASE_URL}/create-user`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          userRole: selectedUserType,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          alert("There was a problem creating the user. Please try again.");
      })
      .catch((err) => {
        alert("There was a problem creating the user. Please try again.");
      })
      .finally(() => {
        setCreateUserLoading(false);
      });
  };

  if (userTypesloading) return <p>Loading...</p>;
  if (userTypeserror) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Admin</h1>
      <h2>User Types</h2>
      <form onSubmit={createUser}>
        <select onChange={(e) => setSelectedUserType(e.target.value)}>
          <option value="">Select a user type</option>
          <option value="Admin">Admin</option>
          {(userTypesData || []).map((userType) => (
            <option key={userType.VENDORID} value={userType.VENDNAME}>
              {userType.VENDNAME}
            </option>
          ))}
        </select>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          disabled={
            createUserLoading ||
            !selectedUserType ||
            !email ||
            !password ||
            selectedUserType === ""
          }
          type="submit"
        >
          Add User Type
        </button>
      </form>
    </div>
  );
}
