import React from 'react'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'
import { Link } from 'react-router-dom'
const MainPage = () => {

  return (
    <div className='MainPage'>
      <div></div>
      <div>
        <div className='Main mainfirst'>
          <div className='MainSubTitle_container'>
            <div className='MainSubTitle_title'>
              <h4 style={{borderBottom:'2px solid skyblue'}}>부트 캠프를 선택 할 때</h4>
              <div>with</div><h1>BootView</h1> 
              <div>수많은 부트캠프</div>
              <div>어떤 부트캠프를 선택할지 고민되시나요?</div>  
              <div>BootView에서 지금 바로 알아보세요 !</div>     
              <div>
                <Link to='/info'>
                <h5 className='btn btn-primary'>알아보기</h5>
                </Link>

              </div>      
            </div>
          </div>
        </div>
        <div className='Main_BlankContent_container_Style1'>
          <div>

          </div>
          </div>
        <div className='MainContent_container'>
          <div className='FirstText'>
          <div><h4 style={{color:'darkblue'}}>왜 BootView 인가요?</h4></div>
          <div>
            <div><h3>익명성</h3></div>
            <div>BootView 에서는 <span style={{color:'red', fontWeight:'bold'}}>민감한 개인정보</span>를 요구하지 않습니다.</div>
          </div>
          <div>
            <div>이름, 성별, 이메일 <span style={{color:'green',fontWeight:'bold'}}>최소한의 정보</span>만 요구합니다.</div>
          </div>
          <div>
            <div><h4>성별을 비공개 하고 싶다면?</h4></div>
            <div><span style={{fontWeight:'bold'}}>성별 또한</span> 기타를 선택해 <span style={{color:'green', fontWeight:'bold'}}>비공개</span> 할 수 있습니다.</div>
          </div>
          </div>
        </div>
        <div className='Main_BlankContent_container_Style1'>
          <div>

          </div>
        </div>
        <div className='Main_BlankContent_container_Style2'>
          <div>

          </div>
        </div>
        <div className='MainSecondContent_container'>   {/**second viewport */}
            <div className='SecondText'>
              <div>
                <div><h3>솔직함</h3></div>
                <div>기존의 가식적이고 <span style={{color:'red',fontWeight:'bold'}}>광고성 짙은</span> <span style={{fontWeight:'bold'}}>후기는 찾아볼 수 없습니다.</span></div>
                <div>익명성을 기반으로한 <span style={{color:'green',fontWeight:'bold'}}>솔직한 후기</span> <span style={{fontWeight:'bold'}}>를 제공합니다.</span></div>
              </div>
            </div>
          </div>
        <div className='Main_BlankContent_container_Style2'>
          <div>

          </div>
        </div>
        <div className='Main_BlankContent_container_Style1'>
          <div>

          </div>
        </div>
        <div className='MainThirdContent_container'>
          <div>
            <div className='FirstText'>
              <div>
                <div><h3>편리한 글쓰기</h3></div>
                <div>에디터를 통해 보다 <span style={{color:'green', fontWeight:'bold'}}>편리한 글쓰기</span>가 가능합니다.</div>
              </div>
              <div>
                <div><h3>이미지 업로드</h3></div>
                <div>생동감 있는 후기를 위한 <span style={{color:'green',fontWeight:'bold'}}>이미지 업로드</span> 기능이 준비되어 있습니다.</div>
              </div>
            </div>
          </div>
        </div>
        <div className='Main_BlankContent_container_Style1'>
          <div>

          </div>
        </div>
        <div className='Main_BlankContent_container_Style2'>
          <div className='LastViewTextBox'>
            <h3>아직 후기가 없어요!</h3>
            <h4>가장 먼저 후기를 작성해주세요 !</h4>
            <Link to='/info'>
                <h5 className='btn btn-primary'>후기 쓰러 가기</h5>
            </Link>
          </div>
        </div>
        <div className='MainQuadContent_container'>    
        <div className='LastText'>
          <h2>Thank You</h2>
        </div>
        </div>
        <div className='Main_BlankContent_container_Style2'>
          <div>

          </div>
        </div>
        {/* <div className='MainSecondContent_container'>세번째 화면</div> */}
      </div>
      <div></div>

    </div>
  )
}

export default MainPage