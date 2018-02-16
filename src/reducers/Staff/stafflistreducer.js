export const types = {
    FETCH_REQUEST: "STAFFLIST/FETCH_REQUEST",
    DELETE_REQUEST: "STAFFLIST/DELETE_REQUEST",
    ITEMS: "STAFFLIST/ITEMS",
    RESOURCEITEMS: "STAFFLIST/RESOURCEITEMS",
    MESSAGE: "STAFFLIST/MESSAGE",
    TOKEN: "STAFFLIST/TOKEN",
    FETCH_STAFF_RESOURCE_DETAILS : "STAFF/FETCH_STAFF_RESOURCE_DETAILS",
  };

export let permissions = [  
    { function_id: "65", function_name: 'ADDEDIT' },
    { function_id: "66", function_name: 'DELETE' },
     { function_id:"67", function_name: 'VIEW' }
   ]
  //};
  // Reducer
  const initialState = {
    items: [],
    loading: false,
    error: false,
    message: {val:0,msg:""},
    resitems:[]
  };
  export default  (state = initialState, action) => {
    switch (action.type) {
        case types.ITEMS:
          return { ...state, items: action.items };
          case types.MESSAGE:
            return { ...state, message: action.message };
           case types.RESOURCEITEMS:
          return { ...state, resitems: action.resitems };
            
      default:
        return state;
    }
  };

  // Action Creators
  export const actions = {
    getStaffList: (payload) => ({ type: types.FETCH_REQUEST, payload}),
    deleteStaff: (payload) => ({ type: types.DELETE_REQUEST, payload}),
    getStaffResDetails : (payload)  => ({type:types.FETCH_STAFF_RESOURCE_DETAILS,payload}),

    resetMessage: (message) => ({
        type: message.type,
        message : message.message
      })
  };
