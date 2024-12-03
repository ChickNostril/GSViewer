import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Modal from "./modal/Modal";
import CreateModal from "./modal/CreateModal";
import { FaHome, FaFolder, FaUsers, FaSearch, FaPlus } from "react-icons/fa";

interface SidebarProps {
  setActiveContent: React.Dispatch<React.SetStateAction<string>>; // 타입 지정
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveContent }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [activeNav, setActiveNav] = useState("Home"); // 현재 활성화된 메뉴 상태

  const handleNavClick = (nav: string) => {
    setActiveNav(nav); // 활성화된 메뉴 업데이트
    setActiveContent(nav); // 부모 컴포넌트에 상태 전달
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.nameContainer}>
            <span className={styles.name}>Jeongyeob Shin</span>
          </div>
          <div className={styles.emailContainer}>
            <span className={styles.email}>strike0626@ncsoft.com</span>
          </div>
        </div>

        <div className={styles.newProjectContainer}>
          <button className={styles.button} onClick={openModal}>
            <FaPlus className={styles.icon} />
            <span className={styles.text}>새 프로젝트 만들기</span>
          </button>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li
              className={`${styles.navItem} ${
                activeNav === "Home" ? styles.active : ""
              }`}
              onClick={() => handleNavClick("Home")}
            >
              <FaHome className={styles.icon} />
              <span>Home</span>
            </li>
            <li
              className={`${styles.navItem} ${
                activeNav === "MyProjects" ? styles.active : ""
              }`}
              onClick={() => handleNavClick("MyProjects")}
            >
              <FaFolder className={styles.icon} />
              <span>My Projects</span>
            </li>
            <li
              className={`${styles.navItem} ${
                activeNav === "Community" ? styles.active : ""
              }`}
              onClick={() => handleNavClick("Community")}
            >
              <FaUsers className={styles.icon} />
              <span>Community</span>
            </li>
            <li
              className={`${styles.navItem} ${
                activeNav === "Tutorials" ? styles.active : ""
              }`}
              onClick={() => handleNavClick("Tutorials")}
            >
              <FaSearch className={styles.icon} />
              <span>Tutorials</span>
            </li>
          </ul>
        </nav>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateModal onCancel={closeModal} />
        </Modal>
      </aside>
    </>
  );
};

export default Sidebar;
