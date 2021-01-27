import React, { Component, useState } from "react";
import SideNav from "../../components/sidenav";
import styles from "../../components/investorsignup.module.css";
import { Router } from "../../routes";
import InvestorFactory from "../../blockchain/investorfactory";
import web3 from "../../blockchain/web3";

export class SignupInvestor extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    errorMessage: " ",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await InvestorFactory.methods
        .createInvestor(
          this.state.firstName,
          this.state.lastName,
          this.state.emailAddress
        )
        .send({ from: accounts[0] });
      Router.pushRoute(`/signup/welcome`);
    } catch (err) {
      this.setState({ errorMessage: err.messaage });
    }
  };
  render() {
    return (
      <div className={styles.main}>
        <SideNav />
        <form className={styles.form} onSubmit={this.onSubmit}>
          <div className={styles.signupheader}>
            <h1>Login</h1>
          </div>
          <div className={styles.form__section}>
            <div className={styles.user__info}>
              <div className={styles.user__input}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.textFld}
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.setState({ firstName: event.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.textFld}
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.setState({ lastName: event.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Email Address"
                  className={styles.textFld}
                  value={this.state.emailAddress}
                  onChange={(event) =>
                    this.setState({ emailAddress: event.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <a className={styles.btnfullFld}>
                <button type="submit">Next</button>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupInvestor;
