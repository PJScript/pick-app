import React from 'react'

const navMenu = () => {
  return(
    <div>
      <nav className='NavMenu-wrapper'>
        <ul className='NavMenu-inner'>
          <li className='NavMenu-li hover'>About</li>
          <li className='NavMenu-li hover'>Review</li>
          <li className='NavMenu-li hover'>Team</li>
          <li className='NavMenu-li hover'>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default navMenu