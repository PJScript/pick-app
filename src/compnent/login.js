import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import SignUpModal from '../compnent/signUpModal'
import { useSelector, useDispatch } from 'react-redux';
import {getAccessToken, loginState} from '../redux/actions'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import NavMenu from './navMenu';

const Login = () => {
  let history = useHistory()
  const test2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일이 적합한지 검사할 유효성검사식
  let dispatch = useDispatch()
  let token  = useSelector(state => state.AccessToken)
  let login = useSelector(state => state.LoginState)

  let [id,setId] = useState('')
  let [pw,setPw] = useState('')
  let [email, setEmailValid] = useState('')



  const idSave = (e) => {
    setId(e.target.value)
  }

  const pwSave = (e) => {
    setPw(e.target.value)
  }

  const signUp = (e) => {
    
  }

  const loginSubmit = async () => {
    await axios.post('http://localhost:4000/auth/login',{account:id,pw:pw},{withcredential:true},).then((data)=>{
      console.log(data)
      dispatch(getAccessToken(data.headers.authorization))
      localStorage.log = '로그아웃'
      history.push('/')
      console.log(data)
    }).catch((err)=>{
      Swal.fire({
        icon: 'warning',
        title: '아이디 혹은 비밀번호 오류',
        text: '아이디 혹은 비밀번호가 올바르지 않습니다. 다시한번 확인해주세요'
      })
    })
  }

  const emailValidate = (e) => {
    setEmailValid(e.target.value)
    if(test2.test(e.target.value)){
      console.log('good')
    }
  }
  const warning = () => {
    alert('준비중 입니다')
  }

  return (
    <>
    <div className="LoginWrapper">
      <div></div>
      <div className='Login-Box'>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <div>{token}</div>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="email" onChange={idSave}></input>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Password</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="password" onChange={pwSave}></input>
        </div>
        <div className='LoginSubmitBtn'>
          <div className='LoginSubmitBtn-left'></div>
          <div className='LoginSubmitBtn-center'>
            <Button variant="primary" onClick={loginSubmit}>Login</Button>
          </div>
          <div className='LoginSubmitBtn-right'></div>
        </div>
      <div className='signupBox'>
      </div>
      <div className='helpBox'>
        <SignUpModal />
        <a className='hover' onClick={warning}>아이디/비번 찾기</a>
      </div>
    </div>
    <div></div>
  </div>
  </>
  )
}

export default Login