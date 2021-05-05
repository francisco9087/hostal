import React from 'react'
import '../css/menu.css'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiBed } from 'react-icons/bi'
import { MdRestaurant } from 'react-icons/md'
import { ImAddressBook } from 'react-icons/im'
import { IoMdPersonAdd } from 'react-icons/io'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const HostalMenu = () => {

  return (
    <div className="container-menu-hostal">

      <div className="container nivel1">
        <div className="row ">

          
          <div className="col-lg-2 caja1 offset-lg-3">

            <h4 className="text-center text-white mt-4">Hueped</h4>
           <Link to="/huesped"> <AiOutlineUsergroupAdd className="icon-huesped" size="6em" /></Link>
          </div>
          <div className="col-lg-2 caja2">
            <h4 className="text-center text-white mt-4">Habitaciones</h4>
            <Link to="/habitaciones"><BiBed className="icon-habitacion" /></Link>
          </div>
          <div className="col-lg-2 caja3">
            <h4 className="text-center text-white mt-4">Comedor</h4>
            <MdRestaurant className="icon-comedor" />
          </div>
        </div>
      </div>
      <div className="container nivel2">
        <div className="row">
          <div className="col-lg-2 caja4 offset-lg-3">
            <h4 className="text-center text-white mt-4">Reservas/OC</h4>
            <Link to="/reserva"> <ImAddressBook className="icon-reserva" /></Link>
          </div>
          <div className="col-lg-2 caja5" >
            <h4 className="text-center text-white mt-4">Registrar Empresa</h4>
            <Link to="/agregarEmpresa"><IoMdPersonAdd className="icon-addCliente" /></Link>
          </div>
          <div className="col-lg-2 caja6" >
            <h4 className="text-center text-white mt-4">Reportes</h4>
            <HiOutlineDocumentReport className="icon-reporte" />
          </div>
        </div>
      </div>


    </div>


  )
}

export default HostalMenu
