import axios from 'axios'
export const GameService = {
    allGames : function (){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.get("http://localhost:8000/game/getAllGames",{headers: headers});
    },
    AddGame : function (game){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/game/insert",game,{headers: headers});
    },
    DeleteGame : function (id){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/game/delete",id,{headers: headers});
    },    
    EditGame : function (game){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        }
      return  axios.post("http://localhost:8000/game/update",game,{headers: headers});
    },    
}