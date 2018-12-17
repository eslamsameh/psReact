import React, { Component } from "react";
import "./edit-admin.sass";
import { EditAdminService } from "../service/edit-admin.service";

class EditAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: "",
      age: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      role: "",
      AdminUpdateStatus: 0
    };
  }

  render() {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="container">
              <div className="add-admin">
                <h4>Edit Admin Page</h4>

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
                            onChange={value => {
                              this.onChangeInput(value, "adminName");
                            }}
                          />
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
                            onChange={value => {
                              this.onChangeInput(value, "age");
                            }}
                          />
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
                            onChange={value => {
                              this.onChangeInput(value, "phone");
                            }}
                          />
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
                            onChange={value => {
                              this.onChangeInput(value, "address");
                            }}
                          />
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
                            onChange={value => {
                              this.onChangeInput(value, "email");
                            }}
                          />
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
                            onChange={value => {
                              this.onChangeInput(value, "password");
                            }}
                          />
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
                            value={this.state.role}
                            onChange={value => {
                              this.onChangeInput(value, "role");
                            }}
                          >
                            <option>Admin</option>
                            <option>Entry Data</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>{this.SuccessOfFail()}</div>
                    <div className="btn-sumbit">
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          this.onPressSubmit();
                        }}
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

  componentDidMount() {
    const adminId = this.props.match.params.id;
    const admin = { adminId: adminId };
    EditAdminService.GetAdmin(admin).then(Res => {
      if (Res.data.status === "success") {
        const data = Res.data.admin;
        this.setState({
          adminName: data.name,
          age: data.age,
          password: data.password,
          email: data.email,
          phone: data.phone,
          role: data.role,
          address: data.address
        });
      } else {
        this.setState({ AdminUpdateStatus: 1 });
        this.SuccessOfFail();
        setTimeout(() => {
          this.setState({ AdminUpdateStatus: 0 });
          this.props.history.push("/all-admins");
        }, 2000);
      }
    });
  }
  onChangeInput(value, key) {
    this.setState({ [key]: value.target.value });
  }
  onPressSubmit() {
    const { adminName, age, password, email, phone, role, address } = this.state;
    const {id}=this.props.match.params;
    const data = {
      id,
      name:adminName,
      age,
      password,
      email,
      phone,
      role,
      address
    };
    EditAdminService.UpdateAdmin(data)
      .then(res => {
        if (res.data.status === "success") {
          this.setState({ AdminUpdateStatus: 1 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ AdminUpdateStatus: 0 });
            this.props.history.push("/all-admins");
          }, 2000);
        } else {
          this.setState({ AdminUpdateStatus: 2 });
          this.SuccessOfFail();
          setTimeout(() => {
            this.setState({ AdminUpdateStatus: 0 });
            this.props.history.push("/all-admins");
          }, 2000);
        }
      })
      .catch(fail => {
        this.setState({ AdminUpdateStatus: 2 });
        this.SuccessOfFail();
        setTimeout(() => {
          this.setState({ AdminUpdateStatus: 0 });
          this.props.history.push("/all-admins");
        }, 2000);
      });
  }
  SuccessOfFail() {
    if (this.state.AdminUpdateStatus === 1) {
      return (
        <div>
          <div class="alert alert-success ">
            <strong>Success!</strong> Edit Admin Success
          </div>
        </div>
      );
    } else if (this.state.AdminUpdateStatus === 2) {
      return (
        <div>
          <div class="alert alert-danger ">
            <strong>Failure!</strong> Edit Admin Success
          </div>
        </div>
      );
    }
  }
}

export default EditAdmin;
