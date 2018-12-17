import React, { Component } from "react";
import "./view-profile.sass";
import { EditAdminService } from "../service/edit-admin.service";
class ViewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: "",
      age: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      AdminUpdateStatus: 0,
      profile: "",
      uploadPhotoAccept: false,
      formAppend: {},
      theImageBeforeUpload: ""
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="container">
            <div className="add-admin">
              <h4> Admin Info</h4>

              <div className="card">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="div-img-profile">
                      <img src={this.state.profile} alt="" />

                      {this.state.uploadPhotoAccept === false ? (
                        <input
                          type="button"
                          className="btn btn-dark"
                          id="loadFileXml"
                          value="Upload Photo"
                          onClick={() => {
                            document.getElementById("file").click();
                          }}
                        />
                      ) : (
                        <div className="input-group-upload-photo">
                          <button
                            className="btn btn-info"
                            onClick={this.uploadPhotoToServer.bind(this)}
                          >
                            <i className="fa fa-check" />
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={this.cancelPhotoToServer.bind(this)}
                          >
                            <i className="fa fa-close" />
                          </button>
                        </div>
                      )}

                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                        name="file"
                        onChange={file => {
                          this.uploadPhoto(file);
                        }}
                      />
                    </div>
                  </div>
                </div>
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
                            this.OnChangeInput(value, "adminName");
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
                            this.OnChangeInput(value, "age");
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
                            this.OnChangeInput(value, "phone");
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
                            this.OnChangeInput(value, "address");
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
                            this.OnChangeInput(value, "email");
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
                          type="password"
                          placeholder="Password..."
                          className="form-control"
                          value={this.state.password}
                          onChange={value => {
                            this.OnChangeInput(value, "password");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>{this.SuccessOfFail()}</div>
                  <div className="btn-sumbit">
                    <button
                      className="btn btn-info"
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
  }
  componentDidMount() {
    let adminId = sessionStorage.getItem("adminId");
    EditAdminService.viewMyProfile({ adminId: adminId }).then(Res => {
      console.log(Res);

      if (Res.data.admin.img) {
        var bytes = new Uint8Array(Res.data.admin.img.data.data);
        var blob = new Blob([bytes.buffer]);
        const reader = new FileReader();
        reader.onload = e => {
          this.setState({ profile: e.target.result });
        };
        reader.readAsDataURL(blob);
        this.setState({
          adminName: Res.data.admin.admin.name,
          age: Res.data.admin.admin.age,
          address: Res.data.admin.admin.address,
          email: Res.data.admin.admin.email,
          password: Res.data.admin.admin.password,
          phone: Res.data.admin.admin.phone
        });
      } else {
        this.setState({
          profile:
            "https://conceptdraw.com/a459c4/p8/preview/640/pict--young-man-ivr-people-vector-stencils-library"
        });
        this.setState({
          adminName: Res.data.admin.name,
          age: Res.data.admin.age,
          address: Res.data.admin.address,
          email: Res.data.admin.email,
          password: Res.data.admin.password,
          phone: Res.data.admin.phone
        });
      }
    });
  }
  uploadPhoto(file) {
    this.setState({ theImageBeforeUpload: this.state.profile });
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ profile: e.target.result });
    };
    reader.readAsDataURL(file.target.files[0]);

    const files = file.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let file of files) {
        formData.append("userPhoto", file, file.name);
      }

      formData.append("admin", sessionStorage.getItem("adminId"));
      this.setState({ uploadPhotoAccept: true, formAppend: formData });
    }
  }

  uploadPhotoToServer() {
    EditAdminService.UploadPhoto(this.state.formAppend).then(Res => {
      console.log(Res);
      this.setState({ uploadPhotoAccept: false });
    });
  }
  cancelPhotoToServer() {
    this.setState({ profile: this.state.theImageBeforeUpload });
    this.setState({ uploadPhotoAccept: false });
  }
  OnChangeInput(value, key) {
    this.setState({ [key]: value.target.value });
  }
  onPressSubmit() {
    const { adminName, age, password, email, phone, address } = this.state;
    const  id  = sessionStorage.getItem("adminId");
    const role = sessionStorage.getItem("role");
    let data = {name: adminName,id,age,password,email,phone,address,role };
    EditAdminService.UpdateAdmin(data).then(Res => {
      if (Res.data.status === "success") {
        this.setState({ AdminUpdateStatus: 1 });
        this.SuccessOfFail();
        setTimeout(() => {
          this.setState({ AdminUpdateStatus: 0 });
        }, 2000);
      } else {
        this.setState({ AdminUpdateStatus: 2 });
        this.SuccessOfFail();
        setTimeout(() => {
          this.setState({ AdminUpdateStatus: 0 });
        }, 2000);
      }
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

export default ViewAdmin;
