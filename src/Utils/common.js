const _ = require("lodash");

function isJSON(retVal) {
    //alert(sessionStorage.getItem("token"))
    
    try {
        //console.log("5555555")
        //console.log(this.props)
        //this.props.showTimeOut();
        //alert(555)
        //return false;
        if(JSON.parse(retVal) && !!retVal) {
            const retObj = JSON.parse(retVal);
            if(retObj.token){
                sessionStorage.setItem("token", retObj.token);
            }
            if(retObj.roles){
                sessionStorage.setItem("roles", JSON.stringify(retObj.roles));
            }
        }
      return (JSON.parse(retVal) && !!retVal);
    } catch (e) {    
        //alert(e)    
      return false;
    }
  } 

module.exports = { isJSON };