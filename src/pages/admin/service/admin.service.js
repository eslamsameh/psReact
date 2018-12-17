import axios from 'axios'
export const AddNewAdminService = {
    addAdmin : function (user){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/admin/insert",user,{headers: headers});
    }
}