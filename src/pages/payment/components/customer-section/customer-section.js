import React, { Component } from "react";
import "./customer-section.sass";
import { customerService } from "../../../customer/service/customer.service";
import { EditPaymentService } from "../../service/edit-payment.service";
import Autocomplete from "react-autocomplete";
class CustomerSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      arrayOfResultCustomers: [],
      customerId: "",
      visibalityOfarraySelect: false,
      visibaleAddCustomer: false,
      timeOfSearch: 0,
      typing: false
    };
  }

  render() {
    return (
      <div className="row row-customer">
        <div className="col-sm-2">
          <div className="input-group">
            <label> Customer Name</label>
          </div>
        </div>
        <div className="col-sm-10">
          <Autocomplete
            menuStyle={{ zIndex: "999999" }}
            getItemValue={item => item.customerName}
            items={this.state.arrayOfResultCustomers}
            renderItem={(item, isHighlighted) => (
              <div
                className="form-control"
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.customerName}
              </div>
            )}
            value={this.state.customerName}
            onChange={e => {
              this.onChangeCustomerName(e);
            }}
            onSelect={val => {
              this.SelectCustomerValue(val);
            }}
          />
        </div>
        
        <div className="btn-add-customer">
          {this.state.visibaleAddCustomer ? (
            <button
              className="btn btn-dark"
              onClick={this.onPressAddCustomer.bind(this)}
            >
              Add Customer
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
  onChangeCustomerName(value) {
    let inputValue = value.target.value;
    this.setState({ customerName: inputValue });
    customerService
      .SearchByCustomerName({ customerName: inputValue })
      .then(Res => {
        console.log(Res);
        if (Res.data.customer.length > 0) {
          this.setState({
            arrayOfResultCustomers: Res.data.customer,
            visibalityOfarraySelect: true,
            visibaleAddCustomer: false
          });
        } else {
          this.setState({
            arrayOfResultCustomers: [],
            customerName: this.state.customerName,
            visibaleAddCustomer: true
          });
        }
      });
  }
  componentWillReceiveProps(props) {
    if (this.props.paymentId) {
      this.setState({ customerName: props.customer.customerName });
    }
  }
  SelectCustomerValue(e) {
    let inputData = e;
    let cum_id = "";
    var self = this;
    this.setState({customerName: inputData},()=>{
      this.state.arrayOfResultCustomers.map((v,i)=>{
       
        if (this.state.customerName == v.customerName) {
         cum_id = v._id;
        }
      })
      if (this.props.paymentId) {
       
        let paymentAndCustomer={
          paymentId: this.props.paymentId,
          customer: cum_id
        }
        EditPaymentService.changePaymentCustomer(paymentAndCustomer).then((Res)=>{
        
          let dataSendToParent = {
            customerName: inputData,
            _id: cum_id
          }
          this.props.customerData(dataSendToParent);
        })
      } else {
        this.props.customerData(cum_id);
  
      }
    })
   
  }

  onPressAddCustomer() {
    let data = {
      customerName: this.state.customerName
    };
    customerService.AddCustomer(data).then(Res => {
      if (this.props.paymentId) {
        let customerAndPayment = {
          customer: Res.data.data._id,
          paymentId: this.props.paymentId
        };
        EditPaymentService.changePaymentCustomer(customerAndPayment).then(
          resp => {
            let dataSendToParent = {
              customerName: this.state.customerName,
              _id: Res.data.data._id
            }
            this.props.customerData(dataSendToParent);
            this.setState({
              visibalityOfarraySelect: false,
              visibaleAddCustomer: false
            });
          }
        );
      } else {
        this.setState(
          { visibaleAddCustomer: false, customerId: Res.data.data._id },
          () => {
            console.log(Res);
            this.props.customerData(this.state.customerId);
          }
        );
      }
    });
  }
}

export default CustomerSection;
