import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";
import styles from "./Viewer.module.scss";
import { IoShareSocialOutline } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import { projects } from "../data/projects";

const Viewer = () => {
  const [source, setSource] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [projectCreatedBy, setProjectCreatedBy] = useState<string>("");
  const [projectDate, setProjectDate] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get("id");

    const project = projects.find((p) => p.id.toString() === projectId);
    if (project) {
      setSource(project.source);
      setProjectName(project.name); // 프로젝트 이름 설정
      setProjectCreatedBy(project.createdBy); // 프로젝트 이름 설정
      setProjectDate(project.date); // 프로젝트 날짜 설정
    } else {
      navigate("/"); // 잘못된 ID인 경우 홈으로 리다이렉트
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!canvasRef.current || !source) return;

    // Three.js 초기화
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.autoRotate = true; // 자동 회전 활성화
    controls.autoRotateSpeed = 1; // 회전 속도

    // Luma Splats 추가
    const splats = new LumaSplatsThree({
      source,
      loadingAnimationEnabled: false,
    });
    scene.add(splats);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, [source]);

  return (
    <div className={styles.viewer}>
      {/* Canvas for Three.js */}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>

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
