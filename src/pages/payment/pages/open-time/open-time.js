import React, { Component } from "react";
import CustomerSection from "../../components/customer-section/customer-section";
import "./open-time.sass";
import { DeviceService } from "../../../device/services/device.service";
import { GameService } from "../../../game/service/game.service";
import { StartPaymentService } from "../../service/start-patment.service";
class OpenTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      game: "",
      device: "",
      finshed: 0,
      date: "",
      startTime: "",
      endTime: "",
      singleOrMulti: 0,
      // witch value of single or multi
      single: 0,
      Multi: 1,
      // arrays
      arrayOfDevices: [],
      arrayOfGames: [],
      // deviceName when need when make the device active
      deviceName: "",
      // for make alert show when success Added !
      paymentInsertationStatus: 0
    };
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div>
            <h4>OpenTime</h4>
          </div>
          <div>
            {" "}
            <CustomerSection
              customerData={val => {
                this.CustomerIdToSave(val);
              }}
            />
            <div className="row">
              <div className="col-sm-2">
                <div className="input-group">
                  <label>Device</label>
                </div>
              </div>
              <div className="col-sm-10">
                <div className="input-group">
                  <select
                    className="form-control"
                    onChange={value => {
                      this.SelectOption("device", value);
                    }}
                  >
                    <option disabled selected>
                      Device Name
                    </option>
                    {this.state.arrayOfDevices.map((val, i) => {
                      return (
                        <option key={i} id={val._id} value={val.deviceName}>
                          {val.deviceName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <div className="input-group">
                  <label>Play</label>
                </div>
              </div>
              <div className="col-sm-10">
                <div className="input-group">
                  <select
                    className="form-control"
                    onChange={value => {
                      this.SelectOption("", value);
                    }}
                  >
                    <option disabled selected>
                      Play{" "}
                    </option>
                    <option value={this.state.Multi}>Multi</option>
                    <option value={this.state.single}>Single</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <div className="input-group">
                  <label>Game</label>
                </div>
              </div>
              <div className="col-sm-10">
                <div className="input-group">
                  <select
                    className="form-control"
                    onChange={value => {
                      this.SelectOption("game", value);
                    }}
                  >
                    <option disabled selected>
                      Game Name
                    </option>
                    {this.state.arrayOfGames.map((val, i) => {
                      return (
                        <option value={val._id} key={i}>
                          {val.gameName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="input-group">
                      <label>Start Time</label>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input
                        type="time"
                        className="form-control"
                        value={this.state.startTime}
                        onChange={value => {
                          this.SelectOption("startTime", value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="input-group">
                      <label>End Time</label>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input
                        type="time"
                        className="form-control"
                        value={this.state.endTime}
                        onChange={value => {
                          this.SelectOption("endTime", value);
                        }}
                      />
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-save-payment">
              <button
                className="btn btn-dark"
                onClick={this.startPayment.bind(this)}
              >
                {" "}
                Start Payment{" "}
              </button>
            </div>
            <div>{this.SuccessOfFail()}</div>
          </div>
        </div>
      </div>
    );
  }
  CustomerIdToSave(val) {
    this.setState({ customer: val });
  }
  componentDidMount() {
    this.getDevices();
    this.getGames();
    const currentdate = new Date();
    const date = currentdate.getFullYear() +"-" +(currentdate.getMonth() + 1) +"-" +currentdate.getDate();
    this.setState({ date: date });
  }
  getDevices() {
    DeviceService.GetNonActiveDevice().then(Res => {
      this.setState({ arrayOfDevices: Res.data.device });
    });
  }
  getGames() {
    GameService.allGames().then(Res => {
      this.setState({ arrayOfGames: Res.data.games });
    });
  }

  SelectOption(key, value) {
    if (key === "device") {
      let index = value.target.selectedIndex;
      let elment = value.target.childNodes[index];
      let option = elment.getAttribute("id");
      this.setState({ device: option, deviceName: value.target.value });
    } else {
      if (key) {
        this.setState({ [key]: value.target.value });
      } else {
        if (value.target.value == 0) {
          this.setState({ singleOrMulti: 0 });
        } else {
          this.setState({ singleOrMulti: 1 });
        }
      }
    }
  }

  startPayment() {
    let EndDate; 
    var StartTimeToSplit = this.state.startTime;  
var leftSideOfTime = StartTimeToSplit.split(':')[0];
var RightSideOfTime = StartTimeToSplit.split(':')[1];
var StartTimeAfterSplit = leftSideOfTime + '.' + RightSideOfTime;
StartTimeAfterSplit = (parseFloat(StartTimeAfterSplit) + 2.00).toFixed(2);
StartTimeAfterSplit = StartTimeAfterSplit.toString();
var StartTimeAfterSplitLeftSideOfTime =  StartTimeAfterSplit.split(".")[0];
var StartTimeAfterSplitRightSideOfTime =  StartTimeAfterSplit.split(".")[1];
var FinalStartTime = StartTimeAfterSplitLeftSideOfTime + ":" + StartTimeAfterSplitRightSideOfTime;
    const startDate = this.state.date + " " + FinalStartTime;
   if (this.state.endTime) {
    var EndTimeToSplit = this.state.endTime;  
    var leftSideOfEndTime = EndTimeToSplit.split(':')[0];
    var RightSideOfEndTime = EndTimeToSplit.split(':')[1];
    var EndTimeAfterSplit = leftSideOfEndTime + '.' + RightSideOfEndTime;
    EndTimeAfterSplit = (parseFloat(EndTimeAfterSplit) + 2.00).toFixed(2);
    EndTimeAfterSplit = EndTimeAfterSplit.toString();
    var EndTimeAfterSplitLeftSideOfTime =  EndTimeAfterSplit.split(".")[0];
    var EndTimeAfterSplitRightSideOfTime =  EndTimeAfterSplit.split(".")[1];
    var FinalEndTime = EndTimeAfterSplitLeftSideOfTime + ":" + EndTimeAfterSplitRightSideOfTime;
     EndDate= this.state.date + " " + FinalEndTime;
   }

    let data = {
      startTime: startDate,
      endTime: EndDate,
      date: this.state.date,
      finshed: 0,
      singleOrMulti: this.state.singleOrMulti,
      admin: sessionStorage.getItem("adminId"),
      customer: this.state.customer,
      device: this.state.device,
      game: this.state.game,
    };
    StartPaymentService.StartTime(data).then(Res => {
      console.log(Res);
      let makeDeviceActive = {
        deviceId: this.state.device,
        deviceName: this.state.deviceName,
        statues: 1
      };
      DeviceService.EditDevice(makeDeviceActive).then(Resp => {
        if ((Resp.data.status = "success")) {
          this.setState({ paymentInsertationStatus: 1 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ paymentInsertationStatus: 0 });
          }, 2000);
        } else {
          this.setState({ paymentInsertationStatus: 2 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ paymentInsertationStatus: 0 });
          }, 2000);
        }
      });
    });
  }

  SuccessOfFail() {
    if (this.state.paymentInsertationStatus === 1) {
      return (
        <div>
          <div class="alert alert-success ">
            <strong>Success!</strong> Success Add
          </div>
        </div>
      );
    } else if (this.state.paymentInsertationStatus === 2) {
      return (
        <div>
          <div class="alert alert-danger ">
            <strong>Failure!</strong>  Add Fail
          </div>
        </div>
      );
    }
  }
}

export default OpenTime;
