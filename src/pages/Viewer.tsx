import React, { useState } from "react";
import styles from "./Viewer.module.scss";

const Viewer = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <div className={styles.viewer}>
      {/* Viewer Background */}
      <div className={styles.background}></div>

      {/* Info Section */}
      <div className={styles.info}>
        <p>Example Info Text</p>
        <h2 className={styles.title}>Example Title</h2>
      </div>

      {/* Share Button */}
      <button className={styles.share} onClick={toggleModal}>
        <div className={styles.iconShape}></div>
      </button>

      {/* Help Button */}
      <button className={styles.help}>
        <div className={styles.iconShape}></div>
        <span className={styles.helpText}>?</span>
      </button>

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
              <h3>Modal Title</h3>
              <p>Modal Content Text</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewer;
