import React from 'react'
import {imageSet1} from './images'

const RegularImageLoading = _ => {
  const imgs = imageSet1.map((url, idx) => (
    <div key={idx} className='image'>
      <img src={url + "?" + (new Date()).getTime()} className='image'/>
    </div>
  ))

  return (
    <div className='image-container'>
      {imgs}
    </div>
  )
}

export default RegularImageLoading
