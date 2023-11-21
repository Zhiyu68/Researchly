"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  const menuitems = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ];

  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider theme={{ token: { colorPrimary: "#213555" } }}>
          {/* if route is login or register , dont show layout */}

          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            <div className="layout-parent">
              <div className="sidebar">
                <div className="logo">
                  {isSidebarExpanded && <h1>RESEARCHLY</h1>}

                  {!isSidebarExpanded && (
                    <i
                      className="ri-menu-2-line"
                      onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    ></i>
                  )}
                  {isSidebarExpanded && (
                    <i
                      className="ri-close-line"
                      onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    ></i>
                  )}
                </div>

                <div className="menu-items">
                  {menuitems.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                      <div
                        className={`menu-item ${
                          isActive ? "active-menu-item" : ""
                        }`}
                        style={{
                          justifyContent: isSidebarExpanded
                            ? "flex-start"
                            : "center",
                        }}
                      >
                        <i className={item.icon}></i>
                        <span>{isSidebarExpanded && item.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="user-info">
                  {isSidebarExpanded && (
                    <div className="flex flex-col">
                      <span>User Name</span>
                      <span>User Email</span>
                    </div>
                  )}
                  <i className="ri-logout-box-r-line"></i>
                </div>
              </div>
              <div className="body">{children}</div>
            </div>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
