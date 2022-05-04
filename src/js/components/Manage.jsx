import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import Tables from "./Tables";
import "../../css/main.scss";

export default function Manage(props) {
  const [newPassword, setNewPassword] = useState(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [user, setUser] = useState([]);

  const changeUserPassword = (id, password) => {
    if (window.confirm("Are you sure you want to change your password?")) {
      setCreateUserLoading(true);
      window
        .fetch(`${window.API_BASE_URL}/update-user-password/${id}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            password,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(
              "There was a problem changing the user's password. Please try again."
            );
          } else {
            alert("User's password successfully changed.");
          }
        })
        .catch((err) => {
          alert(
            "There was a problem changing the user's password. Please try again."
          );
        })
        .finally(() => {
          // refresh users
          getAllUsers();
        });
    }
  };
  const getUser = () => {
    window
      .fetch(`${window.API_BASE_URL}/user/${props.user.email}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const passReq =
    "Passwords must have at least 8 characters and contain at least one uppercase letter and one number.";

  const rstPass = "Reset Password";

  return (
    <div className="admin_page">
      <Typography variant="h4" color="#fff">
        Manage
      </Typography>
      <Tables
        rows={user.map((user) => ({
          roles: user.app_metadata.authorization.roles[0],
          ...user,
        }))}
        getRowId={(row) => row.user_id}
        columns={[
          {
            field: "email",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "roles",
            headerName: "User Type",
            flex: 1,
          },
          {
            field: "email_verified",
            headerName: "Email Verified",
            flex: 1,
          },
          {
            field: "created_at",
            headerName: "Created",
            flex: 1,
          },
          {
            field: "deleteUser",
            headerName: "Manage User",
            flex: 1,
            align: "center",
            sortable: false,
            renderCell: (i) => (
              <>
                {i.row.identities[0].connection ===
                  "Username-Password-Authentication" && (
                  <Tooltip title={rstPass} arrow>
                    <LockResetIcon
                      className="pass_icon"
                      title="Change password"
                      fontSize="medium"
                      onClick={() => setPasswordModalVisible({ user: i.row })}
                    />
                  </Tooltip>
                )}
              </>
            ),
          },
        ]}
      />
      {passwordModalVisible && (
        <div className="full_screen_modal">
          <div className="full_screen_modal_inner">
            <h3>
              Enter new password for {passwordModalVisible.user?.nickname}
            </h3>
            <form
              onSubmit={() => {
                changeUserPassword(
                  passwordModalVisible.user?.user_id,
                  newPassword
                );
                setPasswordModalVisible(false);
                setNewPassword(null);
              }}
            >
              <Tooltip title={passReq} arrow>
                <TextField
                  required
                  type="password"
                  size="small"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  label="Password"
                  variant="outlined"
                  style={{ width: 250 }}
                />
              </Tooltip>
              <Button
                color="primary"
                sx={{ width: 100 }}
                size="large"
                variant="contained"
              >
                Change Password
              </Button>
            </form>
          </div>
          <CloseIcon
            className="close_modal"
            onClick={() => setPasswordModalVisible(false)}
            fontSize="large"
            color="#fff"
          ></CloseIcon>
        </div>
      )}
    </div>
  );
}
