"use client";
import React from "react";
import { Button } from "antd";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Button
        type="primary"
        onClick={() => {
          alert("Hello");
        }}
      >
        login Primary Button
      </Button>
    </div>
  );
}

export default Login;
