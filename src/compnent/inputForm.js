import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { getAccessToken, getFirstReview, resetReview, loginState, getName, setPageCount } from '../redux/actions'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useHistory } from 'react-router';
import BoardImageMaker from './boardImageMaker';
const InputForm = () => {
  let history = useHistory()
  let dispatch = useDispatch()
  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')
  let [number, setNumber] = useState('5.5')
  let LoginState = useSelector((state) => state.authReducer.LoginState)
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let [robotCheck, setrobotCheck] = useState(false)
  let [robotCheckColor, setrobotCheckColor] = useState("rgb(255,0,0,0.6)")
  const backPage = () => {
    history.push('/')
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
            dispatch(setPageCount(res.data.reviewPageCnt[0].cnt))
            dispatch(getFirstReview(res.data.reviewList))
            history.push(`/board/${code}`)
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
                  dispatch(setPageCount(res.data.reviewPageCnt[0].cnt))
                  dispatch(getFirstReview(res.data.reviewList))
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

  const clickCancelBtn = () =>{
    if(window.confirm('?????? ?????? ??????????????????? (?????? ????????? ???????????? ?????? ??? ????????????)')){
      history.goBack()
    }else{
      return 0;
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
  
  const inputTitle = (e) => {
    setTitle(e.target.value)
  }
  return (
    <div className="inputFormPage container-xxl">
      <div className="inputFormItem">
        <BoardImageMaker />
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
          <div className="mb-3">
                  <label for="recipient-name" className="col-form-label" ></label>
                  <input type="text" className="form-control" id="recipient-name" placeholder='??????' onChange={inputTitle}></input>
          </div>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data)
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={clickCancelBtn}>??????</button>
          <button className="btn btn-primary" onClick={submit}>????????????</button>
        </div>
      </div>

    </div>


  )
}

export default InputForm