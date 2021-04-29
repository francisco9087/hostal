import React from 'react'
import { Link } from 'react-router-dom'
import './sideBar.css'
import logoHostal from '../../assets/logo-hostal.png'
const Navbar = ({ show }) => {

  return (
    <div className={show ? 'sidenav active' : 'sidenav'} >
      <img src={logoHostal} className="logo mt-5" alt="" />
      <ul>
        <h3 className="text-white mt-5">Modulos</h3>
        <br />
        <li>
          <Link to="/" >Inicio</Link>
        </li>
        <li><Link to="/hostal">Hostal</Link>
        </li>
        <li>
          <Link to="/facturacion" >Facturacion</Link>
        </li>
        <li>
          <Link to="/contacto">Orden de venta</Link>
        </li>
        <li>
          <Link to="/mantenedor">Mantenedor</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
