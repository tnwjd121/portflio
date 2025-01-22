import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import "../css/footer.css"

export default function Footer() {
  return (
    <div id='footer-body'>
      <div id='icon-list'>
        <div><MdOutlineMail /></div>
        <div><BsGithub /></div>
        <div><FaInstagram /></div>
      </div>
      <div id='footer-text'>
        <p>© 2025 baek sujung. All rights reserved.</p>
        <p>Thank you for visiting my portfolio!</p>
      </div>
    </div>
  )
}
