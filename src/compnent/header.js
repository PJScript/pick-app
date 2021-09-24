import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  let LoginState = useSelector(state => state.LoginState)
  console.log(LoginState)
  const loginState = () => {
    localStorage.log = '로그아웃'
    if(localStorage.log = '로그아웃'){
      localStorage.log = '로그인'
    }
  }

  const logoutBtn = () => {
    alert('로그아웃 되었습니다')
  }
  
  return (
    <nav class="navbar navbar-light bg-light">
    <div class="container-fluid" style={{display:'flex'}}>
      <div>왼쪽</div>
      <a class="navbar-brand" href="/">
        <img src={require('/home/js/Desktop/BootReviewClient/src/images/icons8-magnifying-glass-64.png').default} alt="" width="30" height="24" class="d-inline-block align-text-top"></img>
        BootView
      </a>
      <div className='topSettingBox'>
        <div className='loginBtn A hover' onClick={loginState}>
          <a href='/login'><i class="bi bi-door-open"></i>로그인</a>
        </div>
        <div className='loginBtn A hover' onClick={loginState} onClick={logoutBtn}>
          <div><i class="bi bi-door-open-fill" ></i>로그아웃</div>
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