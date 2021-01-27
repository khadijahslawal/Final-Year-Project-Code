import React, { Component } from "react";
import styles from "../../components/welcome.module.css";
import logo from "../../public/icons/mozy.png";
import { Link, Router } from "../../routes";
import InvestorFactory from "../../blockchain/investorfactory";


export class Welcome extends Component {
  static async getInitialProps() {
    const investorAddress = await InvestorFactory.methods.returnLastInvestorAddress().call();
    return { investorAddress };
}

  onSubmit = async (event) => {
    event.preventDefault();
    Router.pushRoute(`/home/${this.props.investorAddress}`);
  };
  render() {
    return (
      <div className={styles.welcomePage}>
        <div className={styles.leftSection}>
          <img src={logo} />
          <div className={styles.welcomeText}>
            <h1>
              {" "}
              Great {this.props.investorAddress}, <br /> everything is <br /> ready{" "}
            </h1>
            <p>You will recieve a confirmation shortly</p>
          </div>
          <div className={styles.btnfullFld}>     
            <button onClick={this.onSubmit}>Go to homepage</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
