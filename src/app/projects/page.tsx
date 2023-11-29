"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Table, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Projects() {
  const [projects, setProjects] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/projects?user=${currentUser._id}`);
      console.log(response.data.data);
      setProjects(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/projects/${projectId}`);
      message.success(response.data.message);
      fetchProjects();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
    },
    {
      title: "Work Mode",
      dataIndex: "workMode",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteProject(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => router.push(`/projects/edit/${record._id}`)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Project" />
        <Button type="primary" onClick={() => router.push("/projects/new")}>
          New Project
        </Button>
      </div>

      <div className="my-2">
        <Table columns={columns} dataSource={projects} />
      </div>
    </div>
  );
}

export default Projects;
