import React, { Component } from "react";
import "./current-payment.sass";
import {CurrentPaymentService} from '../../service/current-payment.service';

class CurrentPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arrayOfCurrentPayment:[]
    };
  }

  render() {
    return (
      <div class="container">
        <h4>Current Payement</h4>
        <div class="btn-add-Payment">
          <button type="button" class="btn btn-info ">
            Start Payment
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>Action</th>
              <th>Customer Name</th>
              <th>Device</th>
              <th>Game </th>
              <th>Admin</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
              {this.state.arrayOfCurrentPayment.map((v,i)=>{
                  return(
                    <tr>
                    <td>
                      <div class="edit-remove">
                        <div>
                          <i class="fa fa-trash" />
                        </div>
                        <div>
                          <i class="fa fa-pencil" onClick={()=>{this.OnPressEdit(v._id)}} />
                        </div>
                      </div>
                    </td>
                    <td class="td-names">{v.customer?(v.customer.customerName):("")}</td>
                    <td class="td-names">{v.device?(v.device.deviceName):("")}</td>
                    <td class="td-names">{v.game?(v.game.gameName):("")}</td>
                    <td class="td-names">{v.admin?(v.admin.name):("")}</td>
                    <td class="td-names">{v.startTime?(v.startTime.split("T")[1].replace("Z","")):""}</td>
                    <td class="td-names">{v.endTime?(v.endTime.split("T")[1].replace("Z","")):""}</td>
                  </tr>
                  )
              })}
           
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount(){
    CurrentPaymentService.getCurrentPayments().then((Res)=>{
        console.log(Res);
        this.setState({arrayOfCurrentPayment:Res.data.payments});
    })
  }
  OnPressEdit(id) {
    this.props.history.push(`/edit-payment/${id}`)
  }
}

export default CurrentPayment;
