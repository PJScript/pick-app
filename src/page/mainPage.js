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
              <h4 style={{borderBottom:'2px solid skyblue'}}>All of Review infomation</h4>
              <h5>솔직한</h5><h3>익명후기</h3>
              <h1>BootView</h1>
            </div>
          </div>
        </div>
        <div className='MainContent_container'></div>
        {/* <div className='MainSecondContent_container'>세번째 화면</div> */}
      </div>
      <div></div>

    </div>
  )
}

export default MainPage