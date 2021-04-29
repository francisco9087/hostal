import React, { useState } from 'react'
import MantenedorMenu from '../components/mantenedor/MantenedorMenu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { GiHamburgerMenu } from 'react-icons/gi'
import Navbar from '../components/navs/Navbar'
const Mantenedor = () => {

  const [showNav, setShowNav] = useState(true)

  const headerStyle = {
    padding: "20px",
    background: "#011627",
    height: "70px",
    color: "white"
  }

  const svgStyle = {
    fontSize: "30px",
    cursor: "pointer",
    marginLeft: "25px"
  }
  return (
    <div>
      <header style={headerStyle}>
          <GiHamburgerMenu style={svgStyle} onClick={() => setShowNav(!showNav)} />
          <Link to="/login" className="text-white float-end h1 " >Login</Link>
        </header> 

        <Navbar show={showNav} setShow={setShowNav} /> 
     <MantenedorMenu/>
    </div>
  )
}

export default Mantenedor
