import { GET_ACCESSTOKEN, CHECK_LOGIN,MINER_NUMBER,ADD_NUMBER, GET_NAME, GET_EMAIL } from "./actions";
import { initState } from "./initStates";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



const authReducer = (state = initState, action) => {
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
    case ADD_NUMBER:
      return {
        ...state,
        Number:state.Number + 1
      }
    case MINER_NUMBER:
      return {
        ...state,
        Number:state.Number - 1
      }
    case GET_EMAIL:
    return{
      ...state,
      Email:action.payload.Email
    }
    default:
      return {...state}
  }
}

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // blacklist -> 그것만 제외합니다
};



export default persistReducer(persistConfig, authReducer);
