import React from 'react'
import '../css/header.css'

export default function Header() {
  return (
    <div id='header-body'>
      <div id='header-left'>
        <div id='logo'>100mlwater</div>
      </div>
      <div id='header-right'>
        <div className='header-menu'>Stacks</div>
        <div className='header-menu'>Project</div>
        <div className='header-menu'>Study</div>
      </div>
    </div>
  )
}
