"use client";
import PageTitle from "@/components/PageTitle";
import ProjectPostForm from "@/components/ProjectPostForm";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

function EditProject() {
  const [projectData, setProjectData] = React.useState<any>(null);
  const router = useRouter();

  const { projectid } = useParams();

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      values._id = projectid;
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/projects/${projectid}`, values);
      message.success(response.data.message);
      router.push("/projects");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchProject = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/projects/${projectid}`);
      setProjectData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchProject();
  }, []);

  return (
    projectData && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle title=" Edit Project Post" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <Form layout="vertical" onFinish={onFinish} initialValues={projectData}>
          <ProjectPostForm />
          <div className="flex justify-end items-center gap-3 my-3">
            <Button type="default" onClick={() => router.back()}>
              Cancle
            </Button>
            <Button type="primary" htmlType="submit">
              Update Project
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditProject;
