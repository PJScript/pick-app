import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { useHistory } from 'react-router'
const BoardLink = () => {
  let history = useHistory()
  const targetPf = (e) => {
    (e.target.innerText)
    localStorage.platformname = e.target.innerText

    if(e.target.innerText === '준비중..'){
      (e.target.innerText)
      history.push('/')
    }
  }
  return (
    <div className="leftBox Box">
      <div className="linkContainer">
        <nav className='linkList'>
          <div className='platforms'></div>
          <div className='platforms'>
            <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
            </Link>
            <Link to='/board'>
            <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
            </Link>
            <Link to='/board'>
            <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
            </Link>
            <Link to='/board'>
            <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
            </Link>
          </div>
          <div className='platforms'>
          <Link to='/board'>
          <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
            </Link>
            <Link to='/board'>
              
            <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
            </div>
            <div className='platforms'>
            <Link to='/board'>
            <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
            </div>
            <div className='platforms'>
              <Link to='/board'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
              <Link to='/'>
              <img alt='코드스테이츠' src={require('/home/js/Desktop/BootReviewClient/src/images/png-clipart-github-android-google-play-githuboctocatlogo-logo-fictional-character.png').default}></img>
              </Link>
            </div>
            <div className='platforms'></div>
        </nav>
      </div>
    </div>
  )
}

export default BoardLink