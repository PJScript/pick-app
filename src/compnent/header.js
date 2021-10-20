import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAccessToken, getMypageReview, loginState, setPageCount, getName } from '../redux/actions'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
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
  const guestLogin = async () =>{
    await axios.post('https://server.bootview.info/auth/login',{account:'guest@guest',pw:'guest@123'},{ withCredentials : true }).then((data)=>{
      dispatch(getAccessToken(data.headers.authorization))
      dispatch(loginState(true))
      dispatch(getName('guest@guest'))
      // dispatch(getName(data))
      if(history.location.pathname == '/login'){  // 로그인 페이지 연속으로 클릭시 이전 경로가 /login 으로나와서 로그인 페이지만 뜨는 오류 방지  
        history.push('/')
      }else{   // 이전페이지가 /login이 아니라면 이전페이지로 이동
        alert('게스트로 로그인 되었습니다.')
        history.go(history.location.pathname)
      }
    }).catch(async (err)=>{
      await Swal.fire({
        icon: 'warning',
        title: '아이디 혹은 비밀번호 오류',
        text: '아이디 혹은 비밀번호가 올바르지 않습니다. 다시한번 확인해주세요'
      })
    })
  }
  return (
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid" style={{display:'flex'}}>
      <div></div>
      <Link to='/'>
      <div className="navbar-brand">
        <img src={require('/home/js/Desktop/BootReviewClient/src/images/icons8-magnifying-glass-64.png').default} alt="" width="30" height="24" className="d-inline-block align-text-top"></img>
        BootView
      </div>
      </Link>
      <div className='topSettingBox'>
        <div className='welcomeMsg'>{LoginState? <><Link to='/mypage'><span onClick={getFirstReviews}>{Email}</span></Link><span>님 환영합니다</span></>: ``}</div>
        <div className='loginBtn A hover' onClick={guestLogin}>{LoginState? '': '게스트 로그인'}</div>
        <div className='loginBtn A hover' onClick={logoutBtn}>
          <div><i className="bi bi-door-open"></i>{LoginState? '로그아웃':'로그인'}</div>
        </div>
        <div className='darkMode'>
          <i className="bi bi-palette-fill hover" onClick={()=>{alert('준비중입니다.')}}> 다크모드 </i>
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