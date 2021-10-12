import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const PwChageModal = () => {
  let history = useHistory()
  let [previousPw, setPreviousPw] = useState('')
  let [newPw, setNewPw] = useState('')
  let [newPwCheck, setNewPwCheck] = useState('')
  let AccessToken = useSelector((state)=>state.authReducer.AccessToken)
const previousPwInput = (e) => {
  setPreviousPw(e.target.value)
}
const newPwInput = (e) => {
  setNewPw(e.target.value)
}
const newPwInputCheck = (e) => {
  setNewPwCheck(e.target.value)
}

const pwchangeSubmitBtn = async () => {
  if(newPw !== newPwCheck){
    alert('새 비밀번호를 다시한번 확인해주세요')
  }else{
    await axios.post('https://server.bootview.info/auth/change/password',{"prevPw":previousPw,"newPw":newPw},{
      headers:{
        "Authorization":AccessToken
      },withCredentials:true
    }).then((data)=>{
      if(data.data){
        alert('비밀번호 변경 완료')
        history.go('/mypage')
      }else{
        Swal.fire({
          title:'현재 비밀번호 확인',
          icon:'warning',
          text:'현재 비밀번호를 올바르게 입력 해주세요'
        })
      }
    })
  }
}

return (
  <span>
      <h5 type="button" className="btn btn-primary btn-sm button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="title">비밀번호 변경</h5>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">비밀번호 변경</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <h6>현재 비밀번호</h6>
            <input placeholder='*****' type='password' onChange={previousPwInput}></input>
          </div>
          <div className="modal-body">
            <h6>새 비밀번호</h6>
            <input placeholder='*****' type='password' onChange={newPwInput}></input>
            <h6>새 비밀번호 재확인</h6>
            <input placeholder='*****' type='password' onChange={newPwInputCheck}></input>
          </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={pwchangeSubmitBtn}>완료</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
      </div>
    </span>

  )
}

export default PwChageModal