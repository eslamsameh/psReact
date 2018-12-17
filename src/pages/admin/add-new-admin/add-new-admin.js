import React, { Component } from "react";
import "./add-new-admin.sass";
import { AddNewAdminService } from "../service/admin.service";
import { AddNewAdminValidation } from "../validation/validation-add-admin";

class AddNewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: "",
      adminNameError: null,
      age: "",
      ageError: null,
      phone: "",
      phoneError: null,
      address: "",
      addressError:null,
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      role: null,
      roleError: "",
      AdminInsertationStatus: 0,
      SubmitDisablerd: true
    };
  }

  render() {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="container">
              <div className="add-admin">
                <h4>Add Admin Page</h4>

                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Admin Name</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Admin Name..."
                            className="form-control"
                            value={this.state.adminName}
                            onChange={value =>
                              this.onChangeInput(
                                "adminName",
                                "adminNameError",
                                value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">
                            {this.state.adminNameError}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Age</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="number"
                            placeholder="Age..."
                            className="form-control"
                            value={this.state.age}
                            onChange={value =>
                              this.onChangeInput("age", "ageError", value)
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">{this.state.ageError}</p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Phone</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="number"
                            placeholder="Phone..."
                            className="form-control"
                            value={this.state.phone}
                            onChange={value =>
                              this.onChangeInput("phone", "phoneError", value)
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">
                            {this.state.phoneError}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Address</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Address..."
                            className="form-control"
                            value={this.state.address}
                            onChange={value =>
                              this.onChangeInput(
                                "address",
                                "addressError",
                                value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">
                            {this.state.addressError}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Email</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Email..."
                            className="form-control"
                            value={this.state.email}
                            onChange={value =>
                              this.onChangeInput("email", "emailError", value)
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">
                            {this.state.emailError}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <label>Password</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Password..."
                            className="form-control"
                            value={this.state.password}
                            onChange={value =>
                              this.onChangeInput(
                                "password",
                                "passwordError",
                                value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">
                            {this.state.passwordError}
                          </p>{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-2">
                        <label>Select Role</label>
                      </div>
                      <div className="col-sm-10">
                        <div className="input-group">
                          <select
                            className="form-control"
                            onChange={(value, key) =>
                              this.onChangeInput("role", "roleError", value)
                            }
                          >
                            <option selected={true} disabled hidden>
                              Select Role
                            </option>
                            <option>Admin</option>
                            <option>Entry Data</option>
                          </select>
                        </div>
                        <div>
                          {" "}
                          <p className="P-Error">{this.state.roleError}</p>{" "}
                        </div>
                      </div>
                    </div>
                    <div>{this.SuccessOfFail()}</div>

                    <div className="btn-sumbit">
                      <button
                        className="btn btn-info"
                        disabled={this.state.SubmitDisablerd}
                        onClick={this.onPressSubmit.bind(this)}
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div><h2>You Not Have Permission To Access This Page</h2></div>
      );
    }
  }

  onChangeInput(key, error, value) {
    let Inputvalue = value.target.value;
    this.setState({ [key]: value.target.value }, () => {
      const errorFounded = AddNewAdminValidation.ValidationAddAdmin({[key]: Inputvalue});
      this.setState({ [error]: errorFounded }, () => {
        this.checkErros();
      });
    });
  }

  // function to check errors in form

  checkErros = () => {
    const {
      addressError,
      phoneError,
      emailError,
      adminNameError,
      ageError,
      passwordError,
    } = this.state;

    if (
      addressError !== "" ||
      phoneError !== "" ||
      emailError !== "" ||
      passwordError !== "" ||
      adminNameError !== "" ||
      ageError !== ""
    ) {
      this.setState({ SubmitDisablerd: true });
    } else {
      this.setState({ SubmitDisablerd: false });
    }
  };

  onPressSubmit() {
    let data = {
      name: this.state.adminName,
      age: this.state.age,
      role: this.state.role,
      password: this.state.password,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email
    };
    AddNewAdminService.addAdmin(data)
      .then(Res => {
        if (Res.data.status === "sucess") {
          this.setState({ AdminInsertationStatus: 1 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ AdminInsertationStatus: 0 });
            this.props.history.push('/all-admins')
          }, 2000);
        } else {
          this.setState({ AdminInsertationStatus: 2 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ AdminInsertationStatus: 0 });
          }, 2000);
        }
      })
      .catch(fail => {
        this.setState({ AdminInsertationStatus: 1 });
        this.SuccessOfFail();
        setTimeout(() => {
          this.setState({ AdminInsertationStatus: 0 });
        }, 2000);
      });
  }
  SuccessOfFail() {
    if (this.state.AdminInsertationStatus === 1) {
      return (
        <div>
          <div class="alert alert-success ">
            <strong>Success!</strong> add Admin Success
          </div>
        </div>
      );
    } else if (this.state.AdminInsertationStatus === 2) {
      return (
        <div>
          <div class="alert alert-danger ">
            <strong>Failure!</strong> add Admin Success
          </div>
        </div>
      );
    }
  }
}

export default AddNewAdmin;
