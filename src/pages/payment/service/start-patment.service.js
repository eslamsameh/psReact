import axios from 'axios'
export const StartPaymentService = {
    
    StartTime: function (payment){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/payment/openTime",payment,{headers: headers});
    },
   
    
}