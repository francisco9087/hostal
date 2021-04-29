import React, { useState } from 'react'
import {RiReservedLine} from 'react-icons/ri'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'

const EstadoReserva = () => {
  const [showTable, setShowTable] = useState(false)
  const handleShowTable = () => setShowTable(true)
  const handleCloseTable = () => setShowTable(false)

  const [showFormulario, setShowFormulario] = useState(false)
  const handleShowFormulario = () => {
    setShowFormulario(true)
    setModoEdicion(false)
  }
  const handleCloseFormulario = () => {
    setShowFormulario(false)

  }

  const [modoEdicion, setModoEdicion] = useState([])

  return (
    <div>
       <h4 className="text-center text-white mt-4">Estado Reserva</h4>
      <RiReservedLine
        color="white"
        size="6em"
        className="row mx-auto mt-3"
        title="Presiona para ingresar un tipo de habitacion nuevo"
        onClick={handleShowTable}
      />
            <Modal
        show={showTable}
        centered
        onHide={handleCloseTable}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tipo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success" onClick={handleShowFormulario}></button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-3">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th>Identificador</th>
                      <th>asdasdasd</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showFormulario}
        centered
        onHide={handleCloseFormulario}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tipo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <label htmlFor=""></label>
            <input type="text" className="form-control" />
            <hr />
            <div className="btn-toolbar float-end">
                <button className="btn btn-success btn-group">Agregar</button>
            </div>
          </form>
         
            <button className="btn btn-danger me-2 btn-group float-end" onClick={handleCloseFormulario}>Cerrar</button>
     
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EstadoReserva
