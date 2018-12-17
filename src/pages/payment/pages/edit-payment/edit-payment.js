import React, { Component } from "react";
import "./edit-payment.sass";
import CustomerSection from "../../components/customer-section/customer-section";
import { EditPaymentService } from "../../service/edit-payment.service";
import DrinkSection from "../../components/drink-section/drink-section";
import { PriceHourService } from "../../../price-hour/service/price-hour.service";
import {DeviceService} from '../../../device/services/device.service';
class EditPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      game: "",
      device: "",
      Play: "",
      statusPrice: "",
      customerId: "",
      startTime: "",
      NowTime: "",
      CurrentpriceHour: 0,
      date: "",
      startTimeBeforeSplite: "",
      amount: 0,
      TotalPriceOfDrinks: 0,
      payed: 0,
      Remening: 0,
      TotalPrevouseRemening: 0,
      singleOrMulti: 3,
      deviceId: "",
      gameId: "",
      paymentUpdatedStatus: 0
    };
  }

  render() {
    return (
      <div className="container">
        <h4>Edit Payment</h4>
        <CustomerSection
          paymentId={this.props.match.params.paymentId}
          customer={this.state.customer}
          customerData={customer => {
            this.onResiveCustomerData(customer);
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
              <input
                type="text"
                className="form-control"
                value={this.state.device}
                readonly
              />
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
              <input
                type="text"
                className="form-control"
                value={this.state.statusPrice}
                readonly
              />
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
              <input
                type="text"
                className="form-control"
                readonly
                value={this.state.game}
              />
            </div>
          </div>
        </div>
        <DrinkSection
          paymentId={this.props.match.params.paymentId}
          sendTotalPrice={v => {
            this.resiveTotalPriceOfDrink(v);
          }}
        />

        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4">
                <div class="input-group">
                  <label>Start Time</label>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="input-group">
                  <input
                    type="time"
                    class="form-control"
                    readonly
                    value={this.state.startTime}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4">
                <div class="input-group">
                  <label>Now Time</label>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="input-group">
                  <input
                    type="time"
                    class="form-control"
                    readonly
                    value={this.state.NowTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-4">
            <div class="row">
              <div class="col-sm-6">
                <div class="input-group">
                  <label>Amount</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-group">
                  <input
                    type="number"
                    placeholder="0"
                    class="form-control"
                    readonly
                    value={this.state.amount}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="row">
              <div class="col-sm-6">
                <div class="input-group">
                  <label>Payed</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    value={this.state.payed}
                    onChange={v => {
                      this.onChangePayed(v);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="row">
              <div class="col-sm-6">
                <div class="input-group">
                  <label>Remening</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-group">
                  <input
                    type="number"
                    placeholder="0"
                    class="form-control"
                    readonly
                    value={this.state.Remening}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2">
            <label>Previous Remening</label>
          </div>
          <div class="col-sm-10">
            <div class="input-group">
              <input
                type="number"
                placeholder="0"
                class="form-control"
                readonly
              />
            </div>
          </div>
        </div>
        <div>{this.SuccessOfFail()}</div>

        <div class="btn-finsh">
      <button class="btn btn-outline-danger" onClick={()=>{this.OnPressFinshTime()}} >Finsh Time</button>
    </div>
      </div>
    );
  }
  onChangePayed(e) {
    let payedInput = e.target.value;
    this.setState({ payed: payedInput }, () => {
      if (this.state.amount >= this.state.payed) {
        this.setState({
          Remening: this.state.amount - parseInt(this.state.payed)
        });
      } else {
        this.setState({ Remening: 0 });
      }
    });
  }
  componentWillMount() {
    EditPaymentService.getPayment({
      paymentId: this.props.match.params.paymentId
    }).then(Res => {
      const d = new Date(),
        h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
        m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

      console.log(Res);
      this.setState(
        {
          customer: Res.data.payments.customer,
          device: Res.data.payments.device.deviceName,
          game: Res.data.payments.game.gameName,
          startTime: Res.data.payments.startTime.split("T")[1].replace("Z", ""),
          NowTime: h + ":" + m,
          date: Res.data.payments.date,
          startTimeBeforeSplite: Res.data.payments.startTime,
          deviceId: Res.data.payments.device._id,
          gameId: Res.data.payments.game._id
        },
        () => {}
      );
      if (Res.data.payments.singleOrMulti === 0) {
        this.setState({ statusPrice: "Single" }, () => {
          this.getPlayHour();
        });
      } else {
        this.setState({ statusPrice: "Multi" }, () => {
          this.getPlayHour();
        });
      }
    });
  }
  onResiveCustomerData(c) {
    this.setState({ customer: c });
    this.prevouseRemening();
  }
  getPlayHour() {
    PriceHourService.getHourPrice().then(Res => {
      if (this.state.statusPrice === "Single") {
        this.setState({ CurrentpriceHour: Res.data.playHour[0].single,singleOrMulti: 0 });
        this.calcTimeBetweenStartAndEndPlay();
      } else {
        this.setState({ CurrentpriceHour: Res.data.playHour[0].multi, singleOrMulti: 1  });
        this.calcTimeBetweenStartAndEndPlay();
      }
    });
  }

  resiveTotalPriceOfDrink(v) {
    this.setState({ TotalPriceOfDrinks: v }, () => {
      this.calcTimeBetweenStartAndEndPlay();
    });
  }
  calcTimeBetweenStartAndEndPlay() {
    this.setState(
      {
        startTimeBeforeSplite: this.state.startTimeBeforeSplite,
        amount: 0
      },
      () => {
        let startTime;
        if (this.state.startTime) {
          startTime = this.state.startTimeBeforeSplite
            .replace(/-/g, "/")
            .replace("T", " ")
            .replace("Z", "")
            .replace(".000", "");
        }
        startTime = new Date(startTime);
        const endTime = new Date();

        const difference = endTime.getTime() - startTime.getTime();
        // This will give difference in milliseconds
        const resultInMinutes = Math.round(difference / 60000);
        const firstResult = this.state.CurrentpriceHour / 60;
        const FinalResult = (firstResult * resultInMinutes).toFixed(1);
        const resutltOfDrinkAndTime =
          parseFloat(this.state.TotalPriceOfDrinks) + parseFloat(FinalResult);
        this.setState({ amount: resutltOfDrinkAndTime });
      }
    );
  }
  prevouseRemening() {
    let data = {
      customer: this.state.customer._id
    };

    EditPaymentService.getRemaningForCustomer(data).then(Res => {
      if (Res.data.TotalRemening[0].remeningAmount) {
        const ArrayOfCustomer = Res.data.TotalRemening;
        const ArrayOfcustomerRemening = ArrayOfCustomer.map(
          v => v.remeningAmount
        );
        const SumOfCustomerRemening = ArrayOfCustomer.reduce(
          (a, b) => a + b,
          0
        );
        this.setState({ TotalPrevouseRemening: SumOfCustomerRemening });
      } else {
        this.setState({ TotalPrevouseRemening: 0 });
      }
    });
  }
  OnPressFinshTime () {
    let time = this.state.date.split("T")[0];
     var StartTimeToSplit = this.state.startTime;  
     var leftSideOfTime = StartTimeToSplit.split(':')[0];
     var RightSideOfTime = StartTimeToSplit.split(':')[1];
     var StartTimeAfterSplit = leftSideOfTime + '.' + RightSideOfTime;
     StartTimeAfterSplit = (parseFloat(StartTimeAfterSplit) + 2.00).toFixed(2);
     StartTimeAfterSplit = StartTimeAfterSplit.toString();
     var StartTimeAfterSplitLeftSideOfTime =  StartTimeAfterSplit.split(".")[0];
     var StartTimeAfterSplitRightSideOfTime =  StartTimeAfterSplit.split(".")[1];
     var FinalStartTime = StartTimeAfterSplitLeftSideOfTime + ":" + StartTimeAfterSplitRightSideOfTime;
         const startDate = time + " " + FinalStartTime;
      
         var EndTimeToSplit = this.state.NowTime;  
         var leftSideOfEndTime = EndTimeToSplit.split(':')[0];
         var RightSideOfEndTime = EndTimeToSplit.split(':')[1];
         var EndTimeAfterSplit = leftSideOfEndTime + '.' + RightSideOfEndTime;
         EndTimeAfterSplit = (parseFloat(EndTimeAfterSplit) + 2.00).toFixed(2);
         EndTimeAfterSplit = EndTimeAfterSplit.toString();
         var EndTimeAfterSplitLeftSideOfTime =  EndTimeAfterSplit.split(".")[0];
         var EndTimeAfterSplitRightSideOfTime =  EndTimeAfterSplit.split(".")[1];
         var FinalEndTime = EndTimeAfterSplitLeftSideOfTime + ":" + EndTimeAfterSplitRightSideOfTime;
        const   EndDate= time + " " + FinalEndTime;
    
    let UpadatedData = {
      paymentId:this.props.match.params.paymentId,
      startTime: startDate,
      endTime: EndDate,
      amount: this.state.amount,
      payed: this.state.payed,
      remeningAmount: this.state.Remening,
      date: this.state.date,
      finshed: 1,
      singleOrMulti: this.state.singleOrMulti,
      admin: sessionStorage.getItem("adminId"),
      customer: this.state.customer._id,
      device: this.state.deviceId,
      game: this.state.gameId
    }
    EditPaymentService.FinishTime(UpadatedData).then((Res)=>{
     if (Res.data.status === "success") {
      let makeDeviceNonActive = {
        deviceId: this.state.deviceId,
        deviceName: this.state.device,
        statues: 0
      };
      DeviceService.EditDevice(makeDeviceNonActive).then(Resp => {
        if ((Resp.data.status = "success")) {
          this.setState({ paymentUpdatedStatus: 1 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ paymentUpdatedStatus: 0 });
          }, 2000);
        } else {
          this.setState({ paymentUpdatedStatus: 2 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ paymentUpdatedStatus: 0 });
          }, 2000);
        }
      });
     }
    })

    
  }

  SuccessOfFail() {
    if (this.state.paymentUpdatedStatus === 1) {
      return (
        <div>
          <div class="alert alert-success ">
            <strong>Success!</strong> Success Add
          </div>
        </div>
      );
    } else if (this.state.paymentUpdatedStatus === 2) {
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

export default EditPayment;
