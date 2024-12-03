import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import styles from "./HomeContent.module.scss";
import { FaChevronRight } from "react-icons/fa";

import { projects } from "../data/projects";

const HomeContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Recent Projects</span>
        <button className={styles.viewAllButton}>
          <span>전체보기</span>
          <FaChevronRight className={styles.icon} />
        </button>
      </div>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            createdBy={project.createdBy}
            date={project.date}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
