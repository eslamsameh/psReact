import React, { Component } from "react";
import "./drink-page.sass";
import AddDrink from "../../component/add-drink/add-drink";
import DrinkRow from "../../component/single-drink-row/single-drink-row";
import { DrinkService } from "../../service/drink.service";
class AllDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfDrinks: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <h4>All Drinks</h4>
        </div>
        <AddDrink
          DataInserted={() => {
            this.DataInserted();
          }}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>Action</th>
              <th>Drink Name</th>
              <th>Price</th>
            </tr>
          </thead>
          {this.state.arrayOfDrinks ? (
            <tbody>
              {" "}
              {this.state.arrayOfDrinks.map((v, i) => {
                return (
                  <tr key={i.toString()}>
                    <DrinkRow
                      DrinkChanged={() => {
                        this.DrinkChanged();
                      }}
                      drink={v}
                      key={i.toString()}
                    />
                  </tr>
                );
              })}{" "}
            </tbody>
          ) : (
            <div />
          )}
        </table>
      </div>
    );
  }
  componentDidMount() {
    DrinkService.allDrinks().then(Res => {
      this.setState({ arrayOfDrinks: Res.data.DrinksNames });
    });
  }
  DrinkChanged() {
    this.componentDidMount();
  }
  DataInserted() {
    this.componentDidMount();
  }
}

export default AllDrinks;
