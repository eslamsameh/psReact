import React, { Component } from "react";
import "./single-game-row.sass";
import {GameService} from '../../service/game.service';
class SingleGameRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    OpenEditGame: false,
    gameName: ""
    };
  }

  render() {
    return [
      <td>
        {this.state.OpenEditGame === false ? (
          <div className="edit-remove">
            <div>
              <i
                className="fa fa-trash"
                onClick={() => {
                  this.OnPressDelete(this.props.Game._id);
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
                  this.onSubmitEdit(this.props.Game._id);
                }}
              />
            </div>
          </div>
        )}
      </td>,
      <td className="td-names">
        {this.state.OpenEditGame === false ? (
          this.props.Game.gameName
        ) : (
          <input
            type="text"
            className="form-control"
            value={this.state.gameName}
            onChange={value => {
              this.changeGameName(value);
            }}
          />
        )}
      </td>

    ];
  }
  componentDidMount() {
    this.setState({ gameName: this.props.Game.gameName });
  }
  OnPressDelete(id) {
      let data = {gameId: id }
    GameService.DeleteGame(data).then((Res)=>{
        this.props.dataChanged()
    })
  }
  OnPressEdit() {
    this.setState({ OpenEditGame: true });
  }
  cancelEdit() {
    this.setState({ OpenEditGame: false });
  }
  changeGameName(value) {
    this.setState({ gameName: value.target.value });
  }
  onSubmitEdit(id) {
   let data = {
        gameId: id,
        gameName: this.state.gameName,
   }
   GameService.EditGame(data).then((Res)=>{
    this.setState({ OpenEditGame: false });
       this.props.dataChanged();
   })
  }

  
}

export default SingleGameRow;
