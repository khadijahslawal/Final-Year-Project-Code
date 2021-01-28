import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../blockchain/web3";
import Property from "../blockchain/property";
import styles from "./requestrow.module.css";

class RequestRow extends Component {
  onApprove = async () => {
    const property= Property(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await property.methods
      .approveRentalRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  onFinalize = async () => {
    const property = Property(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await property.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  render() {
    const { request, id, numInvestors} = this.props;
    const readyToFinalize = request.approvalCount > numInvestors/ 2;
    return (
      <Table.Row
        disabled={request.complete}
        positive={!!readyToFinalize && !request.rentalRequestCompleted}
        className={styles.tablerow}
      >
        <Table.Cell className={styles.cell}>{id}</Table.Cell>
        <Table.Cell className={styles.cell}>{web3.utils.fromWei(request.proposedRentalPrice, "ether")}</Table.Cell>
        <Table.Cell className={styles.cell}>{request.rentalSeeker}</Table.Cell>
        <Table.Cell className={styles.cell}>
          {request.approvalCount}/{numInvestors}
        </Table.Cell>
        <Table.Cell className={styles.cell}>
          {request.rentalRequestCompleted ? null : (
            <button  onClick={this.onApprove}>
              Approve
            </button>
          )}
        </Table.Cell>
        <Table.Cell className={styles.cell}>
          {request.rentalRequestCompleted ? null : (
            <button basic onClick={this.onFinalize}>
              Finalize
            </button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default RequestRow;