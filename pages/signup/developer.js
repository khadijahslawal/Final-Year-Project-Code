import React, { Component } from "react";
import SideNav from "../../components/sidenav";
import styles from "../../components/developersignup.module.css";
// import Link from "next/link";
import DeveloperFactory from "../../blockchain/developerfactory";
import web3 from "../../blockchain/web3";
import { Router } from "../../routes";

export class DeveloperSignup extends Component {
  state = {
    //id: 1,
    firstName: "",
    lastName: "",
    emailAddress: "",
    businessName: "",
    crNumber: "",
    state: "",
    country: "",
    errorMessage: " "
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await DeveloperFactory.methods
        .createDeveloper(
          this.state.firstName,
          this.state.lastName,
          this.state.emailAddress,
          this.state.businessName,
          this.state.crNumber,
          this.state.state,
          this.state.country
        )
        .send({ from: accounts[0] });
      // Router.pushRoute(`dev/welcome`);
    } catch (err) {
      this.setState({ errorMessage: err.messaage });
    }
  };

  render() {
    return (
      <>
        <SideNav />
        <div className={styles.main}>
          <form className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.businessDetails}>
              <h1>Business Details</h1>
              <h3></h3>
              <div className={styles.row1}>
                <input
                  type="text"
                  placeholder="Company Name"
                  className={styles.textFld}
                  value={this.state.businessName}
                  onChange={(event) => this.setState({ businessName: event.target.value })}
                />
                <input
                  type="text"
                  placeholder="Company Registration Number"
                  className={styles.textFld}
                  value={this.state.crNumber}
                  onChange={(event) => this.setState({ crNumber: event.target.value })}
                />
              </div>

              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="State"
                  className={styles.textFld}
                  value={this.state.state}
                  onChange={(event) => this.setState({ state: event.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className={styles.textFld}
                  value={this.state.country}
                  onChange={(event) => this.setState({ country: event.target.value })}
                />
              </div>
            </div>
            <div className={styles.developerDetails}>
              <h1>Developer Details</h1>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.textFld}
                  value={this.state.firstName}
                  onChange={(event) => this.setState({ firstName: event.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.textFld}
                  value={this.state.lastName}
                  onChange={(event) => this.setState({ lastName: event.target.value })}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Email Address"
                  className={styles.textFld}
                  value={this.state.emailAddress}
                  onChange={(event) => this.setState({ emailAddress: event.target.value })}
                />
              </div>
            </div>
            <div>
              {/* <Link href="/dev/verification" as="verification"> */}
                <div className={styles.btnfullFld}>
                  <button type="submit">Next</button>
                </div>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default DeveloperSignup;
