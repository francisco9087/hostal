import React from 'react'
import './contacto.css'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiBed } from 'react-icons/bi'
import { MdRestaurant } from 'react-icons/md'
import { ImAddressBook } from 'react-icons/im'
import { IoMdPersonAdd } from 'react-icons/io'
import { HiOutlineDocumentReport } from 'react-icons/hi'

const Contacto = () => {
  return (
    <div className="container-principal">

      <h1>Contacto</h1>
      <div className="container nivel1">
        <div className="row ">

          <div className="col-lg-2 border border-danger shadow rounded caja1 offset-lg-3">

            <h4 className="text-center text-white mt-4">Huepesd</h4>
            <AiOutlineUsergroupAdd className="icon-huesped" />
          </div>
          <div className="col-lg-2 border border-danger shadow rounded caja2">
            <h4 className="text-center text-white mt-4">Habitaciones</h4>
            <BiBed className="icon-habitacion" />
          </div>
          <div className="col-lg-2 border border-dange shadow rounded caja3">
            <h4 className="text-center text-white mt-4">Comedor</h4>
            <MdRestaurant className="icon-comedor" />
          </div>
        </div>
      </div>
      <div className="container nivel2">
        <div className="row">
          <div className="col-lg-2 border border-danger shadow rounded caja4 offset-lg-3">
            <h4 className="text-center text-white mt-4">Reservas/OC</h4>
            <ImAddressBook className="icon-reserva" />
          </div>
          <div className="col-lg-2 border border-danger shadow rounded caja5" >
            <h4 className="text-center text-white mt-4">Agregar Cliente</h4>
            <IoMdPersonAdd className="icon-addCliente" />
          </div>
          <div className="col-lg-2 border border-danger shadow rounded caja6" >
            <h4 className="text-center text-white mt-4">Reportes</h4>
            <HiOutlineDocumentReport className="icon-reporte" />
          </div>
        </div>
      </div>


    </div>


  )
}

export default Contacto
