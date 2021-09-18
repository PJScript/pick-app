import React from 'react'

const Header = () => {
  return (
    <header className='MainTitle_container'>
    <div className='MainTitle_title'>
      <div className='MainTitle_left'>
        <h4 className='hover'><a href='/'>뒤로가기</a></h4>
      </div>
      <div className='MainTitle_center'>
        <h3 className='MainTitle_text'><a href='/'>BootView</a></h3>
      </div>
      <div className='MainTitle_right'>
        <h4 className="loginBtn hover"> <a href='/login'>login</a></h4>
        <h4 className="hamberger hover">메뉴</h4>
      </div>
    </div>
  </header>
  )
}

export default Header