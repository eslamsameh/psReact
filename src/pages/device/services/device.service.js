import axios from 'axios'
export const DeviceService = {
    allDevices : function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/device/getAllDevices",{headers: headers});
    },
    AddDevice : function (device){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/device/insert",device,{headers: headers});
    },
    DeleteDevice : function (id){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/device/delete",id,{headers: headers});
    },    
    EditDevice : function (device){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/device/Update",device,{headers: headers});
    }, 
    GetNonActiveDevice : function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/device/getActiveDevice",{headers: headers});
    },    
   
}