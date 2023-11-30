"use client";
import { Modal } from "antd";
import React from "react";

function Applications({
  showApplications,
  setShowApplications,
  selectedProject,
}: {
  showApplications: boolean;
  setShowApplications: (ShowApplications: boolean) => void;
  selectedProject: any;
}) {
  return (
    <Modal
      title="Applications"
      open={showApplications}
      onCancel={() => setShowApplications(false)}
    ></Modal>
  );
}

export default Applications;
