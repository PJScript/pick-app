export const GET_ACCESSTOKEN = 'GET_ACCESSTOKEN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const ADD_NUMBER = 'ADD_NUMBER'
export const MINER_NUMBER = 'MINDER_NUMBER'
export const GET_EMAIL = 'GET_EMAIL'

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