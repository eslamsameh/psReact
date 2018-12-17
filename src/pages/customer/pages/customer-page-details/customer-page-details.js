import React, { Component } from "react";
import "./customer-page-details.sass";
import { customerDetailService } from "../../service/customer-details.service";
class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfCustomerPayment: [],
      Amount: 0,
      Payed: 0,
      RemeningAmount: 0
    };
  }

  render() {
    return (
      <div className="container">
        <h4> Customer Payments</h4>

        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <div style={{ color: "#446464" }}>
                  <h6>Amount</h6>
                </div>
                <div style={{ color: "#446464" }}>{this.state.Amount}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <div style={{ color: "rebeccaurple}" }}>
                  <h6>Payed</h6>
                </div>
                <div style={{ color: "rebeccaurple" }}>{this.state.Payed}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <div style={{ color: "red" }}>
                  <h6>Remening Amount</h6>
                </div>
                <div style={{ color: "red" }}>{this.state.RemeningAmount}</div>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Device Name</th>
              <th>Game Name</th>
              <th>Date </th>
              <th>From </th>
              <th>To </th>
              <th>Amount</th>
              <th>Payed </th>
              <th>Remening Amount</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrayOfCustomerPayment.map((v, i) => {
              return (
                <tr key={i}>
                  <td className="td-names">{v.customer?(v.customer.customerName):""}</td>
                  <td className="td-names">{v.device?(v.device.deviceName):""}</td>
                  <td className="td-names">{v.game?(v.game.gameName):""}</td>
                  <td className="td-names">{v.date.split("T")[0]}</td>
                  <td className="td-names">{v.startTime?(v.startTime.split("T")[1].replace("Z","")):""}</td>
                  <td className="td-names">{v.endTime?(v.endTime.split("T")[1].replace("Z","")):""}</td>
                  <td className="td-names">{v.amount}</td>
                  <td className="td-names">{v.payed}</td>
                  <td className="td-names">{v.remeningAmount}</td>
                  <td className="td-names">{v.admin? (v.admin.name):("")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {
    const CustomerId = this.props.match.params.customerId;
    customerDetailService.getCustomerPayment({customer:CustomerId}).then(Res => {
      console.log(Res);
      this.setState({ arrayOfCustomerPayment: Res.data.payments });
      this.calcCards();
    });
  }

  calcCards() {
    const amountArray = [];
    const payedArray = [];
    for (let index = 0;index < this.state.arrayOfCustomerPayment.length;index++) {
      amountArray.push(this.state.arrayOfCustomerPayment[index].amount);
      payedArray.push(this.state.arrayOfCustomerPayment[index].payed);
    }
    const Amount = amountArray.reduce((a, b) => a + b, 0);
    console.log(Amount);
    const Payed = payedArray.reduce((a, b) => a + b, 0);
    console.log(Payed);
    const RemeningAmount = Amount - Payed;
    this.setState({
      Amount: Amount,
      Payed: Payed,
      RemeningAmount: RemeningAmount
    });
  }
}

export default CustomerDetail;
