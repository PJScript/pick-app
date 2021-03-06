export const GET_ACCESSTOKEN = 'GET_ACCESSTOKEN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const ADD_NUMBER = 'ADD_NUMBER'
export const MINER_NUMBER = 'MINDER_NUMBER'
export const GET_EMAIL = 'GET_EMAIL'
export const GET_REVIEW = 'GET_REVIEW'
export const RESET_REVIEW = 'RESET_REVIEW'
export const GET_TARGET = 'GET_TARGET'
export const IS_LOADING = 'IS_LOADING'
export const GET_NAME = 'GET_NAME'
export const GET_MYPAGE_REVIEW = 'GET_MYPAGE_REVIEW'
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT'
export const GET_CHAT_MESSAGE = 'GET_CHAT_MESSAGE'
export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const RESET_CHAT_MESSAGE = 'RESET_CHAT_MESSAGE'

export const getAccessToken = (AccessToken) => {
  return {
    type:GET_ACCESSTOKEN,
    payload:{
      AccessToken:AccessToken
    }
  }
}

export const loginState = (LoginState) => {
  return {
    type:CHECK_LOGIN,
    payload:{
      LoginState:LoginState
    }
  }
}

export const getName = (Email) => {
  return {
    type:GET_EMAIL,
    payload:{
      Email:Email
    }
  }
}

export const getTarget = (Target) => {
  return {
    type:GET_TARGET,
    payload:Target
  }
}

export const getFirstReview = (review) => {
  return {
    type:GET_REVIEW,
    payload:review
  }
}

export const isLoading = (trueOrfalse) => {
  return {
    type:IS_LOADING,
    payload:trueOrfalse
  }
}

export const resetReview = () => {
  return {
    type:RESET_REVIEW
  }
}

export const getMypageReview = (MyReviews) => {
  return {
    type:GET_MYPAGE_REVIEW,
    payload:MyReviews
  }
}

export const setPageCount = (pageCnt) => {
  return {
    type:SET_PAGE_COUNT,
    payload:pageCnt
  }
}
export const addNumber = () => {
  return {
    type:ADD_NUMBER
  }
}

export const minerNumber = () => {
  return {
    type:MINER_NUMBER
  }
}

export const getChatMessage = (chats) => {
  return {
    type:GET_CHAT_MESSAGE,
    payload:chats
  }
}

export const resetChatMessage = () => {
  return {
    type:RESET_CHAT_MESSAGE
  }
}

export const connectSocket = (socket) => {
  return {
    type:CONNECT_SOCKET,
    payload:socket
  }
}