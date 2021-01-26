import React, { Component } from "react";
import SideNav from "../../components/sidenav";
import styles from "../../components/signup.module.css";
import investorIcon from "../../public/images/leasing.png";
import developerIcon from "../../public/images/x.png";
import { Link } from "../../routes";

export class SignUp extends Component {
  render() {
    return (
      <div>
        <SideNav />
        <div className={styles.main}>
          <div className={styles.container_right}>
            <p className={styles.continue}>Continue as</p>
            <Link route={`/signup/developer`}>
            <div className={styles.developer}>
              <img src={developerIcon} className={styles.developerImage} />
              <div className={styles.ownerFeatures}>
                <h3>Property Owner</h3>
                <p>
                  Asset tokenization <br />
                  Custom Document verification with OCR <br />
                  Copyright management for property images
                </p>
              </div>
            </div>
            </Link>
          </div>
          <div className={styles.container_right}>
            <Link route={`/signup/investor`}>
              <div className={styles.investor}>
                <img src={investorIcon} className={styles.developerImage} />
                <div className={styles.investorFeatures}>
                  <h3>Investor or Tenant</h3>
                  <p>
                    Fractional ownership and Investment <br />
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
