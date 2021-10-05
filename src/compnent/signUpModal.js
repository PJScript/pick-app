import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


const SignUpModal = () => {
  let history = useHistory()

  const test1 = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 비번을 검사할 유효성검사식
  const test2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;  // 이메일이 적합한지 검사할 유효성검사식
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
  
  let [radioValue, setRadioValue] = useState('')
  let [emailList, setEmailList] = useState('선택하세요')
  
  let [emailAbleInput, setEmailAbleInput] = useState('none')
  let [emailDisableInput, setEmailDisAbleInput] = useState('grid')
  
  let [fullEmail, setFullEmail] = useState('')

  useEffect(()=>{
    setFullEmail('')
    setFullEmail(`${email}@${emailList}`)
  },[email,emailList])    // email (이메일 @ 앞자리), emailList (이메일 @ 뒷자리)

  useEffect(()=>{      
    if(test2.test(fullEmail)){
      console.log('완료')
      setEmailColor('rgb(174, 255, 174)')
      setEmailFeedBack('완료')
      setEmailIconColor('green')
    }else{
      console.log(fullEmail)
      setEmailColor('rgb(255, 152, 152)')
      setEmailFeedBack('이메일 형식이 올바르지 않습니다')
      setEmailIconColor('red')
    }
  },[fullEmail])    // 이메일 형태로 만든 최종 이메일 값

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
    setRadioValue(e.target.value)
  }
  const emailInput = (e) => {
      setEmail(e.target.value)
  }
  const emailAdressInput = (e) => {
    console.log(e.target.value)
      setEmailList(e.target.value)
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



  const submitBtn = async (e) => {
    console.log(e)
    console.log(fullEmail)
    if(name.length <= 0 || email.length <= 0 || pw.length <= 0 || pwC.length <= 0 || radioValue.length <= 0){
      alert('항목을 모두 채워주세요')
    }else if(nameFeedBack != '완료' || emailFeedBack != '완료' || pwFeedBack  != '완료' || pwCheckFeedBack != '완료'){
      alert('각 항목을 다시 확인해주세요')
    }else{
      await axios.post('http://localhost:4000/auth/signup',
      {
        account:fullEmail,
        pw:pw,
        name:name,
        gender:radioValue,
        sns:'none'
      },{withCredentials:true}).then((data) => {
        console.log(data)
        history.go('/login')
        alert('회원 가입이 완료되었습니다. 로그인 해주세요')
      }).catch((err)=>{
        if(err){
          console.log(err)
        }else if(err.response.status === 409){
          Swal.fire({
            icon: 'error',
            title: '가입된 이메일',
            text: '이미 가입된 이메일 입니다. 기억나지 않는다면 계정 찾기를 진행해주세요',
            footer: '<a href="">Why do I have this issue?</a>'
          })
      }
      })
    }
  }

  const cancelBtn = (e) => {
    console.log(e)
  }

  const selectInput = (e) => {
    console.log(e.target.innerText)
    setEmailList(e.target.innerText)
    setEmailAbleInput('none')
    setEmailDisAbleInput('grid')
  }

  const userInput = (e) => {
    console.log(e.target.innerText)
    setEmailAbleInput('grid')
    setEmailDisAbleInput('none')
  }
  return (
    <div>
    <a href='#' className="hover" data-bs-toggle="modal" data-bs-target="#exampleModal">회원가입</a>
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">빠른 회원가입</h5>
          </div>
          <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">이름</label>
                  <input type="text" className="form-control" id="recipient-name" placeholder='name' onChange={nameCheck} style={{backgroundColor:nameColor}}></input>
                  <i className="bi bi-check-circle-fill" style={{color:nameIconColor}}></i>
                  <span>{nameFeedBack}</span>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="man" onChange={radioCheck}></input>
                  <label className="form-check-label" for="inlineRadio1" >남성</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="girl" onChange={radioCheck}></input>
                  <label className="form-check-label" for="inlineRadio2" >여성</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="other" onChange={radioCheck}></input>
                  <label className="form-check-label" for="inlineRadio2" >기타</label>
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label" >이메일</label>
                  <div className="input-group mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='email' onChange={emailInput} style={{ backgroundColor: emailColor }}></input>
                    <div> @ </div> 
                    <input type="text" className="form-control" id="recipient-name" placeholder='직접 입력하세요' onChange={emailAdressInput} style={{ display:emailAbleInput}}></input>
                    <input disabled type="text" className="form-control" id="recipient-name" placeholder={emailList} style={{display:emailDisableInput}}></input>
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{emailList}</button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item hover" onClick={selectInput}>naver.com</a></li>
                      <li><a className="dropdown-item hover" onClick={selectInput}>google.com</a></li>
                      <li><a className="dropdown-item hover" onClick={selectInput}>hanmail.com</a></li>
                      <li><hr className="dropdown-divider"></hr></li>
                      <li><a className="dropdown-item hover" onClick={userInput}>직접 입력</a></li>
                    </ul>
                  </div>
                  <i className="bi bi-check-circle-fill" style={{ color: emailIconColor }}></i>
                <span>{emailFeedBack}</span>
                </div>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label">비밀번호</label>
                  <i className={eyeIcon} onClick={pwhideIcon}></i>
                  <span> 표시/숨김 </span>
                <input type={passWordType} className="form-control" id="message-text" placeholder='password' onChange={pwCheck} style={{backgroundColor:pwColor}}></input>
                <i className="bi bi-check-circle-fill" style={{color:pwIconColor}}></i>
                  <span>{pwFeedBack}</span>
              </div>
              <div className="mb-3">
                <label for="message-text" className="col-form-label" >비밀번호 재확인</label>
                <input type={passWordType} className="form-control" id="message-text" placeholder='password valid' value={pwC} onChange={pwValid} style={{backgroundColor:pwCheckColor}}></input>
                <i className="bi bi-check-circle-fill" style={{color:pwCheckIconColor}}></i>
                  <span>{pwCheckFeedBack}</span>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancelBtn}>회원가입 취소</button>
            <button type="button" className="btn btn-primary" onClick={submitBtn}>가입완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUpModal