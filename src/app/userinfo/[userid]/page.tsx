"use client";
import PageTitle from "@/components/PageTitle";
import ResearcherInfo from "@/components/ResearcherInfo";
import StudentInfo from "@/components/StudentInfo";
import { SetLoading } from "@/redux/loaderSlice";
import { message } from "antd";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function UserInfo() {
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const { userid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/users/${userid}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === "researcher" ? "Researcher" : "Student"
          } Info`}
        />
        {userInfo.userType === "researcher" ? (
          <ResearcherInfo />
        ) : (
          <StudentInfo />
        )}
      </div>
    )
  );
}

export default UserInfo;
