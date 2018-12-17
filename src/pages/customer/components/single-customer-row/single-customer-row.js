import React, { Component } from "react";
import "./single-customer-row.sass";
import { customerService } from "../../service/customer.service";
import { withRouter } from "react-router-dom";
class SingleCustomerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenEditCustomer: false,
      customerName: ""
    };
  }

  render() {
    return [
      <td>
        {this.state.OpenEditCustomer === false ? (
          <div className="edit-remove">
            <div>
              <i
                className="fa fa-trash"
                onClick={() => {
                  this.OnPressDelete(this.props.customer._id);
                }}
              />
            </div>
            <div>
              <i
                className="fa fa-pencil"
                onClick={() => {
                  this.OnPressEdit();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="edit-remove">
            <div>
              <i
                className="fa fa-close"
                onClick={() => {
                  this.cancelEdit();
                }}
              />
            </div>
            <div>
              <i
                className="fa fa-check"
                onClick={() => {
                  this.onSubmitEdit(this.props.customer._id);
                }}
              />
            </div>
          </div>
        )}
      </td>,
      <td className="td-names">
        {this.state.OpenEditCustomer === false ? (
          <div
            onClick={() => {
              this.OnPressRow(this.props.customer._id);
            }}
          >
            {" "}
            {this.props.customer.customerName}{" "}
          </div>
        ) : (
          <input
            type="text"
            className="form-control"
            value={this.state.customerName}
            onChange={value => {
              this.changeCustomerName(value);
            }}
          />
        )}
      </td>
    ];
  }
  componentDidMount() {
    this.setState({ customerName: this.props.customer.customerName });
  }
  OnPressDelete(id) {
    let dataDeleted = {
      Cusmoterid: id
    };
    customerService.DeleteCustomer(dataDeleted).then(Res => {
      this.props.dataChanged();
    });
  }
  OnPressEdit() {
    this.setState({ OpenEditCustomer: true });
  }
  cancelEdit() {
    this.setState({ OpenEditCustomer: false });
  }
  changeCustomerName(value) {
    this.setState({ customerName: value.target.value });
  }
  onSubmitEdit(id) {
    let data = {
      Cusmoterid: id,
      customerName: this.state.customerName
    };
    customerService.EditCustomer(data).then(Res => {
      this.props.dataChanged();
      this.setState({ OpenEditCustomer: false });
    });
  }

  OnPressRow(id) {
    this.props.history.push(`/customer-details/${id}`);
  }
}

export default withRouter(SingleCustomerRow);
