"use client";
import PageTitle from "@/components/PageTitle";
import ProjectPostForm from "@/components/ProjectPostForm";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Col, Form, Row, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Divider from "@/components/Divider";

function ProjectInfo() {
  const { currentUser } = useSelector((state: any) => state.users);
  const [projectData, setProjectData] = React.useState<any>(null);
  const [applications = [], setApplications] = React.useState<any[]>([]);
  const router = useRouter();
  const { projectid } = useParams();
  const dispatch = useDispatch();

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

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications/?project=${projectid}&user=${currentUser._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchProject();
    fetchApplications();
  }, []);

  const onApply = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post(`/api/applications`, {
        project: projectData._id,
        user: currentUser._id,
        status: "pending",
      });
      message.success(response.data.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    projectData && (
      <div>
        <PageTitle title={projectData.title} />

        <Row gutter={[16, 16]} className="gap-3">
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Researcher</span>
              <span>{projectData.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{projectData.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                £{projectData.salaryFromRange} - £{projectData.salaryToRange}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{projectData.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Project Type</span>
              <span>{projectData.projectType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{projectData.experience} Years</span>
            </div>
          </Col>

          <Col span={24} className="flex flex-col gap-2">
            <h1 className="text-md">Project Description</h1>
            <Divider />
            <span>{projectData.description}</span>
            {applications.length > 0 && (
              <span className="my-3 p-3 info">
                You have already applied for this job. Please wait for the
                researcher to respond
              </span>
            )}

            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={onApply}
                disabled={
                  currentUser.userType === "researcher" ||
                  applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default ProjectInfo;
