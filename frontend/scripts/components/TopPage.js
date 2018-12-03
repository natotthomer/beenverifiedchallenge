import React from 'react'

import fetcher from '../fetcher'

import { getLocation } from '../utils'

export default class TopPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      urls: []
    }
  }
  
  componentDidMount () {
    fetcher({ url: '/api/top' }).then(response => this.setState({ urls: response }))
  }
  
  render () {
    const urls = this.state.urls.map((url, idx) => {
      const full_url = getLocation() + url.short_url
      return <div key={idx}>{idx + 1} - {url.title} - <a target="_blank" href={full_url}>{full_url}</a></div>
    })
    
    return (
      <div className='content-container'>
        <span className='content-title'>All Time Most Popular Links</span>
        {urls}
      </div>
    )
  }
}
