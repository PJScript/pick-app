import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import mainPage from '../src/page/mainPage'
import myPage from '../src/page/mainPage'
import boardPage from './page/boardPage'
import loginPage from './page/loginPage';
import NavMenu from './compnent/navMenu';
import Header from './compnent/header'

function App() {

  return (
    <div className="App">
      <Header />
      <NavMenu /> 
      <Router>
        <div>
          <Switch>
              <Route exact path='/' component={mainPage} />
              <Route path='/mypage' component={myPage} />
              <Route path='/board' component={boardPage} />
              <Route path='/login' component={loginPage} />
            </Switch>
          </div>
      </Router>
      <footer>
        <div className='footeritem'>
          <span className='footertitle'>Github</span>
          <a className='footervalue'>kilo718@github.com</a>
        </div>
        <div className='footeritem'>
          <span  className='footertitle'>Contact</span>
          <a className='footervalue'>010-1234-5678</a>
        </div>
        <div className='footeritem'>
          <span className='footertitle'>Cooperation</span>
          <a className='footervalue'>010-1111-2222</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
