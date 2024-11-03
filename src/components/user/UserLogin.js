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
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin(prop) {
  const { getUserData } = prop;
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

  const navigate = useNavigate();
  function logInUser() {
    const userUrlLogIn = "http://localhost:5291/api/v1/users/signIn";
    axios
      .post(userUrlLogIn, userLogIn)
      .then((res) => {
        console.log(res, "response from log in");
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
        }
      })
      .then(() => getUserData())
      .then(() => navigate("/profile"))
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          // alert("Dont have an account, please register");
          alert(error.response.data.message);
        }
      });
  }
  return (
    <div>
      <h1> UserLogin </h1>
      <p>1234567An!</p>
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

      <div>
        <h1> Do not have an account yet?</h1>
        <Link to={"/register"}>
          <Button> Create an account</Button>
        </Link>
      </div>
    </div>
  );
}
