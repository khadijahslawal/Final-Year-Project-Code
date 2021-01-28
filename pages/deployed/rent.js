import React, { Component } from "react";
import { Link, Router } from "../../routes";
import styles from "../../components/rent.module.css";
import Property from "../../blockchain/property";
import logo from "../../public/icons/mozy.png";
import profileIcon from "../../public/icons/user.png";
import DiscoverIcon from "../../public/icons/discover.png";
import DashboardIcon from "../../public/icons/dashboard.png";
import VotingIcon from "../../public/icons/manualvoting.png";
import web3 from "../../blockchain/web3";

export class RentIndex extends Component {
    state = {
        rentalPrice: "",
        renter: "",
        errorMessage: "",
      };
    
      static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
      }
    
      onSubmit = async (event) => {
        event.preventDefault();
        const property = Property(this.props.address);
        const { rentalPrice, renter } = this.state;
    
        this.setState({ errorMessage: "" });
    
        try {
          const accounts = await web3.eth.getAccounts();
          await property.methods
            .createRentalRequests(web3.utils.toWei(rentalPrice, "ether"))
            .send({
              from: accounts[0],
            });
          Router.pushRoute(`/voting`);
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
    
        this.setState({
          rentalPrice: "",
          recipient: "",
        });
      };
    
  render() {
    return (
      <>
        <div className={styles.sideNav} style={{ float: "left" }}>
          <Link route={`/home/${this.props.address}`}>
            <img src={logo} />
          </Link>
          <ul className={styles.sideBarList}>
            <Link route={`/profile`}>
              <li className={styles.row}>
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
          <section className={styles.contentSection}>
            <section className={styles.contentHeader}>
              <h1>Rent 2922, Barnes Avenue</h1>
              {/* Write Properties statisitcs somewhere */}
            </section>
            <form
              className={styles.form}
              onSubmit={this.onSubmit}
              error={!!this.state.errorMessage}
            >
              <input
                type="text"
                placeholder="Desired Rental Price in Ether"
                value={this.state.rentalPrice}
                onChange={(event) => this.setState({ rentalPrice: event.target.value })}
              />
              {/* State updates the investment total Price */}
              <button> Send Rental Request </button>
            </form>
            <div className={styles.errorMessage}>
              <p>{this.state.errorMessage}</p>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default RentIndex;
