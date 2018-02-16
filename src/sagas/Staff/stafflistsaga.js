import {
    all,
    actionChannel,
    call,
    put,
    take,
    takeEvery,
    takeLatest,
    select,
    cancel,
    cancelled,
    fork,
    race,
    apply
  } from "redux-saga/effects";
  import { types as staffListTypes } from "reducers/Staff/stafflistreducer";



   function getStaffListFunction(selectedStaffData)
  { 
      
        //debugger;
    //console.log(StaffData.Staff);
    //console.log(StaffData.password);

    //new Promise((resolve, reject) => {
    return fetch("http://hvs.selfip.net:3003/ExecSPM/", {
      //return fetch("http://localhost:3003/GetRoleTable/", {

      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        spName: "sps_GetStaffDetails",
        token: sessionStorage.getItem("token"),
        funcId:selectedStaffData.function_id,        
        parms: {
            "cname" : ""
        }
      })
    })
    // .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
    
  }


  //.then(data => data)
  function statusHelper(response) {
    debugger;
      
   
    return response;
  }





  function* getstaffList(selectedStaffData) {
    //debugger;
    try {
      let resultObj = yield call(getStaffListFunction,selectedStaffData.payload);
    if (isJSON(resultObj)) {
      resultObj = JSON.parse(resultObj);
      //debugger;
      if (resultObj.message != "ok") {
     // debugger;
        yield put({
          type: staffListTypes.MESSAGE,
          message: {val: resultObj.val,msg:resultObj.result}
        });
      } else {
      
       sessionStorage.setItem("token", resultObj.token);
      if(resultObj.roles.length != undefined) 
      sessionStorage.setItem("roles", JSON.stringify(JSON.parse(resultObj).roles));
        yield put({
          type: staffListTypes.ITEMS,
          items:resultObj.result
        });
      }
    }
    } catch (e) {
      //debugger;
      yield put({ type: staffListTypes.MESSAGE, message: e });
    } finally {
      //debugger;
      if (yield cancelled())
        yield put({ type: staffListTypes.MESSAGE, message: "Task Cancelled" });
    }
  }
  function deleteStaffFunction(selectedStaffData)
 {
   return fetch("http://hvs.selfip.net:3003/execSP/", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
         spName: 'spd_deleteStaff',
        token: sessionStorage.getItem("token"),
        funcId:selectedStaffData.function_id,                  
         parms:{"hv_Staff_id":selectedStaffData.hv_Staff_id}
     })
   })
     //.then(statusHelper)
     .then(response => response.json())
     .catch(error => error);
 }

 function* deleteStaff(selectedStaffData) {
   try {

     let resultObj = yield call(deleteStaffFunction,selectedStaffData.payload);
     if (isJSON(resultObj)) {
      resultObj = JSON.parse(resultObj);
      //debugger;
      if (resultObj.message != "ok") {
     // debugger;
        yield put({
          type: staffListTypes.MESSAGE,
          message: {val: resultObj.val,msg:resultObj.result}
        });
      } else {
       sessionStorage.setItem("token", resultObj.token);
      if(resultObj.roles.length != undefined) 
       sessionStorage.setItem("roles", JSON.stringify(JSON.parse(resultObj).roles));
       let state=yield select()
       debugger
       let items=[];
       items[0]=state.staffListState.items[0].filter(del=>del.hv_Staff_id!==selectedStaffData.payload.hv_Staff_id)
       items[1]=state.staffListState.items[1]
       yield put({
         type: staffListTypes.ITEMS,
         items:items
       });
       //debugger
       yield put({
         type: staffListTypes.MESSAGE,
         message: {val: 1, msg: resultObj.result[0].RESULT_MESSAGE}
       });
      }
    }
    } catch (e) {
      //debugger;
      yield put({ type: staffListTypes.MESSAGE, message: e });
    } finally {
      //debugger;
      if (yield cancelled())
        yield put({ type: staffListTypes.MESSAGE, message: "Task Cancelled" });
    }
     
 }
 function getStaffResDetailsFunction(StaffData){
   // debugger;
      var data = JSON.stringify({
        spName : "",
        parms : StaffData
      })
      // http://hvs.selfip.net:3003/ExecSP/
   return fetch("http://hvs.selfip.net:3003/ExecSPM/", {
    // return fetch("http://localhost:3003/ExecSPM/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          spName : 'sps_GetStaffResourceData',
          token: sessionStorage.getItem("token"),
          funcId : StaffData.function_Id,
          parms : StaffData
      })
    })
     // .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }
 function* getStaffResDetails(StaffData){
    try {
          
     
      let resultObj = yield call(getStaffResDetailsFunction,StaffData.payload);
     // debugger
        //  alert('he me2 ' +resultObj)
     
      if (isJSON(resultObj)) {
        resultObj = JSON.parse(resultObj);
        if (resultObj.message != "ok") {
          //debugger;
          yield put({
            type: staffListTypes.MESSAGE,
            message: { val: resultObj.val, statusMsg: resultObj.result }
          });
        } else {
          //debugger
          sessionStorage.setItem("token", resultObj.token);
          if(resultObj.roles.length != undefined) {
            sessionStorage.setItem("roles", JSON.stringify(resultObj.roles));
          }       
           
           yield put({
              type: staffListTypes.RESOURCEITEMS,
              resitems: resultObj.result
        });
      }
    }
    } catch (e) {
      
      yield put({ type: staffListTypes.MESSAGE, message: e });
    } finally {
      
      if (yield cancelled())
        yield put({ type: staffListTypes.MESSAGE, message: "Task Cancelled" });
    }
  }
  export function* handleRequest(action) {
    //debugger;
    console.log("staffList Saga request", action);
    try {
      switch (action.type) {
        case staffListTypes.FETCH_REQUEST: {
          const fetchTask = yield fork(getstaffList,action.payload);
          break;
        }
        case staffListTypes.DELETE_REQUEST: {
          //debugger;
          const fetchTask = yield fork(deleteStaff,action.payload);
          break;
        }
           case staffListTypes.FETCH_STAFF_RESOURCE_DETAILS: {
          
          const fetchTask = yield call(getStaffResDetails,action.payload);
          break;
        } 
        default: {
          return null;
          break;
        }
      }
    } catch (e) {
      yield put({ type: staffListTypes.MESSAGE, error: e });
    }
  }

  function isJSON(str) {
    try {
      debugger
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }
