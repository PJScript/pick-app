import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import SignUpModal from '../compnent/signUpModal'
import { useSelector, useDispatch } from 'react-redux';
import {getAccessToken, getName, loginState} from '../redux/actions'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';



const Login = () => {
  let history = useHistory()
  const test2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일이 적합한지 검사할 유효성검사식
  let dispatch = useDispatch()
  // const mydata = useSelector((state) => state);
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
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
    await axios.post('https://server.bootview.info/auth/login',{account:id,pw:pw},{ withCredentials : true }).then((data)=>{
      dispatch(getAccessToken(data.headers.authorization))
      dispatch(loginState(true))
      dispatch(getName(id))
      // dispatch(getName(data))
      if(history.location.pathname == '/login'){  // 로그인 페이지 연속으로 클릭시 이전 경로가 /login 으로나와서 로그인 페이지만 뜨는 오류 방지  
        history.push('/')
      }else{   // 이전페이지가 /login이 아니라면 이전페이지로 이동
        history.goBack()
      }
    }).catch(async (err)=>{
      await Swal.fire({
        icon: 'warning',
        title: '아이디 혹은 비밀번호 오류',
        text: '아이디 혹은 비밀번호가 올바르지 않습니다. 다시한번 확인해주세요'
      })
    })
  }

  const emailValidate = (e) => {
    setEmailValid(e.target.value)
    if(test2.test(e.target.value)){
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
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email" onChange={idSave}></input>
        </div>
        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Password</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="password" onChange={pwSave}></input>
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