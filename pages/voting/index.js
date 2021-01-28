// import React, { Component } from "react";
// import styles from "../../components/voting.module.css";
// import logo from "../../public/icons/mozy.png";
// import { Link, Router } from "../../routes";
// import profileIcon from "../../public/icons/user.png";
// import DiscoverIcon from "../../public/icons/discover.png";
// import DashboardIcon from "../../public/icons/dashboard.png";
// import VotingIcon from "../../public/icons/manualvoting.png";
// import { Button, Table } from "semantic-ui-react";

// export class VotingIndex extends Component {
//   render() {
//     return (
//       <>
//         <div className={styles.sideNav} style={{ float: "left" }}>
//           <Link route={`/home/${this.props.investorAddress}`}>
//             <img
//               src={logo}
//               onClick={() => {
//                 alert(investorAddress);
//               }}
//             />
//           </Link>
//           <ul className={styles.sideBarList}>
//             <Link route={`/profile`}>
//               <li
//                 className={styles.row}
//                 // onClick={this.onSubmit}
//               >
//                 <div id={styles.icon}>
//                   <img
//                     src={profileIcon}
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </div>
//                 <div id={styles.title}>Profile</div>
//               </li>
//             </Link>
//             <li
//               className={styles.row}
//               onClick={() => {
//                 Router.pushRoute(`/discover`);
//               }}
//             >
//               <div id={styles.icon}>
//                 {" "}
//                 <img
//                   src={DiscoverIcon}
//                   style={{ width: "24px", height: "18px" }}
//                 />
//               </div>
//               <div id={styles.title}>Discover</div>
//             </li>
//             <li
//               className={styles.row}
//               onClick={() => {
//                 Router.pushRoute(`/dashboard`);
//               }}
//             >
//               <div id={styles.icon}>
//                 <img
//                   src={DashboardIcon}
//                   style={{ width: "24px", height: "24px" }}
//                 />
//               </div>
//               <div id={styles.title}>Dashboard</div>
//             </li>
//             <li
//               className={styles.row}
//               onClick={() => {
//                 Router.pushRoute(`/voting`);
//               }}
//             >
//               <div id={styles.icon}>
//                 {" "}
//                 <img
//                   src={VotingIcon}
//                   style={{ width: "24px", height: "24px" }}
//                 />
//               </div>
//               <div id={styles.title}>Voting</div>
//             </li>
//           </ul>
//         </div>
//         <main className={styles.main} style={{ float: "right", width: "82%" }}>
//           <div className={styles.wrapper}>
//             <div className={styles.header}>
//               <h3>Rental Requests Pending Votes</h3>
//             </div>
//             <section className={styles.requestsSection}>
//               <div className={styles.requests}>
//                 <div className={styles.requestInfo}>
//                   <h3>Renter ID</h3>
//                   <p>Rental Price</p>
//                 </div>
//                 <div className={styles.requestResults}></div>
//               </div>

//               <div className={styles.requestActions}>
//                 <button>Accept</button>
//                 <button>Reject</button>
//               </div>
//             </section>
//           </div>
//         </main>
//       </>
//     );
//   }
// }

// export default VotingIndex;
import React, { Component } from "react";
import Property from "../../blockchain/property";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../routes";
import RequestRow from "../../components/Requestrow";

class RentalRequestsIndex extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const property = Property(address);
        const requestCount = await property.methods.getRentalRequestCount().call();
        const approversCount = await property.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return property.methods.rentalRequests(index).call();
                })
        );
        return { address, requests, requestCount, approversCount };
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    onRequestsUpdate={this.onRequestsUpdate}
                    request={request}
                    key={index}
                    id={index}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        return (
            <Layout>
                <Link route={`/properties/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h3>Request Lists</h3>
                <Link route={`/properties/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>
                            Add Request
                  </Button>
                    </a>
                </Link>

                <Link route={`/properties/${this.props.address}/requests/`}>
                    <a>
                        <Button primary floated="left" style={{ marginBottom: 10 }}>
                            Refresh
                  </Button>
                    </a>
                </Link>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Renter</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderRow()}</Table.Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }
}



export default RentalRequestsIndex;