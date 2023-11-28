"use client";
import PageTitle from "@/components/PageTitle";
import ProjectPostForm from "@/components/ProjectPostForm";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function NewProject() {
  const router = useRouter();

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/projects", values);
      message.success(response.data.message);
      router.push("/projects");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Project" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <ProjectPostForm />
        <div className="flex justify-end items-center gap-3 my-3">
          <Button type="default" onClick={() => router.back()}>
            Cancle
          </Button>
          <Button type="primary" htmlType="submit">
            Post Project
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewProject;
