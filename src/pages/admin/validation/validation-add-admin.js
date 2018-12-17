export const AddNewAdminValidation = {
  ValidationAddAdmin: function(user) {
    if (user.adminName) {
        return (user.adminName.length < 5) ? "the Admin Name Is Too Short" : ""
      
    } else if (user.password) {
        return (user.password.length < 6) ? "password Less Than 6 charcter" : ""

    } else if (user.email) {
       const emailValid = user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        return !emailValid ? "The Email Not Like the example@example.com" : ""
        
    } else {
        var key = Object.keys(user)[0];
        if (user[key]=== "" ) {
          return ` ${key} Is Required Felid`;
        }else {
            return ""
        }
      }
    
  }
};
