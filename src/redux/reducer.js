import { GET_ACCESSTOKEN, CHECK_LOGIN } from "./actions";
import { initState } from "./initStates";
import { combineReducers } from "redux";

export let authReducer = (state = initState, action) => {
  switch(action.type){
    case GET_ACCESSTOKEN:
      return { 
        ...state,
        AccessToken:action.payload.AccessToken
      }
    case CHECK_LOGIN:
      return {
        ...state,
        LoginState:action.payload.LoginState
      }
    default:
      return{
        ...state
      }
  }
}

const rootReducer = combineReducers({ authReducer });

export default rootReducer