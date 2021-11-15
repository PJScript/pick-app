import { GET_ACCESSTOKEN, CHECK_LOGIN,MINER_NUMBER,ADD_NUMBER, CONNECT_SOCKET, GET_EMAIL, GET_REVIEW, RESET_REVIEW, GET_TARGET, IS_LOADING, GET_MYPAGE_REVIEW, SET_PAGE_COUNT, GET_CHAT_MESSAGE, RESET_CHAT_MESSAGE } from "./actions";
import { initState, reviewState, chatState } from "./initStates";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'



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
    case GET_MYPAGE_REVIEW:
      return{
        ...state,
        MyReviews:[...action.payload]
      }
    default:
      return state
  }
}

const reviewReducer = (state = [], action) => {
  switch(action.type){
    case GET_REVIEW:
      return {
        ...state,
        Reviews:action.payload
      } 


    case RESET_REVIEW:
      return {
        ...state,
        Reviews: []
      }
    
    case GET_TARGET:
      return {
        ...state,
        Target:action.payload
      }

    case SET_PAGE_COUNT:
      return{
        ...state,
        PageCnt:action.payload
      }
    
    default:
    return state
  }
}

const chatReducer = (state = chatState, action) => {
  switch(action.type){
    case GET_CHAT_MESSAGE:
      return {
        ...state,
        ChatQueue:[...state.ChatQueue, action.payload]
      }
    case RESET_CHAT_MESSAGE:
      return {
        ...state,
        ChatQueue:[{id:'system',innerText:'welcome !'}]
      }
    case CONNECT_SOCKET:
      return {
        ...state,
        CurrentSocket:action.payload
      }

      default:
        return state
  }
}

const loadingReducer = (state = true, action) => {
  switch(action.type){
    case IS_LOADING:
      return action.payload

    default:
      return state
  }
}



const rootReducer = combineReducers({
  authReducer,
  reviewReducer,
  loadingReducer,
  chatReducer
})

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage: storageSession,
  blacklist:[reviewReducer]
  // blacklist -> 그것만 제외합니다
};

export default persistReducer(persistConfig, rootReducer);
