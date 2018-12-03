import React from 'react'
import history from './history'
import { Router, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import TopPage from './components/TopPage'

const App = props => {
  return (
    <div>
      <Router history={history}>
        <React.Fragment>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/pages/top' component={TopPage} />
        </React.Fragment>
      </Router>
    </div>
  )
}

export default App