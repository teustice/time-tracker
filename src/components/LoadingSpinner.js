import React from 'react'
import Loader from 'react-loader-spinner'

export default function LoadingSpinner(props) {
  return (
    <div className='loading-wrapper'>
      <Loader
        type="Triangle"
        color="#000"
        height="50"
        width="50"
        />
      <p>{props.text ? props.text : 'Loading'}</p>
    </div>
  )
}
