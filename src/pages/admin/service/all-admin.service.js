import axios from 'axios';
export const GetAdmin = {
    GetAllAdmins: function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/admin/getAllUsers", {headers: headers});
    },

    DeleteAdmin: function (id){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/admin/delete", id, {headers: headers});
    }
    

}