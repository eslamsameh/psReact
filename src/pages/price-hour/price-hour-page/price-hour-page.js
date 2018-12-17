import React, { Component } from "react";
import "./price-hour-page.sass";
import { PriceHourService } from "../service/price-hour.service";
class PriceHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleValue: 0,
      multiValue: 0,
      id: "",
      successOrFailUpdate: 0
    };
  }

  render() {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <div className="container">
          <div className="hour-price-page">
            <div className="card">
              <h4>Edit Your Hour Price</h4>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="input-group">
                      <label>Single Hour Play</label>
                    </div>
                    <div className="input-group">
                      <label>Multi Hour Play</label>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Single Price Hour"
                        className="form-control"
                        value={this.state.singleValue}
                        onChange={value => {
                          this.OnChangeInputs("singleValue", value);
                        }}
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Multi Price Hour"
                        className="form-control"
                        value={this.state.multiValue}
                        onChange={value => {
                          this.OnChangeInputs("multiValue", value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="btn-submit">
                  <button
                    className="btn btn-secondary"
                    onClick={this.OnPressSubmit.bind(this)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div>{this.SuccessOfFail()}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  OnChangeInputs(key, value) {
    this.setState({ [key]: value.target.value });
  }
  componentDidMount() {
    PriceHourService.getHourPrice().then(Res => {
      console.log(Res);
      this.setState({
        singleValue: Res.data.playHour[0].single,
        multiValue: Res.data.playHour[0].multi,
        id: Res.data.playHour[0]._id
      });
    });
  }
  OnPressSubmit() {
    const data = {
      single: this.state.singleValue,
      multi: this.state.multiValue,
      playHourId: this.state.id
    };
    PriceHourService.UpdatePlayHour(data)
      .then(Res => {
        if (Res.data.status === "success") {
          this.setState({ successOrFailUpdate: 1 });
          setTimeout(() => {
            this.setState({ successOrFailUpdate: 0 });
          }, 1000);
        } else {
          this.setState({ successOrFailUpdate: 2 });
          setTimeout(() => {
            this.setState({ successOrFailUpdate: 0 });
          }, 1000);
        }
      })
      .catch(fail => {
        this.setState({ successOrFailUpdate: 2 });
        setTimeout(() => {
          this.setState({ successOrFailUpdate: 0 });
        }, 1000);
      });
  }
  SuccessOfFail() {
    if (this.state.successOrFailUpdate === 1) {
      return (
        <div>
          <div className="alert alert-success ">
            <strong>Success!</strong> Updated
          </div>
        </div>
      );
    } else if (this.state.successOrFailUpdate === 2) {
      return (
        <div>
          <div class="alert alert-danger ">
            <strong>Failure!</strong> Update
          </div>
        </div>
      );
    }
  }
}

export default PriceHour;
