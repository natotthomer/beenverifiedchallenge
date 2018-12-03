import React from 'react'
import history from './history'
import { Router, Route } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './components/HomePage'
import TopPage from './components/TopPage'

const App = props => {
  return (
    <div>
      <div className='main'>
        <Router history={history}>
          <React.Fragment>
            <Header />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/pages/top' component={TopPage} />
          </React.Fragment>
        </Router>
      </div>
    </div>
  )
}

export default App