import axios from 'axios';
export const PriceHourService={
    getHourPrice:()=>{
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return axios.get("http://localhost:8000/playHour/getPlayHour",{headers: headers})
    },
    UpdatePlayHour:(data)=>{
        var headers={
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
        return axios.post('http://localhost:8000/playHour/update', data, {headers: headers})
    }
}