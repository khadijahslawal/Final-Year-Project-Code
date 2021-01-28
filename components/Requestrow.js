import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../blockchain/web3";
import Property from "../blockchain/property";

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
      >
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(request.proposedRentalPrice, "ether")}</Table.Cell>
        <Table.Cell>{request.rentalSeeker}</Table.Cell>
        <Table.Cell>
          {request.approvalCount}/{numInvestors}
        </Table.Cell>
        <Table.Cell>
          {request.rentalRequestCompleted ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {request.rentalRequestCompleted ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default RequestRow;