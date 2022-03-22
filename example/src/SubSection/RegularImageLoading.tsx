import React from 'react';
import images from './images';

const RegularImageLoading = () => {
  const imgs = images.map((url, idx) => (
    <div key={idx} className='image'>
      <img src={url + '?' + (new Date()).getTime()} className='image'/>
    </div>
  ));

  return (
    <div className='image-container'>
      {imgs}
    </div>
  );
};

export default RegularImageLoading;
