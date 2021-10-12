import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import PwChageModal from '../compnent/pwChangeModal'
import { useDispatch } from 'react-redux'
import { getAccessToken, getMypageReview, loginState, setPageCount } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import ReviewPatchModal from '../compnent/reviewPatchModal'
const MyPage = () => {
  let dispatch = useDispatch()
  let history = useHistory()
  let nickNameRegExp = /[0-9]|[a-z]|[A-Z]|[가-힣]|[ㄱ-ㅎ]/;
  let specialSymbolsCheck = /[`~!@#$%^&+=*|\\\'\";:\/?]/gi;

  let [nickName, setNickName] = useState('')
  let [validMsg, setValidMsg] = useState('닉네임 변경 후 닉네임 중복확인을 해주세요')
  let [validColor, setValidColor] = useState('black')

  let [id, setId] = useState()
  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')

  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let Name = useSelector((state) => state.authReducer.Email)
  let MyReviews = useSelector((state) => state.authReducer.MyReviews)
  let pageCnt = useSelector((state) => state.reviewReducer.PageCnt)

  const pwIcon = () => {
    let result = []
    for (let i = 0; i <= 6; i++) {
      result.push(
        <svg style={{ marginLeft: '2px' }} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
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
    console.log(nickNameRegExp.test(nickName),"한글 영어 테스트")
    console.log(specialSymbolsCheck.test(nickName),"특수문자 테스트")
    if (nickNameRegExp.test(nickName) && !specialSymbolsCheck.test(nickName)) {
      await axios.post('https://server.bootview.info/auth/valid', { "name": nickName }, {
        headers: {
          "Authorization": AccessToken
        }, withCredentials: true
      }).then((data) => {
        if (data.status === 200) {
          setValidColor('green')
          setValidMsg('사용할 수 있는 닉네임 입니다.')
        }
      }).catch(async (err) => {
        if (err.response.status === 409) {
          setValidColor('red')
          setValidMsg('이미 존재하는 닉네임 입니다')
        } else if (err.response.status === 401) {
          await axios.get('https://server.bootview.info/auth/token', { withCredentials: true })
            .then(async (data) => {
              dispatch(getAccessToken(data.headers.authorization))
              await axios.post('https://server.bootview.info/auth/valid', { "name": nickName }, {
                headers: {
                  "Authorization": data.headers.authorization
                }, withCredentials: true
              }).then((data) => console.log(data))
            })
        }
      })
    } else {
      setValidColor('orange')
      setValidMsg('사용할 수 없는 닉네임 입니다')
    }

  }
  const reviewDelete = async (e) => {
    let number = e.nativeEvent.path[2].cells[0].innerText
    let account = e.nativeEvent.path[2].cells[1].innerText
    let title = e.nativeEvent.path[2].cells[2].innerText
    let createDate = e.nativeEvent.path[2].cells[3].innerText
    let platformCode = e.nativeEvent.path[2].cells[5].innerText

    if (window.confirm('정말 삭제하시겠습니까?')) {
      await axios.post(`https://server.bootview.info/review/delete/platform?c=${platformCode}`, { "id": MyReviews[number - 1].id, "number": number, "account": account, "title": title, "createDate": createDate },
        {
          headers: {
            "Authorization": AccessToken
          }
        })
        .then(async (data) => {
          await axios.get('https://server.bootview.info/auth/profile?p=1', {
            headers: {
              "Authorization": AccessToken
            }, withCredentials: true
          }).then((data) => {
            console.log(data,"다시 프로필 요청")
            dispatch(getMypageReview(''))
            dispatch(getMypageReview(data.data.Reviews))
            dispatch(setPageCount(parseInt(data.data.Count.cnt)))
            alert('게시글이 삭제되었습니다.')
          }).catch((err) => {
            console.log(err)
            console.log(err.response, "프로필 재요청 오류")
            
          })
        })
        .catch(async (err) => {
          if (err.response.status === 401) {
            await axios.get(`https://server.bootview.info/auth/token`, { withCredentials: true })
              .then(async (data) => {
                dispatch(getAccessToken(data.headers.authorization))
                await axios.post(`https://server.bootview.info/review/delete/platform?c=${platformCode}`, { "id": MyReviews[number - 1].id, "number": number, "account": account, "title": title, "createDate": createDate },
                  {
                    headers: {
                      "Authorization": data.headers.authorization
                    }
                  }).then(async () => {
                    await axios.get(`https://server.bootview.info/auth/profile?p=1`, {
                      headers: {
                        "Authorization": data.headers.authorization
                      }, withCredentials: true
                    }).then((data) => {
                      dispatch(getMypageReview(''))
                      dispatch(getMypageReview(data.data))
                    })
                  })
              })
          }
        })
    } else {
      return;
    }
  }
  const pageNationBtn = async (e) => {
    let page = e.target.innerText
    await axios.get(`https://server.bootview.info/auth/profile?p=${page}`, {
      headers:{
        "Authorization": AccessToken
      },withCredentials:true
    })
    .then((data) => {
      dispatch(getMypageReview(''))
      dispatch(getMypageReview(data.data.Reviews))
    }).catch( async (err)=>{
      if(err.response.status === 401){
        await axios.get('https://server.bootview.info/auth/token',{withCredentials:true})
        .then( async (data)=>{
          dispatch(getAccessToken(data.headers.authorization))
          await axios.get(`https://server.bootview.info/auth/profile?p=${page}`,{
            headers:{
              "Authorization": data.headers.authorization
            },withCredentials:true
          }).then((data)=>{
            dispatch(getMypageReview(data.data.Reviews))
          })
        })
      }
    })
    
  }
  const pageNumberMaker = () =>{
    let result = []
    let quotient = pageCnt / 8
    let remainder = pageCnt % 8
    let bugTest = 0
    if(remainder > 0){
      quotient = quotient + 1
    }

    for(let i=1; i <= quotient; i++){
      bugTest = i
      result.push(
        <li class="page-item"><div className="page-link hover" onClick={pageNationBtn}>{i}</div></li>
      )
    }
    result.push(
      <li class="page-item"><div className="page-link hover" onClick={pageNationBtn}>{bugTest+1}</div>bugTest</li>
    )
    return result
  }

  const changeNickName = async () => {
    if (validColor !== 'green') {
      alert('닉네임 중복체크를 해주세요')
    } else {
      await axios.post('https://server.bootview.info/auth/change/nickname', { "nickname": nickName }, {
        headers: {
          "Authorization": AccessToken
        }
      }).then( async () => {
        await axios.get('https://server.bootview.info/auth/logout',{withCredentials:true})
        .then( async ()=>{
          dispatch(loginState(false))
          dispatch(getAccessToken(''))
          alert('변경되었습니다. 다시 로그인 해주세요')
          history.push('/')
        })
      }).catch(async (err) => {
        if (err.response.status === 401) {
          await axios.get('https://server.bootview.info/auth/token', { withCredentials: true })
            .then(async (data) => {
              dispatch(getAccessToken(data.headers.authorization))
              await axios.get(`https://server.bootview.info/auth/change/nickname`, { "nickname": nickName }, {
                headers: {
                  "Authorization": data.headers.authorization
                }, withCredentials: true
              }).then(async (data) => {
                await axios.get('https://server.bootview.info/auth/logout', { withCredentials: true })
                  .then(() => console.log('로그아웃 완료'))
              })
            })
        } else {
          console.log(err, "토큰 만료 후 재요청 오류")
        }
      })
    }
  }
  console.log(pageCnt, "페이지넘버")

  const reviewPatch = (e) => {
    let parseNumber = parseInt(e.nativeEvent.path[3].cells[0].innerText)
    console.log('클릭됨')
    setId(MyReviews[parseNumber-1].id)
    setTitle(MyReviews[parseNumber-1].title)
    setContent(MyReviews[parseNumber-1].content)
  }

  const inputTitle = (e) => {
    setTitle(e.target.value)
  }
  const inputContent = (e) => {
    setContent(e.target.value)
  }
  const submitPatchReview = async () => {
    await axios.post('https://server.bootview.info/review/patch',{"id":id,"title":title,"content":content},{
      headers:{
        "Authorization":AccessToken
      },withCredentials:true
    }).then( async (data)=>{
      await axios.get(`https://server.bootview.info/auth/profile?p=1`,{
        headers:{
          "Authorization":AccessToken
        },withCredentials:true
      }).then((data)=>{
        dispatch(getMypageReview(''))
        dispatch(getMypageReview(data.data.Reviews))
        history.go('/mypage')
      }).catch((err)=>{
        alert('알 수 없는 오류. 잠시 후 다시 시도해주세요')
        history.go('/')
      })
    }).catch( async (err)=>{
      if(err.response.status === 401){
        await axios.post('https://server.bootview.info/auth/token')
        .then( async (data)=>{
          dispatch(getAccessToken(data.headers.authorization))
          await axios.post('https://server.bootview.info/review/patch',{"id":id,"title":title,"content":content},{
            headers:{
              "Authorization":data.headers.authorization
            },withCredentials:true
          }).then((data)=>{console.log("성공")}).catch((err)=>{console.log(err.response,"토큰 가져오다 오고 재요청 오류")})
        }).catch((err)=>{console.log(err.response,"토큰 가져오는 오류")})
      }
    })
  }
  console.log('마이페이지 렌더링 횟수')
  return (
    <>
      <div class="container-fluid" style={{ border: '1px solid red' }}>
        <h5>{Name} 님의 마이페이지</h5>
        <div>
          <span>이메일 : example@example.com </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" style={{ color: 'green' }}>
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
          <span style={{ color: 'green' }}>인증 회원</span>
        </div>
        <div className="mypage-nickNameBox">
          <span>닉네임 : <input size="12" onChange={nickNameInput}></input></span>
          <button type="button" className="btn btn-primary btn-sm button" onClick={nickNameCheck}>중복체크</button>
          <button type="button" className="btn btn-success btn-sm button" onClick={changeNickName}>변경하기</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" style={{ color: validColor }}>
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
      <div className="container-fluid myPageTable" style={{ border: '1px solid blue' }}>
        <div>
          <h6>내가 쓴 글목록</h6>
          <table class="table ">
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
            {MyReviews.length <= 0 ?
              <tbody className='blankReviewBox'>
                <div></div>
                <div>
                  <h6>아직 작성한 글이 없어요!</h6>
                  <h5>첫 글을 남겨주세요 !</h5>
                </div>
                <div></div>
              </tbody>
              :
              <tbody>
                {MyReviews.map((item) => {
                  return <tr>
                    <th scope="row">{MyReviews.indexOf(item) + 1}</th>
                    <td>{Name}</td>
                    <td>{item.title}</td>
                    <td>{item.createDate}</td>
                    <td className="patchAndDelete">    
                      <span>  {/* 게시글 수정 모달 */}
                        <div className="hover" data-bs-toggle="modal" data-bs-target="#reviewPatchModal" onClick={reviewPatch}> 수정 </div>
                        <div className="modal fade" id="reviewPatchModal" tabindex="-1" aria-labelledby="reviewPatchModalLabel" aria-hidden="false">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="reviewPatchModalLabel">게시물 수정</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <h6>제목</h6>
                                <input type="text" value={title} onChange={inputTitle}></input>
                              </div>
                              <div className="modal-body">
                                <h6>내용</h6>
                                <textarea type="text" value={content} onChange={inputContent}></textarea>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={submitPatchReview}>완료</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span> / <span className="hover" onClick={reviewDelete}>삭제</span></td>
                    <td>{item.platformCode}</td>
                  </tr>
                })}
              </tbody>
            }
          </table>
        </div>

        <div className='pagenation-navBox'>
          <div>nav left</div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><div className="page-link hover" onClick={pageNationBtn}>Previous</div></li>
              {pageNumberMaker()}
              <li class="page-item"><div className="page-link hover" onClick={pageNationBtn}>Next</div></li>
            </ul>
          </nav>
          <div>nav right</div>
        </div>
      </div>
    </>
  )
}


export default MyPage