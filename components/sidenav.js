import React from "react";
import styles from "./sidenav.module.css";
import displayImage from "../public/images/walkicon.png";
import logo from "../public/icons/mozy.png";

function sidenav() {
  return (
    <div>
      <div className={styles.index__section}>
        <div className={styles.sidenav}>
          <div className={styles.container_left}>
            <img src={logo} />
            <p className={styles.headerCallOut}>
              A few clicks away from being part of an innovative platform
            </p>
            <p className={styles.headerjoinmsg}>
              Join as a developer <br /> investor <br /> tenant
            </p>
            <div className={styles.headerImage}>
              <img src={displayImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sidenav;