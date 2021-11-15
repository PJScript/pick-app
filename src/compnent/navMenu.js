import React, { useEffect, useState } from 'react'
import { Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getFirstReview, getTarget, isLoading, resetReview, setPageCount } from '../redux/actions';
import axios from 'axios';
import { useHistory } from 'react-router';
import codeParser from '../compnent/codeParser'
const NavMenu = () => {
  let dispatch = useDispatch()
  let history = useHistory()
  let reviewArr = useSelector((state) => state.reviewReducer)


  const targetPlatform = async (e) => {
    let code = codeParser(e.target.innerText)
    

    // dispatch(getTarget(target))

    localStorage.target = e.target.innerText
      await axios.get(`http://localhost:4000/review/platform?code=${code}&page=1`,{withCredentials:true})
        .then((res) => {
          console.log(res,"받아온 데이터")
          dispatch(resetReview())
          for(let i=9; i<=1; i--){
            console.log('하이하이')
            res.data.reviewList[i].no = i
          }
          dispatch(getFirstReview(res.data.reviewList))
          dispatch(setPageCount(res.data.reviewPageCnt[0].cnt))
          dispatch(isLoading(false))
  })
}
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand" href="/"></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-flexBox" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">
                <div className="nav-link active" aria-current="page">Home</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/info">
                <div className="nav-link active">info</div>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                게시판
              </div>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/board/pt1"><li><div className="dropdown-item"  onClick={targetPlatform}>코드스테이츠</div></li></Link>
                <Link to="/board/pt2"><li><div className="dropdown-item"  onClick={targetPlatform}>바닐라코딩</div></li></Link>
                <Link to="/board/pt3"><li><div className="dropdown-item"  onClick={targetPlatform}>스파르타코딩</div></li></Link>
                <Link to="/board/pt4"><li><div className="dropdown-item"  onClick={targetPlatform}>팀노바</div></li></Link>
                <Link to="/board/pt5"><li><div className="dropdown-item"  onClick={targetPlatform}>위코드</div></li></Link>
                <Link to="/board/pt6"><li><div className="dropdown-item"  onClick={targetPlatform}>코드스쿼드</div></li></Link>
                <Link to="/board/pt7"><li><div className="dropdown-item"  onClick={targetPlatform}>알고리즘잡스</div></li></Link>
                <Link to="/board/pt8"><li><div className="dropdown-item"  onClick={targetPlatform}>부스트캠프</div></li></Link>
                <Link to="/board/pt9"><li><div className="dropdown-item"  onClick={targetPlatform}>우아한테크</div></li></Link>
                <Link to="/board/pt10"><li><div className="dropdown-item"  onClick={targetPlatform}>패스트캠퍼스</div></li></Link>
                <Link to="/board/pt11"><li><div className="dropdown-item"  onClick={targetPlatform}>서울42</div></li></Link>
                <Link to="/board/pt12"><li><div className="dropdown-item"  onClick={targetPlatform}>멋쟁이사자처럼</div></li></Link>
                <Link to="/board/pt13"><li><div className="dropdown-item"  onClick={targetPlatform}>삼성ssafy</div></li></Link>  
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/help">고객센터</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="button" onClick={()=>alert('준비중입니다..')}>Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavMenu