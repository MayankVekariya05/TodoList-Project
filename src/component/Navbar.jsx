import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
     <div className="navbar">
        <span>iTask</span>
        <div className="home">
            <ul>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>
         </div> 
    </nav>
  )
}

export default Navbar
