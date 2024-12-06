import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";
import styles from "./Content.module.scss";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";

const HomeContent = () => {
  const [projects, setProjects] = useState([]);

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

  const handleDelete = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

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
            status={project.status}
            onDelete={handleDelete} // 삭제 콜백 전달
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
