import React, { Component } from "react";
import styles from "../../components/profile.module.css";
import InvestorFactory from "../../blockchain/investorFactory";
import Investor from "../../blockchain/investor";
import logo from "../../public/icons/mozy.png";
import { Link, Router } from "../../routes";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";
import verifiedIcon from "../../public/icons/verified.png";
import clip from "../../public/icons/attachment.png";


export class ProfilePage extends Component {
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
          <Link route={`/home/${this.props.investorAddress}`}>
            <img
              src={logo}
              onClick={() => {
                alert(investorAddress);
              }}
            />
          </Link>
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
          <section className={styles.profileDetails}>
            <h1>Profile Details</h1>

            <section className={styles.top}>
              <div className={styles.firstName}>
                <p className={styles.label}>First Name</p>
                <div className={styles.value}>{this.props.firstName}</div>
              </div>

              <div className={styles.lastName}>
                <p className={styles.label}>Last Name</p>
                <div className={styles.value}>{this.props.lastName}</div>
              </div>
            </section>

            <section className={styles.bottom}>
              <div className={styles.email}>
                <p className={styles.label}>Email</p>
                <div className={styles.value}>{this.props.email}</div>
              </div>

              <div className={styles.ethAddress}>
                <p className={styles.label}>Ethereum Address </p>
                <div className={styles.value}>
                  {this.props.address}
                </div>
              </div>
            </section>
          </section>

          <section className={styles.verificationSection}>
            <h1>Identity Verification Status</h1>
            <div className={styles.verificationDetails}>
              <div className={styles.verificationResults}>
                <h3>Onboarding Status</h3>
                <p>Verified</p>
                <img src={verifiedIcon} alt="verified icon" />
              </div>
              <div className={styles.attachment}>
                <h3>View Attachments</h3>
                <p className={styles.file}>
                  <span className={styles.span}>
                    <img src={clip} />
                  </span>
                  ID Document 1
                </p>
                <p className={styles.file}>
                  <span className={styles.span}>
                    <img src={clip} />
                  </span>
                  ID Document 2
                </p>
                <p id={styles.docResultsText}>
                  The submitted documents are approved
                </p>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default ProfilePage;
