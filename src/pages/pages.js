import React, { Component } from "react";
import Home from "./home/home";
import Footer from "./shared/footer/footer";
import Header from "./shared/header/header";
import SideMenu from "./shared/side-menu/side-menu";
import AddNewAdmin from "./admin/add-new-admin/add-new-admin";
import GetAllAdmin from "./admin/get-all-admin/get-all-admin";
import EditAdmin from "./admin/edit-admin/edit-admin";
import ViewAdmin from "./admin/view-profile/view-profile";
import AllDevices from "./device/device-page/all-devices";
import Game from "./game/game-page/game-page";
import TextEditor from "./text-editor/text-editor";
import AllDrink from "./drinks/pages/drink-page/drink-page";
import PriceHour from "./price-hour/price-hour-page/price-hour-page";
import AllCustomer from "./customer/pages/all-customer-page/all-customer-page";
import CustomerDetails from "./customer/pages/customer-page-details/customer-page-details";
import OpenTime from './payment/pages/open-time/open-time';
import CurrentPayement from './payment/pages/current-payment/current-payment';
import EditPayment from './payment/pages/edit-payment/edit-payment';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routerClass: "col-sm-10",
      sideMenuClass: "col-sm-2"
    };
  }

  receiveFixStyle(value) {
    value === true
      ? this.setState({ routerClass: "col-sm-10", sideMenuClass: "col-sm-2" })
      : this.setState({ routerClass: "col-sm-11", sideMenuClass: "col-sm-1" });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Header />
          </Switch>
          <div className="row" style={{ width: "100%", minHeight: "87vh" }}>
            <div
              className={this.state.sideMenuClass}
              style={{ background: "#43566e", padding: "0px" }}
            >
              <Switch>
                <SideMenu
                  fixStyle={value => {
                    this.receiveFixStyle(value);
                  }}
                  kelmamab3ota="z3bola"
                />
              </Switch>
            </div>
            <div className={this.state.routerClass}>
              <Route exact path="/" component={Home} />
              <Route path="/add-new-admin" component={AddNewAdmin} />
              <Route path="/all-admins" component={GetAllAdmin} />
              <Route path="/edit-admin/:id" component={EditAdmin} />
              <Route path="/view-me" component={ViewAdmin} />
              <Route path="/all-devices" component={AllDevices} />
              <Route path="/all-game" component={Game} />
              <Route path="/text-editor" component={TextEditor} />
              <Route path="/all-drink" component={AllDrink} />
              <Route path="/price-hour" component={PriceHour} />
              <Route path="/all-customer" component={AllCustomer} />
              <Route path="/customer-details/:customerId" component={CustomerDetails}/>
              <Route path="/open-time" component={OpenTime}/>
              <Route path="/current-payment" component={CurrentPayement}/>
              <Route path="/edit-payment/:paymentId" component={EditPayment}/>

            </div>
          </div>
          <Switch>
            <Footer />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Pages;
