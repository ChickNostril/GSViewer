import React from "react";
import ProjectCard from "../ProjectCard";
import styles from "./Content.module.scss";
import { FaChevronRight } from "react-icons/fa";

import { projects } from "../../data/projects";

const CommunityContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>
          <p>Home / </p>Community
        </span>
        <button className={styles.viewAllButton}>
          <span>0 projects</span>
        </button>
      </div>
      <div className={styles.projectList}>
        {/* {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            createdBy={project.createdBy}
            date={project.date}
            image={project.image}
          />
        ))} */}
      </div>
    </div>
  );
};

export default CommunityContent;
