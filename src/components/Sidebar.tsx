import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Modal from "./modal/Modal";
import CreateModal from "./modal/CreateModal";
import { FaHome, FaFolder, FaUsers, FaSearch, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
            <li className={styles.navItem}>
              <FaHome className={styles.icon} />
              <span>Home</span>
            </li>
            <li className={styles.navItem}>
              <FaFolder className={styles.icon} />
              <span>My Projects</span>
            </li>
            <li className={styles.navItem}>
              <FaUsers className={styles.icon} />
              <span>Community</span>
            </li>
            <li className={styles.navItem}>
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
