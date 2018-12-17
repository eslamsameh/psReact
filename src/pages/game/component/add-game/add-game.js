import React, { Component } from "react";
import "./add-game.sass";
import { GameService } from "../../service/game.service";

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: ""
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
                  <h4 className="modal-title">Add Game</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label>Game Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Game Name"
                      value={this.state.gameName}
                      onChange={value => {
                        this.onChangeGameName(value);
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
              Add Game
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  onChangeGameName(value) {
    this.setState({ gameName: value.target.value });
  }
  OnPressSubmit() {
    let data = {
      gameName: this.state.gameName
    };
    GameService.AddGame(data).then(Res => {
      this.props.dataInserted();
    });
  }
}

export default AddGame;
