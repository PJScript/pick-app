import React from 'react'

const errorPage = () => {
    return (
      <div className="errorPage-Wrapper">
        <div className="container-xxl error">
          <div></div>
          <div>
            <div className="errorPageMsg-top">
              <h2 className='errorPageMsg-item top'>에러가 발생했습니다.</h2>
              <h2 className='errorPageMsg-item center'>불편을드려 죄송합니다.</h2>
              <h2 className='errorPageMsg-item bottom'>브라우저를 종료한 후 다시 접속해주세요.</h2>
            </div>
            <h6>이용에 불편을 드려 죄송합니다.</h6> 
          </div>
          <div></div>
        </div>
      </div>
    )
  }


export default errorPage