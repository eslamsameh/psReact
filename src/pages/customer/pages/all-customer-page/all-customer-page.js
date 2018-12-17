import React, { Component } from "react";
import "./all-customer-page.sass";
import AddCustomer from "../../components/add-customer/add-customer";
import SingleRowCustomer from "../../components/single-customer-row/single-customer-row";
import { customerService } from "../../service/customer.service";
class AllCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfCustomer: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <h4>All Customer</h4>
        </div>
        <AddCustomer
          dataInserted={() => {
            this.resiveDataInserted();
          }}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>Action</th>
              <th>Customer Name</th>
            </tr>
          </thead>
          {this.state.arrayOfCustomer ? (
            <tbody>
              {this.state.arrayOfCustomer.map((v, i) => {
                return (
                  <tr key={i.toString()}>
                    <SingleRowCustomer
                      customer={v}
                      key={i.toString()}
                      dataChanged={() => {
                        this.resviceDataChangedFromTabe();
                      }}
                    />
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div />
          )}
        </table>
      </div>
    );
  }
  componentDidMount() {
    customerService.getAllCustomer().then(Res => {
      this.setState({ arrayOfCustomer: Res.data.customers });
    });
  }
  resiveDataInserted() {
    this.componentDidMount();
  }
  resviceDataChangedFromTabe() {
    this.componentDidMount();
  }
}

export default AllCustomer;
