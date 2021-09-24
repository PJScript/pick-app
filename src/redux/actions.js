export const GET_ACCESSTOKEN = 'GET_ACCESSTOKEN'
export const CHECK_LOGIN = 'CHECK_LOGIN'

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