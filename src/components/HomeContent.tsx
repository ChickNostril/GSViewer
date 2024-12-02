import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./HomeContent.module.scss";
import { FaChevronRight } from "react-icons/fa";

const HomeContent = () => {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      date: "2024-11-28 / 15:55:27",
      image: "https://loremflickr.com/250/250",
    },
    {
      id: 2,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://baconmockup.com/250/250",
    },
    {
      id: 3,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://picsum.photos/250/250",
    },
    {
      id: 4,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://placebear.com/250/250",
    },
    {
      id: 5,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://placebeard.it/250/250",
    },
    {
      id: 6,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 7,
      name: "Project 2",
      date: "2024-11-28 / 16:00:00",
      image: "https://via.assets.so/game.jpg?w=250&h=250",
    },
  ];

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
            date={project.date}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
