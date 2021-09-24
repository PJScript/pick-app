import React from 'react'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'

const MainPage = () => {
  return (
    <div className='MainPage'>
      <div></div>
      <div>
        <div className='Main mainfirst'>
          <div className='MainSubTitle_container'>
            <div className='MainSubTitle_title'>
              <h4 style={{borderBottom:'2px solid skyblue'}}>All of coding infomation</h4>
              <h5>코딩<h3>부트캠프의</h3>모든 것 </h5>
              <h1>BootView</h1>
            </div>
          </div>
        </div>
        <div className='MainContent_container'>두번째 화면</div>
        <div className='MainSecondContent_container'>세번째 화면</div>
      </div>
      <div></div>

    </div>
  )
}

export default MainPage