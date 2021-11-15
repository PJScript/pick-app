import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MainPage from '../src/page/mainPage'
import MyPage from '../src/page/myPage'
import BoardPage from './page/boardPage'
import LoginPage from './page/loginPage';
import NavMenu from './compnent/navMenu';
import Header from './compnent/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import HelpPage from './page/helpPage'
import targetPlatformPage from './page/targetPlatformPage';
import { useSelector } from 'react-redux'
import InfoPage from './page/infoPage';
import AdminPage from './page/adminPage';
import HelpDesk from './compnent/helpDesk';
import ErrorPage from './page/errorPage';
import InputForm from './compnent/inputForm';
import DetailBoardPage from './page/detailBoard';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <NavMenu />
        <div>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/mypage' component={MyPage} />
            <Route exact path='/board/:id' component={BoardPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/help' component={HelpPage} />
            <Route path='/info' component={InfoPage} />
            <Route path='/admin' component={AdminPage} />
            <Route path='/error' component={ErrorPage} />
            <Route path='/write/:id' component={InputForm} />
            <Route path='/board/view/:id' component={DetailBoardPage} />
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
