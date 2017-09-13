import React, { Component } from 'react'
import images from './images'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingSpinner from '../loading_spinner'

export default class ImagesWithComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  images() {
    const imgs = images.map((url, idx) => (
      <div key={idx} className='image'>
        <img src={url + "?" + (new Date()).getTime()} className='image'/>
      </div>
    ))
    return (
      <div className={this.state.loaded ? 'hidden-false' : 'hidden-true'}>
        {imgs}
      </div>
    )
  }

  onLoadedHandler() {
    this.setState({loaded: true})
  }

  handleTimeout(){
    this.props.showError()
    alert("hit timeout. this is the onTimeout function being run and is mounting normally now")
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => this.onLoadedHandler()}
        onTimeout={() => this.handleTimeout()}
        delay={100}
        >
        {this.state.loaded ? null : <LoadingSpinner/>}
        {this.images()}
      </OnImagesLoaded>
    )
  }
}
