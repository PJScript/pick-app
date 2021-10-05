import axios from 'axios'
import React, { useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import PwChageModal from '../compnent/pwChangeModal'
import { useDispatch } from 'react-redux'
import { getAccessToken, getMypageReview } from '../redux/actions'

const MyPage = () => {
  let dispatch = useDispatch()
  let [nickName, setNickName] = useState('')
  let [validMsg, setValidMsg] = useState('닉네임 변경 후 닉네임 중복확인을 해주세요')
  let [validColor, setValidColor] = useState('black')
  let AccessToken = useSelector((state)=>state.authReducer.AccessToken)
  let Name = useSelector((state)=>state.authReducer.Email)
  let MyReviews = useSelector((state) => state.authReducer.MyReviews)
  const pwIcon = () => {
    let result = []
    for (let i = 0; i <= 6; i++) {
      result.push(
      <svg style={{marginLeft:'2px'}} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" />
      </svg>
      )
    }
    return result
  }
  const nickNameCheckBtn = () => {

  }

  const nickNameInput = (e) => {
    setNickName(e.target.value)
  }
  const nickNameCheck = async () => {
    await axios.post('https://server.bootview.info/auth/valid', { "name" : nickName }, {
      headers : {
        "Authorization": AccessToken
      },withCredentials: true
    }).then((data) => {
      console.log(data)
      console.log(data.status,"상태")
      if(data.status === 200){
        setValidColor('green')
        setValidMsg('사용할 수 있는 닉네임 입니다.')
      }
    }).catch( async (err) => {
      console.log(err.response)
      if(err.response.status === 409){
        setValidColor('red')
        setValidMsg('이미 존재하는 닉네임 입니다')
      } else if (err.response.status === 401) {
        await axios.get('https://server.bootview.info/auth/token', { withCredentials: true })
          .then( async (data) => {
            dispatch(getAccessToken(data.headers.authorization))
            await axios.post('https://server.bootview.info/auth/valid', { "name": nickName }, {
              headers: {
                "Authorization": data.headers.authorization
              }, withCredentials: true 
            }).then((data) => console.log(data))
          })
      }
    })
  }
  const reviewDelete = async (e) => {
    let number = e.nativeEvent.path[2].cells[0].innerText
    let account = e.nativeEvent.path[2].cells[1].innerText
    let title = e.nativeEvent.path[2].cells[2].innerText
    let createDate = e.nativeEvent.path[2].cells[3].innerText
    let platformCode = e.nativeEvent.path[2].cells[5].innerText

    console.log(account, title, createDate, platformCode,"결과")

    if(window.confirm('정말 삭제하시겠습니까?')){
      await axios.post(`https://server.bootview.info/review/delete/platform?c=${platformCode}`,{"id":MyReviews[number-1].id,"number":number,"account":account,"title":title,"createDate":createDate},
    {headers:{
      "Authorization":AccessToken
    }})
    .then( async (data)=>{
      await axios.get('https://server.bootview.info/auth/profile?p=1',{
        headers:{
          "Authorization":AccessToken
        },withCredentials:true
      }).then((data)=>{
        dispatch(getMypageReview(data.data))
        alert('게시글이 삭제되었습니다.')
      }).catch((err)=>{
        console.log(err.response,"프로필 재요청 오류")
        console.log(err)
      })
    })
    .catch( async (err)=>{
      if(err.response.status === 401){
        await axios.get(`http:localhost:4000/auth/token`,{withCredentials:true})
        .then( async (data)=>{
          await axios.get(`https://server.bootview.info/auth/profile`,{
            headers:{
              "Authorization":data.headers.authorization
            },withCredentials:true
          })
        })
      }
    })
    }else{
      return;
    }
  }
  console.log(MyReviews,"마이리뷰즈")
  return (
    <>
      <div class="container-fluid" style={{ border: '1px solid red' }}>
        <h5>{Name} 님의 마이페이지</h5>
        <div>
          <span>이메일 : example@example.com </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" style={{color:'green'}}>
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
          <span style={{color:'green'}}>인증 회원</span>
        </div>
        <div className="mypage-nickNameBox">
          <span>닉네임 : <input size="12" onChange={nickNameInput}></input></span>
          <button type="button" className="btn btn-primary btn-sm button" onClick={nickNameCheck}>중복체크</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" style={{ color: validColor}}>
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
          <span style={{ color: validColor }}>{validMsg}</span>
        </div>
        <div className="mypage-pwBox">
          <span>
            <span>비밀번호 :</span>
            <span style={{ color: 'grey' }}>
              {pwIcon()}        {/* 비밀번호 ***** 아이콘 표시 */}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" style={{ color: 'green' }}>
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            <span style={{ color: 'green' }}>안전함</span>
            <PwChageModal />
          </span>
        </div>
      </div>
      <div class="container-fluid" style={{ border: '1px solid blue' }}>
        <h6>내가 쓴 글목록</h6>
        <table class="table">
          <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">작성자</th>
                <th scope="col">제목</th>
                <th scope="col">작성일</th>
                <th scope="col">옵션</th>
                <th scope="col">code</th>
            </tr>
          </thead>
          <tbody>
            {MyReviews.map((item) => {
              return <tr>
                <th scope="row">{MyReviews.indexOf(item)+1}</th>
                <td>{Name}</td>
                <td>{item.title}</td>
                <td>{item.createDate}</td>
                <td><span className="hover">수정</span> / <span className="hover" onClick={reviewDelete}>삭제</span></td>
                <td>{item.platformCode}</td>
              </tr>
            })}
          </tbody>
        </table>
        <div className='pagenation-navBox'>
          <div>nav left</div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
          <div>nav right</div>
        </div>
      </div>
    </>
  )
}


export default MyPage