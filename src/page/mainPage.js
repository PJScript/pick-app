import React from 'react'
import BoardLink from '../compnent/boardLink'
import NavMenu from '../compnent/navMenu'

const MainPage = () => {

  return (
    <div className='MainPage'>
      <div></div>
      <div>
        <div className='Main mainfirst'>
          <div className='MainSubTitle_container'>
            <div className='MainSubTitle_title'>
              <h2 style={{borderBottom:'2px solid skyblue'}}>All of coding infomation</h2>
              <h3>코딩<h2>부트캠프의</h2>모든 것 </h3>
              <h1>BootView 에서</h1>
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