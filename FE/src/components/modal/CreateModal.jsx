import React, { useState } from "react";
import styles from "./CreateModal.module.scss";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";

const CreateModal = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      // 파일 확장자 검사
      const validExtensions = ["mov", "mp4", "zip"];
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        alert("Invalid file type. Only MOV, MP4, and ZIP files are allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!title || !file) {
      alert("제목과 파일 둘 다 필요합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", title);
    formData.append("createdBy", "Jeongyeob Shin"); // 실제 로그인 사용자 정보로 대체
    formData.append("date", new Date().toISOString().split("T")[0]);
    formData.append("video", file); // 임시로 업로드한 파일을 이미지 경로에 할당

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
            {file ? (
              <div className={styles.fileInfo}>
                <p>
                  {file.name} / {Math.round(file.size / 1024)} KB
                </p>
              </div>
            ) : (
              <div className={styles.fileInfo}>
                <p>Drag a file in this area or click Browse Button</p>
              </div>
            )}
            <input
              type="file"
              accept=".mov,.mp4,.zip"
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
