import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAccessToken, getMypageReview, loginState, setPageCount } from '../redux/actions'

import { Link } from 'react-router-dom'
import axios from 'axios'
const Header = () => {
  let LoginState = useSelector((state) => state.authReducer.LoginState)
  let Email = useSelector((state) => state.authReducer.Email)
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let MyReviews = useSelector((state) => state.authReducer.MyReviews)
  let dispatch = useDispatch()
  let history = useHistory()

  

  const logoutBtn = async () => {

    if(LoginState === false){
      history.push('/login')
    }else{
      dispatch(loginState(false))
      dispatch(getAccessToken(''))

      await axios.get('https://server.bootview.info/auth/logout',{withCredentials:true})
      .then((data)=>{
        alert('로그아웃 되었습니다')
      })
      history.push('/')
    }
  }

  const getFirstReviews = async () => {
    await axios.get(`https://server.bootview.info/auth/profile?p=1`, {
      headers:{
        "Authorization": AccessToken
      },withCredentials:true
    })
    .then((data) => {
      console.log(data,"데이터")
      dispatch(setPageCount(parseInt(data.data.Count.cnt)))
      dispatch(getMypageReview(data.data.Reviews))
    }).catch( async (err)=>{
      console.log(err)
      if(err.response.status === 401){
        await axios.get('https://server.bootview.info/auth/token',{withCredentials:true})
        .then( async (data)=>{
          dispatch(getAccessToken(data.headers.authorization))
          await axios.get(`https://server.bootview.info/auth/profile?p=1`,{
            headers:{
              "Authorization": data.headers.authorization
            },withCredentials:true
          }).then((data)=>{
            dispatch(setPageCount(parseInt(data.data.Count.cnt)))
            dispatch(getMypageReview(data.data.Reviews))
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