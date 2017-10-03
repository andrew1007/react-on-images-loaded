import React, { Component } from 'react'
import {imageSet1, imageSet2} from './images'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingSpinner from '../loading_spinner'

export default class ImagesWithComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      images: [],
      addMore: false
    }
  }

  componentWillMount() {
    this.setState({images: imageSet1})
  }

  images() {
    const imgs = this.state.images.map((url, idx) => (
      <div key={idx} className='image'>
        <img src={url + "?" + new Date().getTime()} className='image'/>
      </div>
    ))
    return (
      <div className={this.state.loaded ? 'hidden-false' : 'hidden-true'}>
        {imgs}
      </div>
    )
  }

  images2() {
    const imgs = imageSet2.map((url, idx) => (
      <div key={idx} className='image'>
        <img src={url + "?" + new Date().getTime()} className='image'/>
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
    this.setState({loaded: true})
  }

  addImages() {
    this.setState({loaded: false}, () => {
      this.setState({images: [...this.state.images, ...imageSet2]})
    })
  }

  render() {
    return (
      <div>
        <OnImagesLoaded
          onLoaded={() => this.onLoadedHandler()}
          onTimeout={() => this.handleTimeout()}
          timeout={70000}
          watch={true}
          >
          {this.state.loaded ? null : <LoadingSpinner/>}
          {this.images()}
        </OnImagesLoaded>
        <button onClick={() => this.addImages()}>
          Add more images to component
        </button>
      </div>
    )
  }
}
