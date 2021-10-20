import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import InputModal from '../compnent/inputModal'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { getFirstReview } from '../redux/actions'
import { useEffect } from 'react'
import Loading from '../compnent/loading'
import { Route } from 'react-router-dom'
import HelpDesk from '../compnent/helpDesk'
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
const TargetPage = ({match}) => {
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
  let dispatch = useDispatch()
  let reviewArr = useSelector((state) => state.reviewReducer)
  let isLoading = useSelector((state)=> state.loadingReducer)
  let [test, setTest] = useState('')
  const backPage = () => {
    history.push('/')
  }

  // useEffect(()=>{
  // if(reviewArr.length <= 0){
  //   axios.get('https://server.bootview.info/comment/platform?code=pt1&page=1')
  //   .then((res)=>{
  //     if(res.data.length <= 0){
  //       console.log('첫번째로 후기를 남겨주세요!')
  //     }else{
  //       dispatch(getFirstReview(res.data))
  //     }
  //   })
  // }else{
  //   return 0;
  // }
  // },[])
  
  const getReview = () => {
    
  }

  console.log(reviewArr,"현재 리뷰")
  return (
    <>
    {isLoading? 
    <div className='loadingBox'>
      <div></div>
      <Loading />
      <div></div>
    </div>
    :
    <div className='boardPage container-xxl'>
      <div className='boardItem'>
        <div className='boardTop'>
          <div >
            <a href='/' className='backPage hover' onClick={backPage}><i className="bi bi-arrow-left-circle"></i> 뒤로 </a>
          </div>
          <div className='boardTop-center' style={{backgroundImage:`url(${eval(localStorage.target)})`}}><h3>후기</h3></div>
          <div >
            <a className='setting hover' onClick={()=>{alert('준비중인 기능입니다!')}}><i className="bi bi-gear"></i> 설정 </a>
          </div>
        </div>
        <h5 className='subtitle name'>{localStorage.target} </h5>
          <h4 className='subtitle'>후기를 남겨주세요!</h4>
          <InputModal />
          <ul className='boardList'>
            {
            reviewArr.Reviews.length <= 0? 
              <div className='empty-reviewBox'>
                <div></div>
                <div></div>
                <h4 className='empty-reviewBox-Item-top'> 아직 후기가 없어요</h4>
                <h5 className='empty-reviewBox-Item-center'></h5>
                <h2 className='emtpy-reviewBox-Item_center2'> 가장먼저 후기를 남겨주세요!</h2>
                <h5 className='empty-reviewBox-Item-bottom'></h5>
                <div></div>
                <div></div>
              </div>:
            reviewArr.Reviews.map((item) => {
              return <>
                <li>
                  <div>
                    <h5 className='title'>{item.title}</h5>
                    <h6 className='name'>{item.name}</h6>
                    <div className='content'>{item.content}</div>
                  </div>
                  <a className='more hover'>더보기</a>
                </li>
              </>
            })
          } 
          </ul>
          <a className='more hover'>더보기</a>
        </div>
      </div>
    }
    </>
  )
}


export default TargetPage