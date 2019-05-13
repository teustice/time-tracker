import React from 'react'

export default function AuthButton(props) {
  return (
    <div className='auth-button-wrapper'>
      <a className="btn_1" href="https://my.freshbooks.com/service/auth/oauth/authorize?client_id=8c72f5154be8eb27e1e4ae05313afdb4990e75c94de95901dc677853b2b16a9b&response_type=code&redirect_uri=https://localhost:3000/auth">
          {props.text}
      </a>
    </div>
  )
}
