import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

export default function UserItem(prop) {
  const { user, fetchUserList } = prop;
  // method: delete
  // http://localhost:5291/api/v1/users/userId
  // token

  function deleteUser() {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5291/api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("A user is deleted");
          fetchUserList();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <p> Email: {user.email}</p>
      <p> Role: {user.role}</p>
      <Button onClick={deleteUser}> Delete </Button>
    </div>
  );
}
