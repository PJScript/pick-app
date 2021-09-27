import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAccessToken, loginState } from '../redux/actions'

const Header = () => {
  let LoginState = useSelector(state => state.LoginState)
  let Email = useSelector(state => state.Email)
  let dispatch = useDispatch()
  let history = useHistory()
  console.log(LoginState)
  

  const logoutBtn = () => {
    if(LoginState === false){
      history.push('/login')
    }else{
      dispatch(loginState(false))
      dispatch(getAccessToken(''))
      alert('로그아웃 되었습니다')
    }
  }
  useEffect(()=>{

  },[LoginState])
  
  return (
    <nav class="navbar navbar-light bg-light">
    <div class="container-fluid" style={{display:'flex'}}>
      <div>왼쪽</div>
      <a class="navbar-brand" href="/">
        <img src={require('/home/js/Desktop/BootReviewClient/src/images/icons8-magnifying-glass-64.png').default} alt="" width="30" height="24" class="d-inline-block align-text-top"></img>
        BootView
      </a>
      <div className='topSettingBox'>
        <div className='welcomeMsg'>{LoginState? `${Email} 님 환영합니다`: ``}</div>
        <div className='loginBtn A hover' onClick={logoutBtn}>
          <div><i class="bi bi-door-open"></i>{LoginState? '로그아웃':'로그인'}</div>
        </div>
        <div className='darkMode'>
          <i class="bi bi-palette-fill"> 다크모드 </i>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header





// <div className='loginBtn'>
// <a href='#'><i class="bi bi-door-open-fill"></i>로그아웃</a>
// </div>