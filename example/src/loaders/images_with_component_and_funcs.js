import React from 'react'
import images from './images'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingSpinner from '../loading_spinner'

const ImagesWithComponentAndFuncs = props => {

  const imgs = images.map((url, idx) => (
    <div key={idx} className='image'>
      <img src={url + "?" + (new Date()).getTime()} className='image'/>
    </div>
  ))

  const handleTimeout = () => {
    props.showError()
    alert("hit timeout. running onTimeout function and mounting normally now")
  }

  return (
    <OnImagesLoaded
      classNameOnMount='hidden-true'
      classNameOnLoaded='hidden-false'
      placeholder={<LoadingSpinner/>}
      onWillMount={() => alert('access to componentWillMount')}
      onLoaded={() => alert('function call after images loaded')}
      onDidMount={() => alert('access to componentDidMount')}
      onTimeout={handleTimeout}
      >
        <div className='image-container'>
          {imgs}
        </div>
      </OnImagesLoaded>
    )
}

export default ImagesWithComponentAndFuncs
