import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { getAccessToken, getFirstReview, resetReview, loginState, getName } from '../redux/actions'
import InputForm from './inputForm'




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
      await axios.post(`http://localhost:4000/review/platform?code=${code}`, { title: title, content: content }, {
        headers: {
          "Authorization": AccessToken
        }, withCredentials: true
      }).then(async (data) => {
        await axios.get(`http://localhost:4000/review/platform?code=${code}&page=1`, { withCredentials: true })
          .then((res) => {
            dispatch(resetReview())
            dispatch(getFirstReview(res.data))
            history.go(`/board/${code}`)
          }).catch((err) => {
            history.go('/')
          })
      }).catch(async (err) => {

        await axios.get('http://localhost:4000/auth/token', { withCredentials: true })
          .then((data) => {
            dispatch(getAccessToken(data.headers.authorization))
            axios.post(`http://localhost:4000/review/platform?code=${code}`, { title: title, content: content }, {
              headers: {
                "Authorization": data.headers.authorization
              }, withCredentials: true
            }).then((data) => {
              axios.get(`http://localhost:4000/review/platform?code=${code}&page=1`, { withCredentials: true })
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
      alert('?????? ??????????????? ?????? ?????????????')
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
        title: '????????? ??? ?????? ??? ??? ????????????!',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '?????????',
        denyButtonText: `????????? ?????????`,
      }).then( async (result) => {
        console.log(result)
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          history.push('/login')
          history.go('/login')
        } else if (result.isDenied) {
          await axios.post('http://localhost:4000/auth/login', { account: 'guest@guest', pw: 'guest@123' }, { withCredentials: true })
          .then((data) => {
            dispatch(getAccessToken(data.headers.authorization))
            dispatch(loginState(true))
            dispatch(getName('guest@guest'))
            // dispatch(getName(data))
            if (history.location.pathname === '/login') {  // ????????? ????????? ???????????? ????????? ?????? ????????? /login ??????????????? ????????? ???????????? ?????? ?????? ??????  
              history.go('/')
            } else {   // ?????????????????? /login??? ???????????? ?????????????????? ??????
              alert('???????????? ????????? ???????????????.')
              history.go('/board')
            }
          }).catch(async (err) => {
            await Swal.fire({
              icon: 'warning',
              title: '????????? ?????? ???????????? ??????',
              text: '????????? ?????? ??????????????? ???????????? ????????????. ???????????? ??????????????????'
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
      <h5 type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="title" onClick={writeBtn}>????????????</h5>
      <div className="bd-example-modal-lg modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">????????? ???????????????!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body warningInfo" style={{backgroundColor:robotCheckColor, color:'black', fontWeight:'bold', fontFamily:'??????'}}>
            <div>
              <h4>?????? ??????</h4>
              <span>???????????? ??????, ????????? ???????????? ?????? ?????? ?????? ??? ??? ????????????.</span>
            </div>
            <div className='form-check'>
              <input type='checkBox' onClick={robotChecktBtn}></input>
              <span> ?????? ???????????? </span>
            </div>
          </div>
          <div className='numberBox'>
              <label for="customRange2" class="form-label"><h5>??????</h5></label>
              <input type="range" class="form-range" min="1" max="10" step="0.5" id="customRange2" defaultValue='5.5' onChange={numberBtn}></input>
              <div>{number}</div>
          </div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">?????? ????????? ???????????????!</h5>
          </div>
          <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label" >??????</label>
                  <input type="text" className="form-control" id="recipient-name" placeholder='??????' onChange={inputTitle}></input>
                </div>
                {/* <div className="mb-3">
                  <label for="message-text" className="col-form-label" >??????</label>
                  <textarea className="form-control" id="message-text" placeholder='????????? ????????? ?????? ?????? ?????????. * ???????????? ??? ????????? *' onChange={inputReview}></textarea>
                </div> */}
              </form>
              <InputForm />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">??????</button>
              <button className="btn btn-primary" onClick={submit}>????????????</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InputModal