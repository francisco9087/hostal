import React, { useState } from 'react'
import '../css/mantenedorMenu.css'
import { GrUserWorker } from 'react-icons/gr'
import Rol from './Rol'
import TipoEmpleado from './TipoEmpleado'
import TipoHabitacion from './TipoHabitacion'
import TipoProducto from './TipoProducto'
import TipoPlato from './TipoPlato'
import EstadoReserva from './EstadoReserva'
import FamiliaProducto from './FamiliaProducto'
import EstadoHabitacion from './EstadoHabitacion'


const MantenedorMenu = (props) => {
  const [show, setShow] = useState(false);
  const handleShows = () => setShow(true);
  const handleClose = () => setShow(false);
  const { handleShowTable } = props
  const { handleShowTipoEmpleado } = props
  return (
    
      <div className="container-rol">

        <div className="container">
          <div className="row">

            <div className="col-lg-2 offset-lg-3 caja1">
              <Rol />

            </div>


            <div className="col-lg-2  caja2">
              <TipoEmpleado />
            </div>


            <div className="col-lg-2 border caja3">

              <TipoHabitacion />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 offset-lg-3 border caja4">
              <TipoProducto />
            </div>
            <div className="col-lg-2 border caja5">
              <h4 className="text-center text-white mt-4">Rubro</h4>
            </div>
            <div className="col-lg-2 border caja6">
              <EstadoHabitacion />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 offset-lg-3 border caja7">
              <TipoPlato />
            </div>
            <div className="col-lg-2 border caja8">
              <FamiliaProducto />
            </div>
            <div className="col-lg-2 border caja9">
              <EstadoReserva />
            </div>
          </div>
        </div>
        <div>

        </div>

      </div>
  

  )
}

export default MantenedorMenu
