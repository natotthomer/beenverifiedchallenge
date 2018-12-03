import React from 'react'
import history from '../history'
import { Link } from 'react-router-dom'

const Header = props => {

  
  return (
    <div className='header'>
      <Link to='/'>shortURL</Link>
    </div>
  )
}

export default Header