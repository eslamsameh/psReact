import axios from "axios";
export const EditPaymentService = {
  getPayment: id => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/payment/findPayment", id, {
      headers: headers
    });
  },
  changePaymentCustomer: payment => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/payment/changeCustomer", payment, {
      headers: headers
    });
  },
  getCurrentPaymentDrinks: (id)=>{
    var headers = {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("accessToken")
      };
      return axios.post("http://localhost:8000/drink/singlePaymentDrink", id, {
        headers: headers
      });
  },
  saveDrink:(drink)=>{
    var headers = {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("accessToken")
      };
      return axios.post("http://localhost:8000/drink/insert", drink, {
        headers: headers
      });
  },
  deletDrink:(id)=>{
    var headers = {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("accessToken")
      };
      return axios.post("http://localhost:8000/drink/delete", id, {
        headers: headers
      });
  },
  getRemaningForCustomer:(customerId)=>{
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/payment/getRemaningOnCustomer", customerId, {
      headers: headers
    });
  },
  FinishTime:(payment)=>{
    var headers = {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("accessToken")
    };
    return axios.post("http://localhost:8000/payment/editPayment", payment, {
      headers: headers
    });
  }
};
