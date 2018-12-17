import React, { Component } from "react";
import AddDevice from "../component/add-device/add-device";
import "./all-devices.sass";
import DeviceRow from "../component/device-row-of-table/device-row-of-table";
import { DeviceService } from "../services/device.service";

class AllDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfDevices: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <h4>All Devices</h4>
        </div>
        <AddDevice
          DataInserted={va => {
            this.DataInserted(va);
          }}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>Action</th>
              <th>Device Name</th>
              <th>Status</th>
            </tr>
          </thead>
          
            {this.state.arrayOfDevices ? (
             <tbody>
                {" "}
                {this.state.arrayOfDevices.map((v, i) => {
                  return (
                    <tr key={i.toString()}>
                      <DeviceRow
                        DeletedDevice={() => {
                          this.DeletedDevice();
                        }}
                        device={v}
                        key={i.toString()}
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
    DeviceService.allDevices().then(res => {
      res.status === "Failure"
        ? this.setState({ arrayOfDevices: [] })
        : this.setState({ arrayOfDevices: res.data.devices });
    });
  }
  DataInserted(va) {
    this.componentDidMount();
  }
  DeletedDevice() {
    this.componentDidMount();
  }
}

export default AllDevices;
