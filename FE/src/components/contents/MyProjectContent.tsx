import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";
import styles from "./Content.module.scss";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  createdBy: string;
  date: string;
  image: string;
  onDelete: string;
}

const MyProjectContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

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
            image={`http://127.0.0.1:8000/${project.image}`}
            onDelete={handleDelete} // 삭제 콜백 전달
          />
        ))}
      </div>
    </div>
  );
};

export default MyProjectContent;
