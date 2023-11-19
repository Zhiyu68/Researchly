"use client";
import React from "react";
import { Button, Form, Radio } from "antd";
import Link from "next/link";
import { log } from "console";

function Login() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-450 p-5">
        <h1 className="text-xl">Researchly - Login</h1>
        <hr />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Login As" name="userType">
            <Radio.Group>
              <Radio value="researcher"> Researcher</Radio>
              <Radio value="student"> Student</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <Link href="/register"> Don't have an account? Register </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
