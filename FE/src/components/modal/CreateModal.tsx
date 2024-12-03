import React, { useState } from "react";
import styles from "./CreateModal.module.scss";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";

interface CreateModalProps {
  onCancel: () => void; // Cancel 버튼 클릭 시 호출
}

const CreateModal: React.FC<CreateModalProps> = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !file) {
      alert("Title and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", title);
    formData.append("createdBy", "UserName"); // 실제 사용자 정보로 대체
    formData.append("date", new Date().toISOString());
    formData.append("image", file);
    formData.append("source", "https://example.com"); // 실제 소스 URL로 대체

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Project uploaded successfully.");
      onCancel(); // 모달 닫기
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Failed to upload project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            maxLength={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className={styles.closeButton} onClick={onCancel}>
            ✕
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <div className={styles.uploadArea}>
            <div className={styles.uploadIcon}>
              <IoCloudUploadOutline />
            </div>
            <p>Drag a file in this area or click Browse Button</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className={styles.browseButton}>
              Browse
            </label>
          </div>
        </div>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button
          className={styles.confirmButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
