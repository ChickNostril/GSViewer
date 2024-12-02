import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { LuFilePlus } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // 외부 영역 클릭 시 모달 닫기
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalIcon}>
            <LuFilePlus />
          </div>
          <div className={styles.header}>
            <h2>Create</h2>
            <p>
              HDR을 비활성화한 상태로 천천히 가슴, 머리 위, 무릎 높이에서 각각
              루프 형태로 촬영하세요.
            </p>
            <p>
              최대 5GB까지 일반, 야간, 또는 구면 영상을 업로드하거나 압축된
              폴더로 제출 가능합니다.
            </p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
