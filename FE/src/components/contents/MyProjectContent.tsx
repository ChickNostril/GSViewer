import React from "react";
import ProjectCard from "../ProjectCard";
import styles from "./Content.module.scss";

import { projects } from "../../data/projects";

const MyProjectContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>
          <p>Home /</p> My Projects
        </span>
        <button className={styles.viewAllButton}>
          <span>7 projects</span>
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

export default MyProjectContent;
