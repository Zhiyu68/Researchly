"use client";
import React from "react";
import { Button, ConfigProvider, Space } from "antd";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={{ token: { colorPrimary: "#213555" } }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
