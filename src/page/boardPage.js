import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import InputModal from '../compnent/inputModal'
import codeStates from '/home/js/Desktop/BootReviewClient/src/images/logo/codestates.8a6777aa.png'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'
const TargetPage = () => {
  let history = useHistory()
  let [test, setTest] = useState('')

  const backPage = () => {
    history.push('/')
  }
 



  return (
    <>
    <div className='boardPage container-xxl'>
      <div className='boardItem'>
        <div className='boardTop'>
          <div >
            <a href='/' className='backPage hover' onClick={backPage}><i class="bi bi-arrow-left-circle"></i> 뒤로 </a>
          </div>
          <div className='boardTop-center' style={{backgroundImage:`url(${codeStates})`}}><h3>후기</h3></div>
          <div >
            <a className='setting hover'><i class="bi bi-gear"></i> 설정 </a>
          </div>
        </div>

        <h5 className='subtitle name'>{localStorage.target} </h5>
        <h4 className='subtitle'>후기를 남겨주세요!</h4>
          <InputModal />
        <ul className='boardList'>
          <li>
            <div>
              <h3 className='title'>제목</h3>
              <div className='content'>내용</div>
            </div>
            <a className='more hover'>더보기</a>
          </li>
          <li>
            <div>
              <h3 className='title'>제목</h3>
              <div className='content'>내용</div>
            </div>
            <a className='more hover'>더보기</a>
          </li>
          <li>
            <div>
              <h3 className='title'>제목</h3>
              <div className='content'>내용</div>
            </div>
            <a className='more hover'>더보기</a>
          </li>
          <li>
            <div>
              <h3 className='title'>제목</h3>
              <div className='content'>내용</div>
            </div>
            <a className='more hover'>더보기</a>
          </li>
          <li>
            <div>
              <h3 className='title'>제목</h3>
              <div className='content'>내용</div>
            </div>
            <a className='more hover'>더보기</a>
          </li>
        </ul>
        <a className='more hover'>더보기</a>
      </div>
    </div>
  </>
  )
}


export default TargetPage