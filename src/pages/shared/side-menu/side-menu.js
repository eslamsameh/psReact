import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./side-menu.sass";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RenderFull: true
    };
  }

  componentWillReceiveProps(props) {
    console.log(props.kelmamb3ota);
  }

  render() {
    return <div>{this.RenderSideMenu()}</div>;
  }

  RenderSideMenu() {
    if (this.state.RenderFull === true) {
      return (
        <div
          style={{ height: "100%", minHeight: "87vh", background: "#43566e" }}
        >
          <div className="sidebar">
            <div className="links">
              <div className="menu-toggle">
                <i
                  className="fa fa-align-justify"
                  onClick={this.OnPresstoggleLess.bind(this)}
                />
              </div>
              <div className="side-Header">
                <h6 style={{ textAlign: "center" }}> Wembley Ps</h6>
              </div>
              <div className="side-Header-item">
                <i className="fa fa-home" />
                <NavLink activeClassName="selected" to="/">
                  Home
                </NavLink>
              </div>
              <div
                className="side-Header-item"
                data-toggle="collapse"
                data-target="#admin"
              >
                <i className="fa fa-user" />
                <h6>Admin</h6>
              </div>
              <div id="admin" className="collapse">
                <div className="page-link ">
                  <i className="fa fa-user-plus" />
                  <NavLink
                    activeClassName="active-like-home"
                    to="/add-new-admin"
                  >
                    Add New Admin
                  </NavLink>
                </div>
                <div className="page-link">
                  <i className="fa fa-users" />
                  <NavLink activeClassName="active-like-home" to="/all-admins">
                    All Admin
                  </NavLink>
                </div>
                <div className="page-link">
                  <i className="fa fa-address-card" />
                  <NavLink activeClassName="active-like-home" to="/view-me">
                    My Profile
                  </NavLink>
                </div>
              </div>
              <div className="side-Header-item">
                <i className="fa fa-television" />
                <NavLink activeClassName="selected" to="/all-devices">
                  <h6> Device</h6>
                </NavLink>
              </div>

              <div
                className="side-Header-item"
                data-toggle="collapse"
                data-target="#payment"
              >
                <i className="fa fa-euro" />
                <h6>Payment</h6>
              </div>
              <div id="payment" className="collapse">
                <div className="page-link ">
                  <i className="fa fa-euro" />
                  <NavLink
                    activeClassName="active-like-home"
                    to="/open-time"
                  >
                    Open Time
                  </NavLink>
                </div>
                <div className="page-link ">
                  <i className="fa fa-clock-o" />
                  <NavLink
                    activeClassName="active-like-home"
                    to="/current-payment"
                  >
                    Current Payment
                  </NavLink>
                </div>
                <div className="page-link">
                  <i className="fa fa-bar-chart" />
                  <NavLink
                    activeClassName="active-like-home"
                    to="/pages/payment/payment-reports"
                  >
                    Payments Reports
                  </NavLink>
                </div>
              </div>

              <div className="side-Header-item">
                <i className="fa fa-gamepad" />
                <NavLink activeClassName="selected" to="/all-game">
                  <h6>Games</h6>
                </NavLink>
              </div>

              <div className="side-Header-item">
                <i className="fa fa-beer" />
                <NavLink activeClassName="selected" to="/all-drink">
                  <h6>Drink</h6>
                </NavLink>
              </div>

              <div className="side-Header-item">
                <i className="fa fa-user-circle-o" />
                <NavLink activeClassName="selected" to="/all-customer">
                  <h6>Customer</h6>
                </NavLink>
              </div>

              <div className="side-Header-item">
                <i className="fa fa-clock-o" />
                <NavLink activeClassName="selected" to="/price-hour">
                  <h6>Edit Your Hour Price</h6>
                </NavLink>
              </div>
              <div className="side-Header-item">
                <i className="fa fa-file-text-o" />
                <NavLink activeClassName="selected" to="/text-editor">
                  <h6>Print Text</h6>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: "100%", minHeight: "87vh", background: "#43566e" }}
        >
          <div className="sidebar">
            <div className="links">
              <div className="menu-toggle-less">
                <i
                  className="fa fa-align-justify "
                  onClick={this.OnPresstoggleLess.bind(this)}
                />
              </div>
              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/">
                  <i className="fa fa-home" />
                </NavLink>
              </div>

              <div
                className="side-Header-item-icon"
                data-toggle="collapse"
                data-target="#admin"
              >
                <i className="fa fa-user" />
              </div>
              <div id="admin" className="collapse">
                <div className="page-link">
                  <NavLink activeClassName="active-like-home" to="/add-new-admin">
                    <i className="fa fa-user-plus" />
                  </NavLink>
                </div>

                <div className="page-link">
                  <NavLink activeClassName="active-like-home" to="/all-admins">
                    <i className="fa fa-user-plus" />
                  </NavLink>
                </div>
                <div className="page-link">
                  <NavLink activeClassName="active-like-home" to="/view-me">
                    <i className="fa fa-address-card" />
                  </NavLink>
                </div>
              </div>
              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/all-devices">
                  <i className="fa fa-television" />
                </NavLink>
              </div>
              <div
                className="side-Header-item-icon"
                data-toggle="collapse"
                data-target="#payment"
              >
                <i className="fa fa-euro" />
              </div>
              <div id="payment" className="collapse">
                <div className="page-link ">
                  <NavLink
                    activeClassName="active-like-home"
                    to="/open-time"
                  >
                    <i className="fa fa-euro" />
                  </NavLink>
                </div>
                <div className="page-link">
                  <NavLink
                    activeClassName="active-like-home"
                    to="/current-payment"
                  >
                    <i className="fa fa-clock-o" />
                  </NavLink>
                </div>
                <div className="page-link">
                  <NavLink
                    activeClassName="active-like-home"
                    to="/pagesadmin/payment/payment-reports"
                  >
                    <i className="fa fa-bar-chart" />
                  </NavLink>
                </div>
              </div>

              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/all-game">
                  <i className="fa fa-gamepad" />
                </NavLink>
              </div>

              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/all-drink">
                  <i className="fa fa-beer " />
                </NavLink>
              </div>

              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/all-customer">
                  <i className="fa fa-address-card" />
                </NavLink>
              </div>

              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/price-hour">
                  <i className="fa fa-clock-o" />
                </NavLink>
              </div>
              <div className="side-Header-item-icon">
                <NavLink activeClassName="selected" to="/text-editor">
                  <i className="fa fa-file-text-o" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  OnPresstoggleLess() {
    this.setState({ RenderFull: !this.state.RenderFull }, () => {
      this.props.fixStyle(this.state.RenderFull);
    });
  }
}

export default SideMenu;
