import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAccessToken, getMypageReview, loginState } from '../redux/actions'

import { Link } from 'react-router-dom'
import axios from 'axios'
const Header = () => {
  let LoginState = useSelector((state) => state.authReducer.LoginState)
  let Email = useSelector((state) => state.authReducer.Email)
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let MyReviews = useSelector((state) => state.authReducer.MyReviews)
  let dispatch = useDispatch()
  let history = useHistory()
  console.log(LoginState,"첫 랜더링 후 상태")
  

  const logoutBtn = async () => {
    console.log(LoginState,"로그인상태")
    if(LoginState === false){
      history.push('/login')
    }else{
      dispatch(loginState(false))
      dispatch(getAccessToken(''))

      await axios.get('https://server.bootview.info/auth/logout',{withCredentials:true})
      .then((data)=>{
        console.log(data)
        alert('로그아웃 되었습니다')
      })
      history.push('/')
    }
  }

  const getFirstReviews = async () => {
    await axios.get('https://server.bootview.info/auth/profile?p=1', {
      headers:{
        "Authorization": AccessToken
      },withCredentials:true
    })
    .then((data) => {
      console.log("여기 데이터",data.data)
      dispatch(getMypageReview(data.data))
      console.log("상태변경")
    }).catch( async (err)=>{
      if(err.response.status === 401){
        await axios.get('https://server.bootview.info/auth/token',{withCredentials:true})
        .then( async (data)=>{
          dispatch(getAccessToken(data.headers.authorization))
          await axios.get('https://server.bootview.info/auth/profile?p=1',{
            headers:{
              "Authorization": data.headers.authorization
            },withCredentials:true
          }).then((data)=>{
            dispatch(getMypageReview(data.data))
          })
        })
      }
    })
  }
  console.log(MyReviews)
  return (
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid" style={{display:'flex'}}>
      <div>왼쪽</div>
      <Link to='/'>
      <div className="navbar-brand">
        <img src={require('/home/js/Desktop/BootReviewClient/src/images/icons8-magnifying-glass-64.png').default} alt="" width="30" height="24" className="d-inline-block align-text-top"></img>
        BootView
      </div>
      </Link>
      <div className='topSettingBox'>
        <div className='welcomeMsg'>{LoginState? <><Link to='/mypage'><span onClick={getFirstReviews}>{Email}</span></Link><span>님 환영합니다</span></>: ``}</div>
        <div className='loginBtn A hover' onClick={logoutBtn}>
          <div><i className="bi bi-door-open"></i>{LoginState? '로그아웃':'로그인'}</div>
        </div>
        <div className='darkMode'>
          <i className="bi bi-palette-fill"> 다크모드 </i>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header





// <div className='loginBtn'>
// <a href='#'><i className="bi bi-door-open-fill"></i>로그아웃</a>
// </div>