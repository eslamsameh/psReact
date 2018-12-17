import React, { Component } from "react";
import "./add-drink.sass";
import { DrinkService } from "../../service/drink.service";
class AddDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DrinkName: "",
      DrinkPrice: ""
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
                  <h4 className="modal-title">Add Drink</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label>Drink Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Drink Name"
                      value={this.state.DrinkName}
                      onChange={value => {
                        this.onChangeDrink("DrinkName", value);
                      }}
                    />
                  </div>

                  <div className="input-group">
                    <label>Drink Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Drink Name"
                      value={this.state.DrinkPrice}
                      onChange={value => {
                        this.onChangeDrink("DrinkPrice", value);
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
              Add Drink
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  onChangeDrink(key, value) {
    this.setState({ [key]: value.target.value });
  }
  OnPressSubmit() {
    let data = {
      drinkName: this.state.DrinkName,
      price: this.state.DrinkPrice
    };
    DrinkService.AddDrink(data).then(Res => {
      this.props.DataInserted();
    });
  }
}

export default AddDrink;
