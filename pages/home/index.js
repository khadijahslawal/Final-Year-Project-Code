import React, { Component } from "react";

import styles from "../../components/investorhome.module.css";
import Investor from "../../blockchain/investor";
import logo from "../../public/icons/mozy.png";
import { Link, Router } from "../../routes";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";

export class InvestorIndex extends Component {
  static async getInitialProps(props) {
    const investor = Investor(props.query.address);
    const summary = await investor.methods.getInvestorDetails().call();
    return {
      address: props.query.address,
      firstName: summary[0],
      lastName: summary[1],
      email: summary[2],
      investorAddress: summary[3],
    };
  }
  render() {
    return (
      <>
        <div className={styles.sideNav} style={{ float: "left" }}>
          <Link route={`/home/${this.props.investorAddress}`}>
            <img
              src={logo}
              onClick={() => {
                alert(investorAddress);
              }}
            />
          </Link>
          <ul className={styles.sideBarList}>
            <li
              className={styles.row}
              onClick={() => {
                Router.pushRoute(`profile/${this.props.investorAddress}`);
              }}
            >
              <div id={styles.icon}>
                <img
                  src={profileIcon}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
              <div id={styles.title}>Profile</div>
            </li>
            <li
              className={styles.row}
              onClick={() => {
                Router.pushRoute(`discover/${this.props.investorAddress}`);
              }}
            >
              <div id={styles.icon}>
                {" "}
                <img
                  src={DiscoverIcon}
                  style={{ width: "24px", height: "18px" }}
                />
              </div>
              <div id={styles.title}>Discover</div>
            </li>
            <li
              className={styles.row}
              onClick={() => {
                Router.pushRoute(`dashboard/${this.props.investorAddress}`);
              }}
            >
              <div id={styles.icon}>
                <img
                  src={DashboardIcon}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
              <div id={styles.title}>Dashboard</div>
            </li>
            <li
              className={styles.row}
              onClick={() => {
                Router.pushRoute(`voting/${this.props.investorAddress}`);
              }}
            >
              <div id={styles.icon}>
                {" "}
                <img
                  src={VotingIcon}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
              <div id={styles.title}>Voting</div>
            </li>
          </ul>
          </div>
          <main className={styles.main} style={{ float: "right", width: "82%" }}>
            <p>{this.props.firstName}</p>
          </main>
      </>
    );
  }
}

export default InvestorIndex;
