import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  return (
    <div className="admin_page">
      <Typography variant="h4" className="new_user_heading" color="secondary">
        Create User
      </Typography>

      <form onSubmit={createUser} className="user_types_form">
        <Box sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUserType}
              label="User Type"
              onChange={(e) => setSelectedUserType(e.target.value)}
            >
              <MenuItem value="">Select a user</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              {(userTypesData || []).map((userType) => (
                <MenuItem key={userType.VENDORID} value={userType.VENDNAME}>
                  {userType.VENDNAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          required
          type="email"
          size="large"
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <TextField
          required
          type="password"
          size="large"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <Button
          color="primary"
          style={{ width: "100%" }}
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
    </div>
  );
}
