import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Viewer.module.scss";
import { IoShareSocialOutline } from "react-icons/io5";
import axios from "axios";
import { main } from "../viewer/main";

const Viewer = () => {
  const [source, setSource] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectCreatedBy, setProjectCreatedBy] = useState("");
  const [projectDate, setProjectDate] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const projectId = queryParams.get("id");

  //   const fetchProject = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/projects/${projectId}`
  //       );
  //       const project = response.data;
  //       setSource(project.source);
  //       setProjectName(project.name);
  //       setProjectCreatedBy(project.createdBy);
  //       setProjectDate(project.date);
  //     } catch (error) {
  //       console.error("Error fetching project:", error);
  //       navigate("/"); // 잘못된 ID인 경우 홈으로 리다이렉트
  //     }
  //   };

  //   fetchProject();
  // }, [location, navigate]);

  // useEffect(() => {
  //   const fetchDataAndStart = async () => {
  //     // FastAPI에서 파일 가져오기
  //     const req = await fetch("http://127.0.0.1:8000/get-file");

  //     if (!req.ok) {
  //       console.error("Failed to fetch the file.");
  //       return;
  //     }

  //     // main 함수에 Blob 전달
  //     await main(req);
  //   };

  //   fetchDataAndStart();
  // }, []);

  // useEffect(() => {
  //   const fetchDataAndStart = async () => {
  //     const queryParams = new URLSearchParams(location.search);
  //     const url = new URL(
  //       // "nike.splat", bicycle.splat, garden.splat, plush.splat, stump.splat, treehill.splat, truck.splat
  //       // location.href,
  //       queryParams.get("url") || "treehill.splat",
  //       "https://huggingface.co/cakewalk/splat-data/resolve/main/"
  //     );

  //     const req = await fetch(url, {
  //       mode: "cors", // no-cors, *cors, same-origin
  //       credentials: "omit", // include, *same-origin, omit
  //     });

  //     await main(req);
  //   };

  //   fetchDataAndStart();
  // }, []);

  useEffect(() => {
    let cleanup; // 클린업 함수 저장

    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("id");

      try {
        // 프로젝트 데이터 가져오기
        const response = await axios.get(
          `http://127.0.0.1:8000/projects/${projectId}`
        );
        const project = response.data;

        setSource(project.source);
        setProjectName(project.name);
        setProjectCreatedBy(project.createdBy);
        setProjectDate(project.date);

        // 파일 가져오기
        const req = await fetch(project.source);

        if (!req.ok) {
          throw new Error("Failed to fetch the file.");
        }

        // main 함수 실행
        cleanup = await main(req);
      } catch (error) {
        console.error("Error fetching project or file:", error);
        navigate("/"); // 잘못된 ID인 경우 홈으로 리다이렉트
      }
    };

    fetchData();

    // Cleanup 함수
    return () => {
      if (cleanup) cleanup();
    };
  }, [location, navigate]);

  return (
    <div className={styles.viewer} id="info">
      <div id="message"></div>
      <div className="scene" id="spinner"></div>
      {/* Canvas for Three.js */}
      <canvas id="canvas" className={styles.canvas}></canvas>
      {/* UI Overlay */}
      <div className={styles.ui}>
        {/* Logo Section */}
        <div className={styles.Logo}>
          <img
            src="/Logo.png"
            onClick={(e) => {
              e.stopPropagation(); // 메뉴 클릭 시 페이지 이동 방지
              navigate("/");
            }}
          />
        </div>
        {/* Info Section */}
        <div className={styles.info}>
          <p>
            Created by @{projectCreatedBy} | {projectDate}
          </p>
          <h2 className={styles.title}>{projectName}</h2>
        </div>

        {/* Share Button */}
        <button className={styles.share}>
          <div className={styles.icon}>
            <IoShareSocialOutline />
          </div>
        </button>

        {/* Help Button */}
        <button className={styles.help} onClick={toggleModal}>
          <span className={styles.helpText}>?</span>
        </button>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={toggleModal}>
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.iconContainer}>
                <div className={styles.key}>
                  <div className={styles.keyboard}>
                    <img
                      src="/icons/shift.png" // 마우스 아이콘 파일 경로
                      alt="shift Icon"
                    />
                  </div>
                  <div className={styles.keyboard}>
                    <img
                      src="/icons/keyboard.png" // 마우스 아이콘 파일 경로
                      alt="keyboard Icon"
                    />
                  </div>
                </div>
                <div className={styles.mouse}>
                  <img
                    src="/icons/leftClick.png" // 마우스 아이콘 파일 경로
                    alt="Mouse Icon"
                  />
                </div>
              </div>
              <h3>Controls</h3>
              <p>
                Click to focus on a point, drag to rotate and use arrow keys or
                WASD to move around.
              </p>
              <p>
                Hold <strong>⇪ Shift</strong> to move faster.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewer;
