"use client";
import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1>Researchly(src-app-page.tsx)</h1>
      <Button
        type="primary"
        onClick={() => {
          alert("Hello");
        }}
      >
        Primary Button
      </Button>
    </div>
  );
}
