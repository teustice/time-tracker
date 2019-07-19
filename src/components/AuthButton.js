import React from 'react'

import authUrl from '../lib/authUrl'


export default function AuthButton(props) {
  return (
    <div className='auth-button-wrapper'>
      <a className="btn_1" href={authUrl}>
          {props.text}
      </a>
    </div>
  )
}
