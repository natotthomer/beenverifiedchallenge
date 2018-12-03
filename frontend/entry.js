import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

document.addEventListener('DOMContentLoaded', handleBuild)

function handleBuild (e) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}