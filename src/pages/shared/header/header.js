import React, { Component } from 'react';
import  './header.sass'
class Header extends Component {
  render() {
    return (
        <div className="header">
  <div className="container">
    <div className="div-flex">
        <div className="userName">
            Welcome Eslam
          </div>

      <div className="logo">
        <button className="btn btn-danger" >Logout</button>
      </div>

    </div>
  </div>
</div>

    );
  }
}

export default Header;
