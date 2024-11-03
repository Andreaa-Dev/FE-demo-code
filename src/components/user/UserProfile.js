import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";

export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  console.log(userData, "userData from profile");
  // popover from MUI
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [newFirstName, setNewFirstName] = useState("");
  // get new information - firstName
  function onChangeHandlerFirstName(event) {
    setNewFirstName(event.target.value);
  }

  function updateUserProfile() {
    const token = localStorage.getItem("token");

    // send data to backend
    axios
      .patch(
        `http://localhost:5291/api/v1/users/${userData.id}`,
        {
          firstName: newFirstName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // BE: return user with new inf
        setUserData(res.data);
        setAnchorEl(null);
      })
      .catch((error) => console.log(error));
  }

  function logOutHandler() {
    // remove token from local storage
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <div>
      <h1> UserProfile page </h1>
      <p>Email: {userData.email}</p>
      <p>FirstName: {userData.firstName}</p>
      <p>Role: {userData.role}</p>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Edit
      </Button>
      <Button variant="contained" onClick={logOutHandler}>
        Log out
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TextField
          id="firstName"
          label="First Name"
          variant="standard"
          helperText="Please enter your new first name"
          onChange={onChangeHandlerFirstName}
        />
        <Button onClick={updateUserProfile}> Edit </Button>
      </Popover>
    </div>
  );
}
