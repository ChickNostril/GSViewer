import React from "react";
import styles from "./CreateModal.module.scss";
import { IoCloudUploadOutline } from "react-icons/io5";

interface CreateModalProps {
  onCancel: () => void; // Cancel 버튼 클릭 시 호출
}

const CreateModal: React.FC<CreateModalProps> = ({ onCancel }) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            maxLength={50}
          />
          <button className={styles.closeButton}>✕</button>
        </div>
        <div className={styles.uploadWrapper}>
          <div className={styles.uploadArea}>
            <div className={styles.uploadIcon}>
              <IoCloudUploadOutline />
            </div>
            <p>Drag a file in this area or click Browse Button</p>
            <button className={styles.browseButton}>Browse</button>
          </div>
        </div>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.confirmButton}>Confirm</button>
      </div>
    </div>
  );
};

export default CreateModal;
