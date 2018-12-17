import axios from 'axios'
export const DrinkService = {
    allDrinks : function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/drinkName/getAllDrinksNames",{headers: headers});
    },
    AddDrink : function (drink){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/drinkName/add",drink,{headers: headers});
    },
    DeleteDrink : function (id){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/drinkName/delete",id,{headers: headers});
    },    
    EditDrink : function (drink){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/drinkName/update",drink,{headers: headers});
    },    
}