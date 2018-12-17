import React, { Component } from "react";
import "./drink-section.sass";
import { DrinkService } from "../../../drinks/service/drink.service";
import { EditPaymentService } from "../../service/edit-payment.service";
class DrinkSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      arrayOfCurrentDrinks: [],
      drinkId: ""
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
            <div className="input-group">
              <label>Drinks</label>
            </div>
          </div>
          <div className="col-sm-10">
            <div className="input-group">
              <select
                className="form-control"
                onChange={value => {
                  this.onSelectDrink(value);
                }}
              >
                <option disabled selected hidden>
                  drink Name
                </option>
                {this.state.drinks ? (
                  <option>
                    {this.state.drinks.map((v, i) => {
                      return v.drinkName;
                    })}
                  </option>
                ) : (
                  ""
                )}
              </select>
              <button
                className="btn btn-info"
                onClick={this.onPressSaveDrink.bind(this)}
              >
                Save
              </button>
            </div>
          </div>
          <div className="Current-Drinks">
            {this.state.arrayOfCurrentDrinks
              ? this.state.arrayOfCurrentDrinks.map((v, i) => {
                  return (
                    <div className="drink">
                      {v.drinkName.drinkName}
                      <i
                        className="fa fa-close"
                        onClick={() => {
                          this.onPressDeleteDrink(v._id);
                        }}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    DrinkService.allDrinks().then(Res => {
      console.log("drinks", Res.data.DrinksNames);
      this.setState({ drinks: Res.data.DrinksNames });
    });
    this.getCurrentDrinksPayment();
  }
  getCurrentDrinksPayment() {
    EditPaymentService.getCurrentPaymentDrinks({
      paymentId: this.props.paymentId
    }).then(Res => {
     
      console.log("currentDrinks", Res.data.drinks);
      const drinkPrice = []
      this.setState({ arrayOfCurrentDrinks: Res.data.drinks },()=>{
        this.state.arrayOfCurrentDrinks.forEach((v,i)=>{
          drinkPrice.push(v.drinkName.price);
         
        })
        const TotalPrice = drinkPrice.reduce((a,b)=>a+b,0);
        this.props.sendTotalPrice(TotalPrice);

      });
      
    });
  }

  onSelectDrink(e) {
    let value = e.target.value;
    this.state.drinks.forEach((v, i) => {
      value == v.drinkName
        ? this.setState({ drinkId: v._id })
        : console.log("fail");
    });
  }
  onPressSaveDrink() {
    console.log(this.state.drinkId);
    let data = {
      payment: this.props.paymentId,
      drinkName: this.state.drinkId
    };
    EditPaymentService.saveDrink(data).then(Res => {
      this.getCurrentDrinksPayment();
    });
  }
  onPressDeleteDrink(id) {
    let data = {
      drinkId: id
    };
    EditPaymentService.deletDrink(data).then(Res => {
      this.getCurrentDrinksPayment();
    });
  }
}

export default DrinkSection;
