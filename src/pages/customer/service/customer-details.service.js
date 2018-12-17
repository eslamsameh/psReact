import axios from 'axios'
export const customerDetailService={
    getCustomerPayment:(id)=>{
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/payment/CustomerPayment",id,{headers: headers});
    },
    
}