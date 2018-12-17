import axios from 'axios'
export const CurrentPaymentService = {
    
    getCurrentPayments: function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/payment/currentPayment",{headers: headers});
    },
    deleteCurrentPayment:()=>{
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/payment/currentPayment",{headers: headers});
    }
   
    
}