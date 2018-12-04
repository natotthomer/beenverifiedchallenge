import React from 'react'
import { Link } from 'react-router-dom'

import fetcher from '../fetcher'
import { getLocation, validateURL } from '../utils'

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
    this.handleClickToCopy = this.handleClickToCopy.bind(this)
    this.renderErrors = this.renderErrors.bind(this)
  }

  handleURLChange (e) {
    e.preventDefault()
    
    this.setState({ long_url: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    const long_url = validateURL(this.state.long_url)

    if (long_url) {
      fetcher({
        url: `/api/links/?link[long_url]=${this.state.long_url}`, 
        method: 'POST' 
      }).then(response => {
        const { short_url } = response
        this.setState({ long_url: '', short_url, urlError: false })
      })
    } else {
      this.setState({ urlError: true, short_url: '' })
    }
  }

  handleClickToCopy (e) {
    this.textarea.select()
    document.execCommand('copy')
  }
  
  renderShortLink () {
    if (this.state.short_url.length > 0) {
      const fullURL = getLocation() + this.state.short_url
      return (
        <div className="short-link">
          <span>Your new shortlink is: {fullURL}</span>
          <span className="click-to-copy" id="click-to-copy"
            onClick={this.handleClickToCopy}>
            click here to copy to clipboard
          </span>
          <textarea 
            readOnly 
            value={fullURL} 
            ref={textarea => {this.textarea = textarea}}
            className="hidden-input" />
        </div>
      )
    }
    return null
  }

  renderErrors () {
    if (this.state.urlError) {
      return (
        <div className="url-error">It seems there's a problem with the URL you've provided; please correct any mistakes and try again.</div>
      )
    }
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
          {this.renderErrors()}
          <div className="link-to-top">
            <Link to='/pages/top'>Check out the most popular shortURLs</Link>
          </div>
        </div>
      </div>
    )
  }
}