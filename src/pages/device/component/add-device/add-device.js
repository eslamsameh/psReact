import React, { Component } from "react";
import './add-device.sass';
import {DeviceService} from '../../services/device.service';

class AddDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName:"",
      reloadPage:""
    };
  }

  render() {
    if (sessionStorage.getItem("role") ==="Admin") {
      return (
        <div className="container">
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Device</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label>Device Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Device Name"
                      value={this.state.deviceName}
                      onChange={(value)=>{this.onChangeDeviceName(value)}}
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
                    onClick={()=>{this.OnPressSubmit()}}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-add-device">
            <button
              type="button"
              className="btn btn-info "
              data-toggle="modal"
              data-target="#myModal"
            >
              Add Device
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  onChangeDeviceName(value){
    this.setState({deviceName:value.target.value});
  }
  OnPressSubmit() {
   
    let data={deviceName:this.state.deviceName, statues: 0}
    DeviceService.AddDevice(data).then((res)=>{
      this.props.DataInserted("AddNewDevice")
      console.log(res);
    }).catch((fail)=>{
      
    })
  }
}

export default AddDevices;
