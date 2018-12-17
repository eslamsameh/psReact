import React, { Component } from "react";
import "./login.sass";
import { LoginServiceFunctions } from "./service/login.service";
import { Redirect } from 'react-router-dom'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUserNameValue: "",
      inputPasswordValue: "",
      loginStatus: 0,
      redirect: false
    };
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to="/pages" />;
      }
    return (
      <div className="div-login">
        <div className="container">
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              <div className="card">
                <div>{this.SuccessLogin()}</div>
                <div className="card-body">
                  <h4>Welcome to Wembley PS</h4>
                  <div className="input-group">
                    <label> User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      value={this.state.inputUserNameValue}
                      onChange={name => this.updateInputUserNameValue(name)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Pass Word</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.inputPasswordValue}
                      onChange={pass => this.updatePasswordValue(pass)}
                    />
                  </div>
                  <div className="btn-login">
                    <button
                      className="btn btn-outline-dark"
                      onClick={this.OnPressLogin.bind(this)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateInputUserNameValue = name => {
    this.setState({ inputUserNameValue: name.target.value });
  }

  updatePasswordValue(pass) {
    this.setState({ inputPasswordValue: pass.target.value });
  }

  OnPressLogin() {
    const data = {
      name: this.state.inputUserNameValue,
      password: this.state.inputPasswordValue
    };
    LoginServiceFunctions.Login(data).then(Res => {
        this.setState({loginStatus: 1 });
        setTimeout(() => {
            sessionStorage.setItem("name",Res.data.name);
            sessionStorage.setItem("adminId",Res.data.adminId);
            sessionStorage.setItem("role",Res.data.role);
            sessionStorage.setItem("accessToken",Res.data.token);
            this.setState({loginStatus: 0,redirect:true });
        }, 1000);
        this.SuccessLogin();
      }).catch(fail => {
        this.setState({loginStatus: 2});
        setTimeout(() => {
            this.setState({loginStatus: 0})
        }, 1000);
        this.SuccessLogin();
      });
  }

  SuccessLogin() {
    if (this.state.loginStatus === 1) {
      return (
        <div>
          <div className="alert alert-success ">
            <strong>Success!</strong> Login
          </div>
        </div>
      );
    } else if (this.state.loginStatus === 2) {
      return (
        <div>
          <div className="alert alert-danger ">
            <strong>Failure!</strong> Login
          </div>
        </div>
      );
    } else {
    }
  }
}

export default Login;
