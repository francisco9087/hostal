import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from "./components/navs/Navbar"
import { GiHamburgerMenu } from 'react-icons/gi'
import Habitaciones from './components/hostal/Habitaciones'
import Facturacion from './components/facturacion/Facturacion'
import AgregarCliente from './components/hostal/AgregarCliente'
import Hostal from './views/Hostal'
import Home from './views/Home'
import Mantenedor from './views/Mantenedor'
import AgregarUsuario from './views/AgregarUsuario'
import Login from './views/Login'
import Proveedor from './views/Proveedor'
import Admin from './views/Admin'
function App() {

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
    <>
      <Router>
        {/* <header style={headerStyle}>
          <GiHamburgerMenu style={svgStyle} onClick={() => setShowNav(!showNav)} />
          <Link to="/login" className="text-white float-end h1 " >Login</Link>
        </header> 

        <Navbar show={showNav} setShow={setShowNav} />  */}
        <Route path={'/login'} exact={true} component={Login} />
        <Route path="/hostal" exact={true} component={Hostal} />
        <Route path="/facturacion" exact={true} component={Facturacion} />
        <Route path="/mantenedor" exact={true} component={Mantenedor} />
        <Route path="/habitaciones" exact={true} component={Habitaciones} />
        <Route path="/agregar-cliente" exact={true} component={AgregarCliente} />
        <Route path="/agregar-usuario" exact={true} component={AgregarUsuario} />
        <Route path="/proveedor" exact={true} component={Proveedor} />
        <Route path="/admin" exact={true} component={Admin} />
      </Router>

    </>
  );
}

export default App;
