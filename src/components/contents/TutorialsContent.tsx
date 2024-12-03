import React from "react";
import ProjectCard from "../ProjectCard";
import styles from "./Content.module.scss";
import { FaChevronRight } from "react-icons/fa";

import { projects } from "../../data/projects";

const TutorialsContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>
          <p>Home / </p>Tutorials
        </span>
      </div>
      <button className={styles.wiki}>
        <p>튜토리얼 위키 페이지로 이동</p>
      </button>
    </div>
  );
};

export default TutorialsContent;
