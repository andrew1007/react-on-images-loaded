import React from 'react'

const ShowCss = _ => (
  <div className='css-container'>
    <div className='css-subcontainer'>
    <h2 className='css-header'>
      hidden to visible transition
    </h2>
    <pre><code>{`.hidden, .hidden-true, .hidden-false {
  animation-timing-function: cubic-bezier(0.1, 0.8, 0.1, 1);
  transition: opacity 500ms ease-in-out;
}

.hidden-true {
  opacity: 0;
}

.hidden-false {
  opacity: 1;
}`}</code></pre>
  <h2 className='css-header'>
    loading spinner
  </h2>
  <pre><code>{`.board-loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  position: relative;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`}</code></pre>
  </div>
</div>
)

export default ShowCss
