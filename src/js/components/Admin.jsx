import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function Admin(props) {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    window
      .fetch(`${window.API_BASE_URL}/users`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const role = props["https://mzfweb2.adssglobal.net/api/roles"];
  if (role[0] !== "Admin") return <h1>Access Denied</h1>;

  const userTypes = useFetch(`${window.API_BASE_URL}/user-types`);

  const createUser = (e) => {
    e.preventDefault();
    setCreateUserLoading(true);
    window
      .fetch(`${window.API_BASE_URL}/create-user`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
          "Content-Type": "application/json",
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
        // clear form fields
        setEmail(null);
        setPassword(null);
        setSelectedUserType(null);
        // stop loading
        setCreateUserLoading(false);
        // refresh users
        getAllUsers();
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setCreateUserLoading(true);
      window
        .fetch(`${window.API_BASE_URL}/delete-user/${id}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
            "Content-Type": "application/json",
          },
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error)
            alert("There was a problem deleting the user. Please try again.");
        })
        .catch((err) => {
          alert("There was a problem deleteing the user. Please try again.");
        })
        .finally(() => {
          // refresh users
          getAllUsers();
        });
    }
  };

  const changeUserEmail = (id, email) => {
    if (window.confirm("Are you sure you want to change this user's email?")) {
      setCreateUserLoading(true);
      window
        .fetch(`${window.API_BASE_URL}/update-user-email/${id}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            email,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(
              "There was a problem changing the user's email. Please try again."
            );
          }
        })
        .catch((err) => {
          alert(
            "There was a problem changing the user's email. Please try again."
          );
        })
        .finally(() => {
          // refresh users
          getAllUsers();
        });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (userTypes.loading) return <p>Loading...</p>;
  if (userTypes.error) return <p>Error: {error.message}</p>;

  console.log(users);

  return (
    <div>
      <h1>Admin</h1>
      <h2>User Types</h2>
      <form onSubmit={createUser}>
        <select onChange={(e) => setSelectedUserType(e.target.value)}>
          <option value="">Select a user type</option>
          <option value="Admin">Admin</option>
          {(userTypes?.data || []).map((userType) => (
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
