import React, { Component } from "react";
import Investor from "../../blockchain/investor";

export class ProfilePage extends Component {
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
      <div>
        <p>{this.props.firstName}</p>
      </div>
    );
  }
}

export default ProfilePage;
