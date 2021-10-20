import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import mainPage from '../src/page/mainPage'
import myPage from '../src/page/myPage'
import boardPage from './page/boardPage'
import loginPage from './page/loginPage';
import NavMenu from './compnent/navMenu';
import Header from './compnent/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import helpPage from './page/helpPage'
import targetPlatformPage from './page/targetPlatformPage';
import { useSelector } from 'react-redux'
import InfoPage from './page/infoPage';
import adminPage from './page/adminPage';
import HelpDesk from './compnent/helpDesk';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <NavMenu />
        <div>
          <Switch>
            <Route exact path='/' component={mainPage} />
            <Route exact path='/mypage' component={myPage} />
            <Route path='/board/:id' component={boardPage} />
            <Route path='/login' component={loginPage} />
            <Route path='/help' component={helpPage} />
            <Route path='/info' component={InfoPage} />
            <Route path='/admin' component={adminPage} />
          </Switch>
        </div>
      </Router>
        <HelpDesk />
      <footer>
        <div className='footeritem'>
          <span className='footertitle'>Github</span>
          <a href="https://github.com/kilo718" className='footervalue'>kilo718@github.com</a>
        </div>
        <div className='footeritem'>
          <span className='footertitle'>Contact</span>
          <div className='footervalue'>010-1234-5678</div>
        </div>
        <div className='footeritem'>
          <span className='footertitle'>Cooperation</span>
          <div className='footervalue'>010-1111-2222</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
