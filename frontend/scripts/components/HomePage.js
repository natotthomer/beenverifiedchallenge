import React from 'react'

import fetcher from '../fetcher'
import { getLocation } from '../utils'

export default class HomePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      long_url: '',
      short_url: ''
    }

    this.handleURLChange = this.handleURLChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderShortLink = this.renderShortLink.bind(this)
  }

  handleURLChange (e) {
    e.preventDefault()

    this.setState({ long_url: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    fetcher({
      url: `/api/links/?link[long_url]=${this.state.long_url}`, 
      method: 'POST' 
    }).then(response => {
      const { short_url } = response
      this.setState({ long_url: '', short_url })
    })
  }
  
  renderShortLink () {
    if (this.state.short_url.length > 0) {
      return (
        <div className="short-link">
          <span>Your new shortlink is: {getLocation() + this.state.short_url}</span>
          <span className="click-to-copy" 
            onClick={this.handleClickToCopy}>
            click here to copy to clipboard
          </span>
        </div>
      )
      
    }
    return null
  }
  
  render () {

    
    return (
      <div className="content-container">
        <span className="content-title">Generate shortURLs!</span>
        <div className='url-form-container'>
          <div className="url-form">
            <form onSubmit={this.handleSubmit}>
              <input 
                type='text' 
                value={this.state.long_url} 
                onChange={this.handleURLChange}
                placeholder={'Enter a URL to shorten'} />
              <button type="submit">Submit</button>
            </form>
          </div>
        {this.renderShortLink()}
        </div>
      </div>
    )
  }
}