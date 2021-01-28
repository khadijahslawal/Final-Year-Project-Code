import React, { Component, useState } from "react";
import styles from "../../components/deployed.module.css";
import propImage from "../../public/images/propertyimage.jpg";
import bedIcon from "../../public/icons/bed.png";
import bathIcon from "../../public/icons/bath.png";
import Avatar from "react-avatar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link, Router } from "../../routes";
import Property from "../../blockchain/property";
import logo from "../../public/icons/mozy.png";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";


export class ShowDeployed extends Component {
  static async getInitialProps(props) {
    const property = Property(props.query.address);
    const summary = await property.methods.getPropertyDetails().call();
    return{
      address: props.query.address,
      symbol: summary[1],
      tokenPrice: summary[2],
      initialSupply: summary[3],
      currentSupply: summary[4],
      valuationPrice: summary[5],
      isRented: summary[6],
    };
    // const { address, symbol, tokenPrice, initialSupply, currentSupply, valuationPrice, isRented} = this.values;
  }
  render() {
    const percentage = 0;
    return (
      <>
        <div className={styles.sideNav} style={{ float: "left" }}>
          <Link route={`/home/${this.props.address}`}>
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
                Router.pushRoute(`dashboard`);
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
          <section className={styles.left}>
            <h1>2992, Barnes Avenue</h1>
            <img src={propImage} width="500px" height="300px" />
            <h3>Williams bridge, Knox</h3>
            <article className={styles.utilities}>
              <div className={styles.bedroom}>
                <p>Bedrooms</p>
                <div className={styles.utilitiesValue}>
                  <p>3</p>
                  <img src={bedIcon} alt="No of beds" width="20px" />
                </div>
              </div>
              <div className={styles.bathroom}>
                <p>Bathrooms</p>
                <div className={styles.utilitiesValue}>
                  <p>3</p>
                  <img src={bathIcon} alt="No of bath" width="20px" />
                </div>
              </div>
              <div className={styles.area}>
                <p>Area</p>
                <p id={styles.area}>1024ft/sq</p>
              </div>
            </article>
            <div className={styles.description}>
              <p>
                Barnes Apartments is among the best located and best maintained
                properties in Rohnert Park, where a veritable hotbed of
                development is set in a family-oriented, values-focused
                neighborhood community.
              </p>
            </div>
            <div className={styles.actionButtons}>
              <Link route={`/deployed/invest/${this.props.address}`}>
                <button>Invest</button>
              </Link>
              <button>Rent</button>
            </div>
          </section>

          <section className={styles.right}>
            <div className={styles.devProfile}>
              <Avatar
                className={styles.avatar}
                name="Wim Mostmans"
                round={true}
                size="50"
                color="#B198EF"
                fgColor="black"
              />
              <h3>Realington Properties</h3>
              <p>AEX0124013R1A1FAD</p>
              <button>View verification</button>
            </div>
            <section className={styles.analytics}>
              <h3>Property Analytics</h3>
              <div className={styles.analyticsbody}>
                <div className={styles.investmentProgress}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      pathColor: `rgb(177, 152, 239)`,
                      text: {
                        fill: "#f88",
                        textSize: "10px",
                        textAlign: "center",
                      },
                    })}
                  />
                </div>

                <div className={styles.tokenProgress}>
                  <p>
                    Tokens Issued: <span className={styles.value}>{this.props.initialSupply}</span>
                  </p>
                  <p>
                    Tokens Sold: <span className={styles.value}>{this.props.currentSupply}</span>
                  </p>
                  <p>
                    Token Price: <span className={styles.value}>{this.props.tokenPrice}</span>
                  </p>
                </div>
              </div>
            </section>
          </section>
        </main>
      </>
    );
  }
}

export default ShowDeployed;
