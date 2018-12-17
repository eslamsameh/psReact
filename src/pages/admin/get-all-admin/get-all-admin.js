import React, { Component } from "react";
import "./get-all-admin.sass";
import { GetAdmin } from "../service/all-admin.service";
class GetAllAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Admins: []
    };
  }

  render() {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <div className="container">
          <h4>All Admins</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: "1%" }}>Action</th>
                <th>Admin Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Admins.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="edit-remove">
                        <div>
                          <i
                            className="fa fa-trash"
                            onClick={() => this.onPressDeleteIcon(v._id, i)}
                          />
                        </div>
                        <div>
                          <i
                            className="fa fa-pencil"
                            onClick={() => this.onPressEditIcon(v._id)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="td-names">{v.name}</td>
                    <td className="td-names">{v.role}</td>
                    <td className="td-names">{v.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div><h2>You Not Have Permission To Access This Page</h2></div>
      );
    }
  }
  onPressDeleteIcon(id, i) {
      GetAdmin.DeleteAdmin({id: id}).then((res)=>{
        var arrayOfAdminsBeforSplice = [...this.state.Admins];
        arrayOfAdminsBeforSplice.splice(i, 1);
        this.setState({Admins: arrayOfAdminsBeforSplice})
      })
  }
  onPressEditIcon(id) {
      // this.props.history('/')
      // this.props.history.push("/edit-admin",id)
      this.props.history.push(`/edit-admin/${id}`)
  }

  componentDidMount() {
    GetAdmin.GetAllAdmins().then(Res => {
      this.setState({ Admins: Res.data.admins });
    });
  }
}

export default GetAllAdmin;
