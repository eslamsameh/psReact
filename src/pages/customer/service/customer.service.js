import axios from "axios";
export const customerService = {
  getAllCustomer: () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.get("http://localhost:8000/customer/getAllCustomer", {
      headers: headers
    });
  },
  AddCustomer: customer => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/customer/insert", customer, {
      headers: headers
    });
  },
  DeleteCustomer: id => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/customer/delete", id, {
      headers: headers
    });
  },
  EditCustomer: customer => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/customer/update", customer, {
      headers: headers
    });
  },
  SearchByCustomerName: customer => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post(
      "http://localhost:8000/customer/searchByCustomer",
      customer,
      { headers: headers }
    );
  }
};
