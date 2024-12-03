import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HomeContent from "../components/contents/HomeContent";
import MyProjectContent from "../components/contents/MyProjectContent";
import CommunityContent from "../components/contents/CommunityContent";
import TutorialsContent from "../components/contents/TutorialsContent";

import styles from "./Home.module.scss";

const Home = () => {
  const [activeContent, setActiveContent] = useState("Home"); // 현재 활성화된 Content 상태

  // 현재 활성화된 Content에 따라 렌더링할 컴포넌트를 선택
  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        return <HomeContent />;
      case "MyProjects":
        return <MyProjectContent />;
      case "Community":
        return <CommunityContent />;
      case "Tutorials":
        return <TutorialsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <Sidebar setActiveContent={setActiveContent} />{" "}
        {/* 상태 업데이트 함수 전달 */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
