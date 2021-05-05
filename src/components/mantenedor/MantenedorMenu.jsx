import React from 'react'
import '../css/mantenedorMenu.css'

import Rol from './Rol'
import TipoEmpleado from './TipoEmpleado'
import TipoHabitacion from './TipoHabitacion'
import TipoProducto from './TipoProducto'
import TipoPlato from './TipoPlato'
import EstadoReserva from './EstadoReserva'
import FamiliaProducto from './FamiliaProducto'
import EstadoHabitacion from './EstadoHabitacion'
import Rubro from './Rubro'

const MantenedorMenu = (props) => {

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
          <div className="col-lg-2 caja3">
            <TipoHabitacion />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 offset-lg-3 caja4">
            <TipoProducto />
          </div>
          <div className="col-lg-2 caja5">
            <Rubro/>
          </div>
          <div className="col-lg-2 caja6">
            <EstadoHabitacion />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 offset-lg-3 caja7">
            <TipoPlato />
          </div>
          <div className="col-lg-2 caja8">
            <FamiliaProducto />
          </div>
          <div className="col-lg-2 caja9">
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
