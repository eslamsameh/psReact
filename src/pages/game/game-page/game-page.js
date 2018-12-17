import React, { Component } from "react";
import AddGame from "../component/add-game/add-game";
import "./game-page.sass";
import SingleGameRow from "../component/single-game-row/single-game-row";
import { GameService } from "../service/game.service";

class AllGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfgames: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <h4>All Games</h4>
        </div>
        <AddGame
          dataInserted={() => {
            this.resiveDataInserted();
          }}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>Action</th>
              <th>Game Name</th>
            </tr>
          </thead>
          {this.state.arrayOfgames ? (
            <tbody>
              {this.state.arrayOfgames.map((v, i) => {
                return (
                  <tr key={i.toString()}>
                    <SingleGameRow
                      Game={v}
                      key={i.toString()}
                      dataChanged={() => {
                        this.resviceDataChangedFromTabe();
                      }}
                    />
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div />
          )}
          <tbody />
        </table>
      </div>
    );
  }
  componentDidMount() {
    GameService.allGames().then(Res => {
      this.setState({ arrayOfgames: Res.data.games });
    });
  }
  resiveDataInserted() {
    this.componentDidMount();
  }
  resviceDataChangedFromTabe() {
    this.componentDidMount();
  }
}

export default AllGames;
