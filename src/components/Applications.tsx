"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Modal, Table, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Applications({
  showApplications,
  setShowApplications,
  selectedProject,
}: {
  showApplications: boolean;
  setShowApplications: (ShowApplications: boolean) => void;
  selectedProject: any;
}) {
  const [applications, setApplications] = React.useState([]);
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?project=${selectedProject._id}`
      );
      console.log(response.data.data);
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });
      message.success(response.data.message);
      fetchApplications();
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
      title: "Applicant",
      dataIndex: "user",
      render: (user: any) => user.name,
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (user: any) => user.email,
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string, record: any) => (
        <select
          value={status}
          onChange={(e) => onStatusUpdate(record._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
  ];
  return (
    <Modal
      title={`Applications for ${selectedProject.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1000}
    >
      <div className="my-3">
        <Table columns={columns} dataSource={applications} />
      </div>
    </Modal>
  );
}

export default Applications;
