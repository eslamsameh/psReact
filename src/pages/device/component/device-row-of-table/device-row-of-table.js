import React, { Component } from "react";
import "./device-row-of-table.sass";
import { DeviceService } from "../../services/device.service";
class DeviceRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenEditDevice: false,
      deviceName: ""
    };
  }

  render() {
    return [
      <td>
        {this.state.OpenEditDevice === false ? (
          <div className="edit-remove">
            <div>
              <i
                className="fa fa-trash"
                onClick={() => {
                  this.OnPressDelete(this.props.device._id);
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
                  this.onSubmitEdit(this.props.device._id);
                }}
              />
            </div>
          </div>
        )}
      </td>,
      <td className="td-names">
        {this.state.OpenEditDevice === false ? (
          this.props.device.deviceName
        ) : (
          <input
            type="number"
            className="form-control"
            value={this.state.deviceName}
            onChange={value => {
              this.changeDeviceName(value);
            }}
          />
        )}
      </td>,
      <td>
        {this.props.device.statues === 0 ? (
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              this.OnPressNonActive(this.props.device._id);
            }}
          >
            NonActive
          </button>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => {
              this.OnPressActive(this.props.device._id);
            }}
          >
            Active
          </button>
        )}
      </td>
    ];
  }
  componentDidMount() {
    this.setState({ deviceName: this.props.device.deviceName });
  }
  OnPressDelete(id) {
    let data = { deviceId: id };
    DeviceService.DeleteDevice(data).then(Res => {
      this.props.DeletedDevice();
    });
  }
  OnPressEdit() {
    this.setState({ OpenEditDevice: true });
  }
  cancelEdit() {
    this.setState({ OpenEditDevice: false });
  }
  changeDeviceName(value) {
    this.setState({ deviceName: value.target.value });
  }
  onSubmitEdit(id) {
    let data = {
      deviceId: id,
      deviceName: this.state.deviceName,
      statues: this.props.device.statues
    };
    DeviceService.EditDevice(data).then(Res => {
      this.props.DeletedDevice();
      this.setState({ OpenEditDevice: false });
    });
  }
  OnPressNonActive(id) {
    let data = {
      deviceId: id,
      deviceName: this.state.deviceName,
      status: 1
    }
    DeviceService.EditDevice(data).then(Res => {
      this.props.DeletedDevice();
    });
  }
  OnPressActive(id) {
    let data = {
      deviceId: id,
      deviceName: this.state.deviceName,
      status: 0
    }
    DeviceService.EditDevice(data).then(Res => {
      this.props.DeletedDevice();
    });
  }
}

export default DeviceRow;
