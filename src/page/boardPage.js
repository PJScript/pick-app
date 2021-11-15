import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
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
import BoardImageMaker from '../compnent/boardImageMaker'
import { getAccessToken,resetReview, loginState, getName } from '../redux/actions'

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
  // let pageCnt = useSelector((state)=>state.reviewReducer.PageCnt[0].cnt)
  let [test, setTest] = useState('')
  let idx = 0

  let LoginState = useSelector((state) => state.authReducer.LoginState)
  let AccessToken = useSelector((state) => state.authReducer.AccessToken)
  let ReviewPageCnt = useSelector((state) => state.reviewReducer.PageCnt)


  // useEffect(()=>{
  // if(reviewArr.length <= 0){
  //   axios.get('http://localhost:4000/comment/platform?code=pt1&page=1')
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
          await axios.post('http://localhost:4000/auth/login', { account: 'guest@guest', pw: 'guest@123' }, { withCredentials: true })
          .then((data) => {
            dispatch(getAccessToken(data.headers.authorization))
            dispatch(loginState(true))
            dispatch(getName('guest@guest'))
            // dispatch(getName(data))
            if (history.location.pathname === '/login') {  // 로그인 페이지 연속으로 클릭시 이전 경로가 /login 으로나와서 로그인 페이지만 뜨는 오류 방지  
              history.go('/')
            } else {   // 이전페이지가 /login이 아니라면 이전페이지로 이동
              alert('게스트로 로그인 되었습니다.')
              history.push(`/write/${window.location.pathname.split('/')[2]}`)
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
      history.push(`/write/${window.location.pathname.split('/')[2]}`)
    }
  }

  const clickReview = (e) => {
    localStorage.no_ = Number(e.nativeEvent.path[2].childNodes[0].childNodes[0].innerText.split(':')[1])
    console.log(e.nativeEvent.path[2].childNodes[0].childNodes[0].innerText.split(':')[1])
    history.push(`/board/view/${window.location.pathname.split('/')[2]}`)
    console.log(window.location.pathname,"위치 @")
  }
  
  const reviewListMaker = () =>{
    
  }
  console.log(reviewArr,"현재 리뷰")
  console.log(window.location.pathname.split('/')[2],"현재 위치")
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
        <BoardImageMaker />
        <h5 className='subtitle name'>{localStorage.target} </h5>
          <h4 className='subtitle'>후기를 남겨주세요!</h4>
          {/* <Link to={`/write/${window.location.pathname.split('/')[2]}`}>  * 이전 url 추출 후 매칭* */}
          <h5 type="button" className="btn btn-primary" onClick={writeBtn}>작성하기</h5>
          {/* </Link> */}

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
                  </div> :
                  reviewArr.Reviews.map((item) => {
                    ReviewPageCnt = ReviewPageCnt - 1
                    return <>
                      <li className='reviewBox'>
                        <div className='reviewBox-inner'>
                          <div className='no'>no_ :<span>{ReviewPageCnt + 1}</span></div>
                          <h5 className='title'>{item.title}</h5>
                          <div className='name'>{item.name}</div>
                          <div className='content' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        </div>
                        <div>
                        <a className='more hover' onClick={clickReview}>댓글&더보기</a>
                        </div>
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