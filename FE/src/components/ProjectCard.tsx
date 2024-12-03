import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectCard.module.scss";
import { FaEllipsisV, FaInfoCircle, FaTrashAlt } from "react-icons/fa";

interface ProjectCardProps {
  id: number;
  name: string;
  createdBy: string;
  date: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  createdBy,
  date,
  image,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCardClick = () => {
    navigate(`/viewer?id=${id}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.card} ref={cardRef} onClick={handleCardClick}>
      {/* 이미지 영역 */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={`${name} Thumbnail`} className={styles.image} />
        <span className={styles.projectCreatedBy}>@{createdBy}</span>
      </div>

      {/* 프로젝트 정보 영역 */}
      <div className={styles.infoWrapper}>
        <div className={styles.projectInfo}>
          <span className={styles.projectName}>{name}</span>
          <span className={styles.projectDate}>{date}</span>
        </div>

        {/* 옵션 버튼 */}
        <button
          className={styles.menuButton}
          onClick={(e) => {
            e.stopPropagation(); // 메뉴 클릭 시 페이지 이동 방지
            toggleMenu();
          }}
        >
          <FaEllipsisV />
        </button>

        {/* 드롭다운 메뉴 */}
        {isMenuOpen && (
          <div className={styles.menu}>
            <button className={styles.menuItem}>
              <FaInfoCircle className={styles.menuIcon} />
              <span>정보</span>
            </button>
            <button className={styles.menuItem}>
              <FaTrashAlt className={styles.menuIcon} />
              <span>삭제</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
