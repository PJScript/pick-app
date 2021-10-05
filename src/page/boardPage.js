import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import InputModal from '../compnent/inputModal'
import codeStates from '/home/js/Desktop/BootReviewClient/src/images/logo/codestates.8a6777aa.png'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { getFirstReview } from '../redux/actions'
import { useEffect } from 'react'
import Loading from '../compnent/loading'
import { Route } from 'react-router-dom'


const TargetPage = ({match}) => {
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

  console.log(reviewArr,"현재 리뷰")
  return (
    <>
    {isLoading? 
    <Loading />:
    <div className='boardPage container-xxl'>
      <div className='boardItem'>
        <div className='boardTop'>
          <div >
            <a href='/' className='backPage hover' onClick={backPage}><i className="bi bi-arrow-left-circle"></i> 뒤로 </a>
          </div>
          <div className='boardTop-center' style={{backgroundImage:`url(${codeStates})`}}><h3>후기</h3></div>
          <div >
            <a className='setting hover'><i className="bi bi-gear"></i> 설정 </a>
          </div>
        </div>
        <h5 className='subtitle name'>{localStorage.target} </h5>
          <h4 className='subtitle'>후기를 남겨주세요!</h4>
          <InputModal />
          <ul className='boardList'>
            {
            reviewArr.length <= 0? 
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
            reviewArr.map((item) => {
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