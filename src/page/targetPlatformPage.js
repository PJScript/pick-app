import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../compnent/header'
import NavMenu from '../compnent/navMenu'
const TargetPlatformPage = () => {

  return (
    <div>
      <Header />
      <NavMenu /> 
      <div class="container-xxl">
        <div className="container-xxl-top line">
          <div className="container-xxl-top-left"></div>
          <div className="container-xxl-top-center"><h3>{localStorage.target}</h3></div>
          <div className="container-xxl-top-right"></div>
        </div>
        <div className="container-xxl-middle line">중간</div>
        <div className="container-xxl-bottom line">아래</div>
      </div>
    </div>
  )
}

export default TargetPlatformPage