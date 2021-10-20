import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { getAccessToken, getFirstReview, resetReview, loginState, getName } from '../redux/actions'




const InputModal = (e) => {
  let dispatch = useDispatch()
  let history = useHistory()
  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')
  let [number, setNumber] = useState('5.5')
  let LoginState = useSelector((state) => state.authReducer.LoginState)
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let [robotCheck, setrobotCheck] = useState(false)
  let [robotCheckColor, setrobotCheckColor] = useState("rgb(255,0,0,0.6)")

  const inputTitle = async (e) => {
    localStorage.inputTitle = e.target.value
    setTitle(e.target.value)

  }
  const inputReview = async (e) => {
    localStorage.inputReview = e.target.value
    setContent(e.target.value)

  }
  const submit = async () => {
    let code = window.location.pathname
    code = code.split('/')[2]
    if (robotCheck) {
      await axios.post(`https://server.bootview.info/review/platform?code=${code}`, { title: title, content: content }, {
        headers: {
          "Authorization": AccessToken
        }, withCredentials: true
      }).then(async (data) => {
        await axios.get(`https://server.bootview.info/review/platform?code=${code}&page=1`, { withCredentials: true })
          .then((res) => {
            dispatch(resetReview())
            dispatch(getFirstReview(res.data))
            history.go(`/board/${code}`)
          }).catch((err) => {
            history.go('/')
          })
      }).catch(async (err) => {

        await axios.get('https://server.bootview.info/auth/token', { withCredentials: true })
          .then((data) => {
            dispatch(getAccessToken(data.headers.authorization))
            axios.post(`https://server.bootview.info/review/platform?code=${code}`, { title: title, content: content }, {
              headers: {
                "Authorization": data.headers.authorization
              }, withCredentials: true
            }).then((data) => {
              axios.get(`https://server.bootview.info/review/platform?code=${code}&page=1`, { withCredentials: true })
                .then((res) => {
                  dispatch(resetReview())
                  dispatch(getFirstReview(res.data))
                  history.go(`/board/${code}`)
                }).catch((err) => {
                  history.go('/')
                })
            })
          })
    })
    } else {
      alert('상단 주의사항을 확인 하셨나요?')
    }

  }

  const robotChecktBtn = (e) => {
    setrobotCheck(e.target.checked)
    if (e.target.checked) {
      setrobotCheckColor("rgb(0,128,0,0.6")
    } else {
      setrobotCheckColor("rgb(255,0,0, 0.6)")
    }
  }
  const writeBtn = async (e) => {
    if (LoginState === false) {
      Swal.fire({
        title: '로그인 후 이용 할 수 있습니다!',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '로그인',
        denyButtonText: `게스트 로그인`,
      }).then( async (result) => {
        console.log(result)
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          history.push('/login')
          history.go('/login')
        } else if (result.isDenied) {
          await axios.post('https://server.bootview.info/auth/login', { account: 'guest@guest', pw: 'guest@123' }, { withCredentials: true })
          .then((data) => {
            dispatch(getAccessToken(data.headers.authorization))
            dispatch(loginState(true))
            dispatch(getName('guest@guest'))
            // dispatch(getName(data))
            if (history.location.pathname === '/login') {  // 로그인 페이지 연속으로 클릭시 이전 경로가 /login 으로나와서 로그인 페이지만 뜨는 오류 방지  
              history.go('/')
            } else {   // 이전페이지가 /login이 아니라면 이전페이지로 이동
              alert('게스트로 로그인 되었습니다.')
              history.go('/board')
            }
          }).catch(async (err) => {
            await Swal.fire({
              icon: 'warning',
              title: '아이디 혹은 비밀번호 오류',
              text: '아이디 혹은 비밀번호가 올바르지 않습니다. 다시한번 확인해주세요'
            })
          })
        } else if (result.isDismissed) {
          history.go('/board')
        }
      })
      // history.push('/login')

    }else{
      return 1;
    }
  }
  const numberBtn = (e) =>{
    setNumber(e.target.value)
}
return (
  <div>
      <h5 type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="title" onClick={writeBtn}>작성하기</h5>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">평점을 남겨주세요!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body warningInfo" style={{backgroundColor:robotCheckColor, color:'black', fontWeight:'bold', fontFamily:'돋움'}}>
            <div>
              <h4>주의 사항</h4>
              <span>무분별한 비방, 욕설은 작성자의 동의 없이 삭제 될 수 있습니다.</span>
            </div>
            <div className='form-check'>
              <input type='checkBox' onClick={robotChecktBtn}></input>
              <span> 확인 했습니다 </span>
            </div>
          </div>
          <div className='numberBox'>
              <label for="customRange2" class="form-label"><h5>평점</h5></label>
              <input type="range" class="form-range" min="1" max="10" step="0.5" id="customRange2" defaultValue='5.5' onChange={numberBtn}></input>
              <div>{number}</div>
          </div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">짧은 후기를 남겨주세요!</h5>
          </div>
          <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label" >제목</label>
                  <input type="text" className="form-control" id="recipient-name" placeholder='제목' onChange={inputTitle}></input>
                </div>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label" >후기</label>
                  <textarea className="form-control" id="message-text" placeholder='입력한 내용은 임시 저장 됩니다. * 새로고침 시 사라짐 *' onChange={inputReview}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button className="btn btn-primary" onClick={submit}>작성완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InputModal