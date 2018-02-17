export const types = {
    INSERT_REQUEST: "STAFF/INSERT_REQUEST",
    FETCH_STAFF_REQUEST : "STAFF/FETCH_STAFF_REQUEST",
    UPDATE_STAFF_REQUEST : "STAFF/UPDATE_STAFF_REQUEST",
    ITEMS : "STAFF/ITEMS",
    STAFFITEMS : "STAFF/STAFFITEMS",
    MESSAGE : "STAFF/MESSAGE",
    FETCH_STAFF_RESOURCE_DETAILS : "STAFF/FETCH_STAFF_RESOURCE_DETAILS",

  };

  export const permissions = [
     {function_id : 65, action : 'ADDEDIT'},
    {function_id :  66, action : "DELETE"}  ,     
     {function_id : 67 ,action: 'VIEW'} ,
  ]
  export const initialState = {
    error: null,
    message: { val: 0, statusMsg: "" },
    STAFF : {},
    items:[],
    staffrow:[]
  };

  export default (state = initialState, action) => {
    //debugger;
    switch (action.type) { 
      case types.MESSAGE:  
        return { ...state, message: action.message };
      case types.ITEMS:
        return { ...state, items: action.items };
         case types.STAFFITEMS:
        return { ...state, staffrow: action.staffrow };
      default:
        return state;
    }
  };

  export const actions = {
    insertStaffDetails: (payload) => ({ type: types.INSERT_REQUEST, payload }),
    getStaffDetails: (payload) => ({ type: types.FETCH_STAFF_REQUEST, payload }),
    updateStaffDetails : (payload)  => ({type:types.UPDATE_STAFF_REQUEST,payload}),
    getStaffResDetails : (payload)  => ({type:types.FETCH_STAFF_RESOURCE_DETAILS,payload}),

    resetMessage: (message) => ({
        type: message.type,
        message : message.message
      }),
      clearItemsState: (message) => ({
        type: message.type,
        items : message.items
      }),
      clearStaffItemsState: (message) => ({
        type: message.type,
        staffrow : message.staffrow
      }),
  };