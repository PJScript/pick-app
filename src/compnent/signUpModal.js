import React from 'react'
import { useState, useEffect } from 'react';

const SignUpModal = () => {
  const test1 = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 비번을 검사할 유효성검사식
  const test2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일이 적합한지 검사할 유효성검사식
  const nameExp = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // 이름 유효성 검사
  const pwtest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  
  let [nameFeedBack, setNameFeedBack] = useState('')
  let [nameColor, setNameColor] = useState('')
  let [nameIconColor, setNameIconColor] = useState('red')
  let [name, setName] = useState('')

  let [emailFeedBack, setEmailFeedBack] = useState('')
  let [emailColor, setEmailColor] = useState('')
  let [emailIconColor, setEmailIconColor] = useState('red')
  let [email, setEmail] = useState('')

  let [pwFeedBack, setPwFeedBack] = useState('비밀번호는 8글자 이상,숫자, 특수문자를 하나씩 포함해야 합니다')
  let [pwColor, setPwColor] = useState('')
  let [pwIconColor, setPwIconColor] = useState('red')
  let [pw, setPw] = useState('')

  let [pwCheckFeedBack, setPwCheckFeedBack] = useState('')
  let [pwCheckColor, setPwCheckColor] = useState('')
  let [pwCheckIconColor, setPwCheckIconColor] = useState('red')
  let [pwC, setPwC] = useState('')
  
  let [eyeIcon, setEyeIcon] = useState('bi bi-eye-slash-fill hover')
  let [passWordType, setType] = useState('password')

  const nameCheck = (e) => {
    console.log(e.target.value)
    if(nameExp.test(e.target.value)){
      console.log('완료')
      setNameColor('rgb(174, 255, 174)')
      setNameFeedBack('완료')
      setNameIconColor('green')
      setName(e.target.value)
    }else{
      setNameColor('rgb(255, 152, 152)')
      setNameFeedBack('올바른 이름을 입력해주세요')
      setNameIconColor('red')
      setName(e.target.value)
    }
  }
  const radioCheck = (e) => {
    console.log(e.target.value)
  }
  const emailCheck = (e) => {
    if(test2.test(e.target.value)){
      console.log('완료')
      setEmailColor('rgb(174, 255, 174)')
      setEmailFeedBack('완료')
      setEmailIconColor('green')
      setEmail(e.target.value)
    }else{
      setEmailColor('rgb(255, 152, 152)')
      setEmailFeedBack('이메일 형식이 올바르지 않습니다')
      setEmailIconColor('red')
      setEmail(e.target.value)
    }
    console.log(e.target.value)
  }
  const pwCheck = (e) => {
    setPwC('')
    setPwCheckColor('rgb(255, 152, 152)')
    setPwCheckIconColor('rgb(255, 152, 152)')
    setPwCheckFeedBack('비밀번호가 같지 않습니다')
    if(pwtest.test(e.target.value)){
      console.log('완료')
      setPwColor('rgb(174, 255, 174)')
      setPwFeedBack('완료')
      setPwIconColor('green')
      setPw(e.target.value)
    }else{
      setPwColor('rgb(255, 152, 152)')
      setPwFeedBack('8글자 이상, 숫자, 특수문자를 하나씩 포함해야 합니다 ')
      setPwIconColor('red')
      setPw(e.target.value)
    }
  }
  const pwValid = (e) => {
    setPwC(e.target.value)
    if(pw === e.target.value){
      console.log('완료')
      setPwCheckColor('rgb(174, 255, 174)')
      setPwCheckFeedBack('완료')
      setPwCheckIconColor('green')
    }else{
      setPwCheckColor('rgb(255, 152, 152)')
      setPwCheckFeedBack('비밀번호 같지 않습니다')
      setPwCheckIconColor('red')
    }
  }

  const pwhideIcon = () => {
    if(eyeIcon === 'bi bi-eye-fill hover'){
      setEyeIcon('bi bi-eye-slash-fill hover')
      setType('password')
    }else if(eyeIcon === 'bi bi-eye-slash-fill hover'){
      setEyeIcon('bi bi-eye-fill hover')
      setType('text')
    }
  }

  return (
    <div>
    <a href='#' className="hover" data-bs-toggle="modal" data-bs-target="#exampleModal">회원가입</a>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">빠른 회원가입</h5>
          </div>
          <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">이름</label>
                  <input type="text" class="form-control" id="recipient-name" placeholder='name' onChange={nameCheck} style={{backgroundColor:nameColor}}></input>
                  <i class="bi bi-check-circle-fill" style={{color:nameIconColor}}></i>
                  <span>{nameFeedBack}</span>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="man" onChange={radioCheck}></input>
                  <label class="form-check-label" for="inlineRadio1" >남성</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="girl" onChange={radioCheck}></input>
                  <label class="form-check-label" for="inlineRadio2" >여성</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="other" onChange={radioCheck}></input>
                  <label class="form-check-label" for="inlineRadio2" >기타</label>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label" >이메일</label>
                  <input type="text" class="form-control" id="recipient-name" placeholder='email' onChange={emailCheck} style={{backgroundColor:emailColor}}></input>
                  <i class="bi bi-check-circle-fill" style={{color:emailIconColor}}></i>
                  <span>{emailFeedBack}</span>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">비밀번호</label>
                  <i class={eyeIcon} onClick={pwhideIcon}></i>
                  <span> 표시/숨김 </span>
                <input type={passWordType} class="form-control" id="message-text" placeholder='password' onChange={pwCheck} style={{backgroundColor:pwColor}}></input>
                <i class="bi bi-check-circle-fill" style={{color:pwIconColor}}></i>
                  <span>{pwFeedBack}</span>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label" >비밀번호 재확인</label>
                <input type={passWordType} class="form-control" id="message-text" placeholder='password valid' value={pwC} onChange={pwValid} style={{backgroundColor:pwCheckColor}}></input>
                <i class="bi bi-check-circle-fill" style={{color:pwCheckIconColor}}></i>
                  <span>{pwCheckFeedBack}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">회원가입 취소</button>
            <button type="button" class="btn btn-primary">가입완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
 
}

export default SignUpModal