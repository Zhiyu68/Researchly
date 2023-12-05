import { Col, Row } from "antd";
import React from "react";
import Divider from "./Divider";

function ResearcherInfo({ researcherInfo }: { researcherInfo: any }) {
  return (
    <Row>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Researcher Name</span>
            <span>{researcherInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Establishment Year</span>
            <span>{researcherInfo.establishmentYear}</span>
          </div>
          <div className="flex justify-between">
            <span>Researcher Size</span>
            <span>{researcherInfo.researcherSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{researcherInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone</span>
            <span>{researcherInfo.phone}</span>
          </div>
          <div className="flex justify-between">
            <span>Website</span>
            <span>{researcherInfo.website}</span>
          </div>
          <div className="flex justify-between">
            <span>Address</span>
            <span>{researcherInfo.address}</span>
          </div>
        </div>
      </Col>

      <Col span={24} className="my-3">
        <Divider />
        <h1 className="text-md">
          <b>About</b>
        </h1>

        <span>{researcherInfo.about}</span>
      </Col>
    </Row>
  );
}

export default ResearcherInfo;
