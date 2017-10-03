import React from 'react'
import {imageSet1} from './images'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingSpinner from '../loading_spinner'

const DepreciatedTest = props => {
  const imgs = imageSet1.map((url, idx) => (
    <div key={idx} className='image'>
      <img src={url + "?" + (new Date()).getTime()} className='image'/>
    </div>
  ))

  return (
    <OnImagesLoaded
      classNameOnMount='hidden-true'
      classNameOnLoaded='hidden-false'
      placeholder={<LoadingSpinner/>}
      delay={500}
      onTimeout={props.showError}
      >
        <div className='image-container'>
          {imgs}
        </div>
    </OnImagesLoaded>
  )
}

export default DepreciatedTest
