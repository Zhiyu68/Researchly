"use client";
import React from "react";
import { Button, ConfigProvider, Space } from "antd";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
