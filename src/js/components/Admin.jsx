import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Tables from "./Tables";
import "../../css/main.scss";

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

    setSelectedUserType("");
    setEmail("");
    setPassword("");
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

  const Users = [
    { label: "Example", value: "" },
    { label: "Admin", value: "Admin" },
  ];

  return (
    <div className="admin_page">
      <Typography variant="h4" className="new_user_heading" color="#fff">
        Create User
      </Typography>
      <form onSubmit={createUser} className="user_types_form">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          size="small"
          onChange={(e, { value }) => setSelectedUserType(value)}
          options={userTypesData || Users}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="User Type" />}
        />

        <TextField
          required
          type="email"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          variant="outlined"
          style={{ width: 250 }}
        />
        <TextField
          required
          type="password"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          style={{ width: 250 }}
        />
        <Button
          color="primary"
          sx={{ width: "100" }}
          size="large"
          variant="outlined"
          disabled={
            createUserLoading ||
            !selectedUserType ||
            !email ||
            !password ||
            selectedUserType === ""
          }
          type="submit"
        >
          ADD USER
        </Button>
      </form>
      <Typography variant="h4" color="#fff">
        Existing Users
      </Typography>
      <Tables
        rows={[
          {
            id: 1,
            email: "timevko@gmail.com",
            name: "Tim Evko",
            roles: "admin",
            last_login: "2022-03-15T03:12:07.895Z",
            email_verified: true,
            user_id: "google-oauth2|108904416211598514133",
            login_count: 11,
            created_at: "2022-02-07T01:36:24.380Z",
          },
          {
            id: 2,
            email: "ryland.kieffer@outlawsnax.com",
            name: "ryland.kieffer@outlawsnax.com",
            roles: "admin",
            last_login: "2022-03-21T18:55:25.961Z",
            email_verified: false,
            user_id: "google-oauth2|108904416211598514133",
            login_count: 5,
            created_at: "2022-03-14T18:05:40.770Z",
          },
        ]}
        columns={[
          {
            field: "email",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "name",
            headerName: "Name",
            flex: 1,
          },
          {
            field: "roles",
            headerName: "User Type",
            flex: 1,
          },
          {
            field: "last_login",
            headerName: "Last Login",
            flex: 1,
          },
          {
            field: "email_verified",
            headerName: "Email Verified",
            flex: 1,
          },
          {
            field: "user_id",
            headerName: "User ID",
            flex: 1,
          },
          {
            field: "login_count",
            headerName: "Login Count",
            flex: 1,
          },
          {
            field: "created_at",
            headerName: "Created",
            flex: 1,
          },
        ]}
      />
    </div>
  );
}
