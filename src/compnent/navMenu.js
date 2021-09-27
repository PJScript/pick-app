import React from 'react'
import { Route, Link, Switch } from "react-router-dom";

const navMenu = () => {
  const targetPlatform = (e) => {
    console.log(e)
    localStorage.target = e.target.innerText
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/">
                <div class="nav-link active" aria-current="page">Home</div>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/">
                <div class="nav-link active">Why BootView</div>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">후기</a>
            </li>
            <li class="nav-item dropdown">
              <div class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                부트캠프 목록
              </div>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>코드스테이츠</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>바닐라 코딩</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>스파르타 코딩</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>팀 노바</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>위 코드</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>코드 스쿼드</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>알고리즘 잡스</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>부스트 캠프</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>우아한 테크</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>패스트 캠퍼스</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>서울42</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>멋쟁이 사자처럼</div></li></Link>
                <Link to="/board"><li><div class="dropdown-item" href="/board" onClick={targetPlatform}>삼성 ssafy</div></li></Link>   
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                게시판
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="/board" onClick={targetPlatform}>익명</a></li>
                <li><a class="dropdown-item" href="/board" onClick={targetPlatform}>프론트 엔드</a></li>
                <li><a class="dropdown-item" href="/board" onClick={targetPlatform}>백엔드</a></li>
                <li><a class="dropdown-item" href="/board" onClick={targetPlatform}>자유 게시판</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">고객센터</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navMenu