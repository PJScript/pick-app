import React from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
const TargetPage = () => {
  let tf = false
  let history = useHistory()
  
  const backPage = () => {
    history.push('/')
  }
  
  const inputForm = async () => {
    localStorage.inputReview = ''
    const alert = () => {
      Swal.fire({
        input: 'textarea',
        inputLabel: '후기 입력',
        inputValue:localStorage.inputReview,
        inputPlaceholder: 'Type your message here...',
        allowOutsideClick:false,
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      }).then((data) => {
        localStorage.inputReview = data.value
        if(data.isConfirmed === true){
          if(data.value.length <= 30){
            Swal.fire({
              text:'60글자 이상 써주세요'
            }).then((data) => {
              return alert()
            })
          }
        }
      })
    }
    
    alert()
    }
  
  return (
    <div className='boardPage'>
      <div className='boardItem'>
        <div className='boardTop'>
          <div >
            <a className='backPage hover' onClick={backPage}>뒤로가기</a>
          </div>
          <div><h2>후기</h2></div>
          <div >
            <a className='setting hover'>setting</a>
          </div>
        </div>
        <h3 className='subtitle name'>{localStorage.platformname} </h3>
        <h3 className='subtitle'>후기를 남겨주세요!</h3>
        <h4 className='comfirmBtn hover' onClick={inputForm}>작성하기</h4>
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
  )
}


export default TargetPage