import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function UserLogin() {
  // password from MUI
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // handle form
  const [userLogIn, setUserLogIn] = useState({
    email: "",
    password: "",
  });

  function onChangeHandlerEmailLogIn(event) {
    setUserLogIn({ ...userLogIn, email: event.target.value });
  }

  function onChangeHandlerPasswordLogIn(event) {
    setUserLogIn({ ...userLogIn, password: event.target.value });
  }

  // onclick
  function logInUser() {
    const userUrlLogIn = "http://localhost:5291/api/v1/users/signIn";

    // send req to backend
    axios
      .post(userUrlLogIn, userLogIn)
      .then((res) => {
        console.log(res, "response from log in");
        // token = res.data
        if (res.status === 200) {
          // save to local storage
          localStorage.setItem("token", res.data);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <h1> UserLogin </h1>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        helperText="Please enter your email"
        onChange={onChangeHandlerEmailLogIn}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onChangeHandlerPasswordLogIn}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button onClick={logInUser}> Log in</Button>
    </div>
  );
}
