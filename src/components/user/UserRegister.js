import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  // step 1: get both email + password from form
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });

  // way 1
  //   function onChangeHandlerEmail(event) {
  //     setUserInformation({ ...userInformation, email: event.target.value });
  //   }

  //   function onChangeHandlerPassword(event) {
  //     setUserInformation({ ...userInformation, password: event.target.value });
  //   }

  console.log(userInformation, "user");

  // way 2: combine 2 functions to 1
  function onChangeHandler(event) {
    setUserInformation({
      ...userInformation,
      [event.target.id]: event.target.value,
    });
  }
  console.log(userInformation, "user");

  // navigate
  const navigate = useNavigate();
  // step 2: send to backend
  function registerNewUser() {
    const userUrl = "http://localhost:5291/api/v1/users/register";
    // method: POST
    // body: {email: "user1@gmail.com", password: "16394"}
    // axios.post(url,body);

    axios
      .post(userUrl, userInformation)
      .then((res) => {
        console.log(res, "response form post");
        if (res.status === 200) {
          // navigate to login
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        // show error on screen
        // email
        if (err.status === 400) {
          if (err.response.data.errors.Email) {
            alert(err.response.data.errors.Email[0]);
            return;
          }
          if (err.response.data.errors.Password) {
            alert(err.response.data.errors.Password[0]);
            return;
          }
        }
      });
  }
  // step3: axios
  // oke => navigate to log in
  // not => show error

  // 123456aA!

  return (
    <div>
      <h1>UserRegister </h1>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        helperText="Please enter your email"
        // onChange={onChangeHandlerEmail}
        onChange={onChangeHandler}
      />

      <TextField
        id="password"
        label="Password"
        variant="standard"
        helperText="Please enter your password"
        // onChange={onChangeHandlerPassword}
        onChange={onChangeHandler}
      />
      <Button onClick={registerNewUser}> Register</Button>
    </div>
  );
}
