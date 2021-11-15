import React from 'react'
import codeStates from '/home/js/Desktop/BootReviewClient/src/images/logo/codestates.8a6777aa.png'
import vanillaCoding from '/home/js/Desktop/BootReviewClient/src/images/logo/vanilla.6fb47c65.png'
import spartaCoding from '/home/js/Desktop/BootReviewClient/src/images/logo/sparta.674d2d5f.svg'
import teamNova from '/home/js/Desktop/BootReviewClient/src/images/logo/nova.63025f61.png'
import weCode from '/home/js/Desktop/BootReviewClient/src/images/logo/wecode.bb864185.png'
import codeSquad from '/home/js/Desktop/BootReviewClient/src/images/logo/codeSquad.a9dc6480.png'
import algorithmJobs from '/home/js/Desktop/BootReviewClient/src/images/logo/algorithmJobs.0b962809.png'
import boostCamp from '/home/js/Desktop/BootReviewClient/src/images/logo/boostCamp.8a45bb6e.png'
import wooahan from  '/home/js/Desktop/BootReviewClient/src/images/logo/wooahan.dc8192f7.png'
import fastCampus from '/home/js/Desktop/BootReviewClient/src/images/logo/pastCampus.e7f6d2ff.png'
import seoul42 from '/home/js/Desktop/BootReviewClient/src/images/logo/seoul42.af087112.png'
import likeLion from '/home/js/Desktop/BootReviewClient/src/images/logo/likeLion.4f9e31ac.png'
import ssafy from '/home/js/Desktop/BootReviewClient/src/images/logo/ssafy.b44a5b85.png'
import { useHistory } from 'react-router'
const BoardImageMaker = () => {
  let 바닐라코딩 = vanillaCoding
  let 코드스테이츠 = codeStates
  let 스파르타코딩 = spartaCoding
  let 팀노바 = teamNova
  let 위코드 = weCode
  let 코드스쿼드 = codeSquad
  let 알고리즘잡스 = algorithmJobs
  let 부스트캠프 = boostCamp
  let 우아한테크 = wooahan
  let 패스트캠퍼스 = fastCampus
  let 서울42 = seoul42
  let 멋쟁이사자처럼 = likeLion
  let 삼성ssafy = ssafy
  let history = useHistory()
  const backPage = () => {
    history.goBack()
  }
  return (
    <div className='boardTop'>
    <div >
      <a href='#' className='backPage hover' onClick={backPage}><i className="bi bi-arrow-left-circle"></i> 뒤로 </a>
    </div>
    <div className='boardTop-center' style={{backgroundImage:`url(${eval(localStorage.target)})`}}><h3>후기</h3></div>
    <div >
      <a className='setting hover' onClick={()=>{alert('준비중인 기능입니다!')}}><i className="bi bi-gear"></i> 설정 </a>
    </div>
  </div>
  )
}

export default BoardImageMaker