import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Tables from "./Tables";
import ColumnsOne from "./data/Columns";
import RowsOne from "./data/Rows";
import "../../css/main.scss";

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

  const Users = [
    { label: "Select a User", value: "" },
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
          options={userTypesData || Users}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Users" />}
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
      <Tables rows={RowsOne} columns={ColumnsOne} />
    </div>
  );
}
