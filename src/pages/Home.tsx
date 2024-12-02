import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HomeContent from "../components/HomeContent";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <HomeContent />
      </div>
    </div>
  );
};

export default Home;
