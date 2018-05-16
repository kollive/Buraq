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
              //  sessionStorage.setItem("roles", retObj.roles);
            }
        }
      return (JSON.parse(retVal) && !!retVal);
    } catch (e) {
        //alert(e)
      return false;
    }
  }

  /*  Can include in the reducer of each page
    export const permissions = [
     {function_id : 1, action : 'ADDEDIT'},
     {function_id : 2 ,action: 'VIEW'} ,
    {function_id : 3 , action : "DELETE"}  
  ]
  */
  function getPermissions(permissions) {
    let functions = JSON.parse(sessionStorage.getItem("roles"));
    debugger
   let flist = _.uniqBy(_.filter(functions, function(o)
   {return (_.find(permissions, {'function_id' : o.function_id} )) }
  ),'function_id');
  // flist =  _.filter(flist,{'function_id':2});
    return flist;
  }

  function checkPermission(permissions, function_id) {
    let pList = getPermissions(permissions);
     if( _.findIndex( pList , {'function_id' : function_id}) > -1 )
       return true;
    else
      return false;
  }

module.exports = { isJSON , getPermissions , checkPermission };
