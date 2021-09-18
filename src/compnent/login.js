import React from 'react'
import { useState } from 'react'

const Login = () => {
  let [id,setId] = useState('')
  let [pw,setPw] = useState('')
  
  const idSave = (e) => {
    console.log(e)
  }
  const pwSave = (e) => {

  }
  return (
    <div className="LoginWrapper">
    <div></div>
    <div className='Login-Box'>
      <form>
        <input></input>
        <input></input>
      </form>
      <div className='LoginSubmitBtn'>
        <div className='LoginSubmitBtn-left'></div>
        <div className='LoginSubmitBtn-center'>
          <a className='hover'>로그인</a>
        </div>
        <div className='LoginSubmitBtn-right'></div>
      </div>
      <div className='signupBox'>
        <a className='signupItem hover'>회원 가입</a>
        <a className='signupItem hover'>google</a>
        <a className='signupItem hover'>kakao</a>
        <a className='signupItem hover'>github</a>
      </div>
      <div>
        <a className='hover'>아이디/비번 찾기</a>
      </div>
    </div>
    <div></div>
  </div>
  )
}

export default Login