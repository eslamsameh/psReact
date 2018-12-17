import axios from 'axios'
export const LoginServiceFunctions = {
    Login : function (user){
      return  axios.post("http://localhost:8000/admin/login",user);
    }
}