import React, { Component } from "react";
import "./single-drink-row.sass";
import {DrinkService} from '../../service/drink.service';
class DrinkRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenEditDrink: false,
      drinkName: "",
      drinkPrice: ""
    };
  }

  render() {
    return [
      <td>
        {this.state.OpenEditDrink === false ? (
          <div className="edit-remove">
            <div>
              <i
                className="fa fa-trash"
                onClick={() => {
                  this.OnPressDelete(this.props.drink._id);
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
                  this.onSubmitEdit(this.props.drink._id);
                }}
              />
            </div>
          </div>
        )}
      </td>,
      <td className="td-names">
        {this.state.OpenEditDrink === false ? (
          this.props.drink.drinkName
        ) : (
          <input
            type="text"
            className="form-control"
            value={this.state.drinkName}
            onChange={value => {
              this.changeDrink("drinkName",value);
            }}
          />
        )}
      </td>,
       <td className="td-names">
       {this.state.OpenEditDrink === false ? (
         this.props.drink.price
       ) : (
         <input
           type="number"
           className="form-control"
           value={this.state.drinkPrice}
           onChange={value => {
             this.changeDrink("drinkPrice",value);
           }}
         />
       )}
     </td>,
  
    ];
  }
  componentDidMount() {
    this.setState({ drinkName: this.props.drink.drinkName });
    this.setState({drinkPrice:this.props.drink.price})
  }
  OnPressDelete(id) {
    DrinkService.DeleteDrink({drinkID:id}).then((res)=>{
        this.props.DrinkChanged();
    })
  }
  OnPressEdit() {
    this.setState({ OpenEditDrink: true });
  }
  cancelEdit() {
    this.setState({ OpenEditDrink: false });
  }
  changeDrink(key,value) {
    this.setState({ [key]: value.target.value });
  }
  onSubmitEdit(id) {
    let data = {
     drinkID: id,
     drinkName: this.state.drinkName,
      price: this.state.drinkPrice
    };
    DrinkService.EditDrink(data).then((Res)=>{
        this.props.DrinkChanged();
        this.setState({ OpenEditDrink: false });
    })
   
  }
 
  
}

export default DrinkRow;
