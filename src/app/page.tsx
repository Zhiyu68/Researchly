"use client";
import { Col, Row, message } from "antd";
import Divider from "@/components/Divider";
import axios from "axios";
import React from "react";
import { SetLoading } from "@/redux/loaderSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Filters from "@/components/Filters";

function Home() {
  const [filters, setFilters] = React.useState({
    searchText: "",
    location: "",
  });
  const router = useRouter();
  const [projects = [], setProjects] = React.useState([]);

  const dispatch = useDispatch();
  const fetchProjects = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/projects`, { params: filters });

      setProjects(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Filters
        filters={filters}
        setFilters={setFilters}
        getData={fetchProjects}
      />
      <Row>
        {projects.map((project: any) => (
          <Col
            span={8}
            className="p-2"
            key={project._id}
            onClick={() => router.push(`/projectinfo/${project._id}`)}
          >
            <div className="card flex flex-col gap-2 py-3 cursor-pointer p-3">
              <h1 className="text-md">{project.title}</h1>
              <Divider />

              <div className="flex justify-between">
                <span>Researcher</span>
                <span>{project.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span>{project.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Salary</span>
                <span>
                  £{project.salaryFromRange} - £{project.salaryToRange}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Work Mode</span>
                <span>{project.workMode}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default Home;
