import React, { Component } from "react";
import Property from "../../components/propertycard";
import { nondeployed } from "./nondeployed";
import styles from "../../components/discover.module.css";
import verifiedPropertyImage from "../../public/images/propImage.jpg";
import factory from "../../blockchain/propertyFactory";
import { Router } from "../../routes";
import { Link } from "../../routes";
import logo from "../../public/icons/mozy.png";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";

export class DiscoverIndex extends Component {
  static async getInitialProps() {
    const property = await factory.methods
      .getDeployedProperties()
      .call();
    return { property: property };
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
            <Link route={`/profile/${this.props.investorAddress}`}>
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
          <div className={styles.headerSection}>
            <h3>Discover Properties</h3>
          </div>
          <section className={styles.propertiesList}>
            {nondeployed.map((property) => {
              return <Property key={property.id} property={property} />;
            })}
          </section>
          <section>
            <div className={styles.headerSection}>
              <h3>Tokenized Property</h3>
              <article className={styles.property}>
                <img src={verifiedPropertyImage} />
              </article>
            </div>
            <div className={styles.btnfullFld}>
            <Link route={`deployed/${this.props.property}`}>
              <button>
                Explore Tokenized Property
              </button>
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default DiscoverIndex;
