import React, { Component } from "react";
import styles from "../../components/investordashboard.module.css";
import IncreaseIcon from "../../public/icons/arrowup.png";
import DecreaseIcon from "../../public/icons/arrowdown.png";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";
import logo from "../../public/icons/mozy.png";
import { Link, Router } from "../../routes";
import InvestorFactory from "../../blockchain/investorFactory";
import Investor from "../../blockchain/investor";

export class InvestorDashboard extends Component {
  static async getInitialProps() {
    const investorAddress = await InvestorFactory.methods
      .returnLastInvestorAddress()
      .call();
    const investor = Investor(investorAddress);
    const summary = await investor.methods.getInvestorDetails().call();
    return {
      address: investorAddress,
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
          {/* <Link route={`/home/${this.props.investorAddress}`}> */}
          <img
            src={logo}
            onClick={() => {
              alert(investorAddress);
            }}
          />
          {/* </Link> */}
          <ul className={styles.sideBarList}>
            <Link route={`/profile`}>
              <li
                className={styles.row}
                // onClick={this.onSubmit}
              >
                <div id={styles.icon}>
                  <img
                    src={profileIcon}
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <div id={styles.title}>Profile</div>
              </li>
            </Link>
            <li
              className={styles.row}
              onClick={() => {
                Router.pushRoute(`/discover`);
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
                Router.pushRoute(`/dashboard`);
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
                Router.pushRoute(`/voting`);
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
          <div className={styles.left}>
            {/* <h1>Dashboard</h1> */}
            <section className={styles.networth}>
              <h3>Platform Networth</h3>
              <h5>5 eth</h5>
            </section>

            <section className={styles.transactionsSection}>
              <div className={styles.transactionHeader}>
                <h3>Transaction Payments</h3>
                <p>View All</p>
              </div>

              <div className={styles.transaction}>
                <div className={styles.increaseIcon}>
                  <img src={IncreaseIcon} />
                </div>
                <div className={styles.transactionTitle}>
                  <h5>Sent RT</h5>
                  <p>12th November 2020</p>
                </div>
                <p>+7.5 eth</p>
              </div>
              {/* 2nd Transaction */}
              <div className={styles.transaction}>
                <div className={styles.decreaseIcon}>
                  <img src={DecreaseIcon} />
                </div>
                <div className={styles.transactionTitle}>
                  <h5>Sent RT</h5>
                  <p>12th November 2020</p>
                </div>
                <p className={styles.decreaseValue}>-$1,75</p>
              </div>

              {/* 3rd Transaction */}
              <div className={styles.transaction}>
                <div className={styles.increaseIcon}>
                  <img src={IncreaseIcon} />
                </div>
                <div className={styles.transactionTitle}>
                  <h5>Recieved RT</h5>
                  <p>12th November 2020</p>
                </div>
                <p>+$7.5 eth</p>
              </div>
            </section>
          </div>

          <div className={styles.right}>
            <section className={styles.propertiesSection}>
              <div className={styles.propertiesHeader}>
                <h3>Property Portfolio</h3>
              </div>
              <div className={styles.properties}>
                <h3>Unit 405, Realington Towers</h3>
                <p>Hackney, London</p>
              </div>
              <div className={styles.properties}>
                <h3>Villa 5,Serena Villas</h3>
                <p>Qatar, London</p>
              </div>
              <div className={styles.properties}>
                <h3>Nasma Townhouse</h3>
                <p>Dubai, UAE</p>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default InvestorDashboard;
