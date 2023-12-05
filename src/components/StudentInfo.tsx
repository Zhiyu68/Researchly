import { Row, Col, Table } from "antd";
import React from "react";

function StudentInfo({ studentInfo }: { studentInfo: any }) {
  return (
    <>
      <Row>
        <Col span={12}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span>Name</span>
              <span>{studentInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <span>{studentInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <span>{studentInfo.phone}</span>
            </div>
          </div>
        </Col>

        <Col span={24} className="my-3">
          <h1 className="text-md">
            <b>carrier Objective</b>
          </h1>
          <span>{studentInfo.carrierObjective}</span>
        </Col>

        <Col span={24} className="my-3">
          <h1 className="text-md">
            <b>Education</b>
          </h1>
          <Table
            dataSource={studentInfo.education}
            columns={[
              {
                title: "Qualification",
                dataIndex: "qualification",
              },
              {
                title: "Institution",
                dataIndex: "institution",
              },
              {
                title: "Percentage",
                dataIndex: "percentage",
              },
            ]}
            pagination={false}
          />
        </Col>

        <Col span={24} className="my-3">
          <h1 className="text-md">
            <b>Skills</b>
          </h1>
          <Table
            dataSource={studentInfo.skills}
            columns={[
              {
                title: "Technology",
                dataIndex: "technology",
              },
              {
                title: "Rating ( out of 10 )",
                dataIndex: "rating",
              },
            ]}
          />
        </Col>

        <Col span={24} className="my-3">
          <h1 className="text-md">Experience</h1>
          <Table
            dataSource={studentInfo.experience}
            columns={[
              {
                title: "Organization",
                dataIndex: "organization",
              },
              {
                title: "Project",
                dataIndex: "project",
              },
              {
                title: "Period (from - to)",
                dataIndex: "period",
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}

export default StudentInfo;
