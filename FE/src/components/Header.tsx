import React from "react";
import styles from "./Header.module.scss";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <h1 className={styles.logo}>
          VARCO<p>GSViewer</p>
        </h1>
      </div>

      {/* 오른쪽 로그아웃 버튼 */}
      <div className={styles.signout}>
        <BiLogOut className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
