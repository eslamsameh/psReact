import axios from 'axios'
export const EditAdminService = {
    GetAdmin : function (user){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/admin/GetSingleAdmin",user,{headers: headers});
    },
    UpdateAdmin : function (user){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/admin/Update",user,{headers: headers});
    },
    viewMyProfile:function(user){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/profile/me",user,{headers: headers});
    },
    UploadPhoto:function(user){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/profile/add",user,{headers: headers});
    }
}