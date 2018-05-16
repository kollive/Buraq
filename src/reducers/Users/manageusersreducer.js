export const types = {
    INSERT_REQUEST: "USER/INSERT_REQUEST",
    FETCH_USER_REQUEST : "USER/FETCH_USER_REQUEST",
    UPDATE_USER_REQUEST : "USER/UPDATE_USER_REQUEST",
    ITEMS: "USER/ITEMS",
    MESSAGE: "USER/MESSAGE"
  };

  export const permissions = [
     {function_id : 1, action : 'ADDEDIT'},
     {function_id : 2 ,action: 'VIEW'} ,
    {function_id : 3 , action : "DELETE"}  
  ]
  export const initialState = {
    error: null,
    message: { val: 0, statusMsg: "" },
    user : {},
    items:[]
  };

  export default (state = initialState, action) => {
    // debugger;
    switch (action.type) { 
      case types.MESSAGE:  
        return { ...state, message: action.message };
      case types.ITEMS:
        return { ...state, items: action.items };
      default:
        return state;
    }
  };

  export const actions = {
    insertUserDetails: user => ({ type: types.INSERT_REQUEST, user }),
    getUserDetails: user => ({ type: types.FETCH_USER_REQUEST, user }),
    updateUserDetails : user => ({type:types.UPDATE_USER_REQUEST,user}),
    resetMessage: (message) => ({
        type: message.type,
        message : message.message
      }),
      clearItemsState: (message) => ({
        type: message.type,
        items : message.items
      }),
  };