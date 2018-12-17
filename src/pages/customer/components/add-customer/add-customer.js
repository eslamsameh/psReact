import React, { Component } from "react";
import "./add-customer.sass";
import { customerService } from "../../service/customer.service";
class AddCustmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custmerName: ""
    };
  }

  render() {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <div className="container">
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Customer</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Name"
                      value={this.state.custmerName}
                      onChange={value => {
                        this.onChangeCustomerName(value);
                      }}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-dismiss="modal"
                    onClick={() => {
                      this.OnPressSubmit();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-add">
            <button
              type="button"
              className="btn btn-info "
              data-toggle="modal"
              data-target="#myModal"
            >
              Add Customer
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  onChangeCustomerName(value) {
    this.setState({ custmerName: value.target.value });
  }
  OnPressSubmit() {
    let data = {
      customerName: this.state.custmerName
    };
    customerService.AddCustomer(data).then(Res => {
      this.props.dataInserted();
    });
  }
}

export default AddCustmer;
