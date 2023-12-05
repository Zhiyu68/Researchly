"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Table, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?user=${currentUser._id}`
      );
      console.log(response.data.data);
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
    },
    {
      title: "Project Title",
      dataIndex: "project",
      render: (project: any) => project.title,
    },
    {
      title: "Researcher",
      dataIndex: "project",
      render: (project: any) => project.user.name,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Application" />
      </div>

      <div className="my-2">
        <Table columns={columns} dataSource={applications} />
      </div>
    </div>
  );
}

export default Applications;
