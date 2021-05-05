import React, { useEffect, useState } from 'react'
import { AiOutlineUnlock } from 'react-icons/ai'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import swal from 'sweetalert'
const axios = require('axios')



const EstadoHabitacion = () => {
  
  const [showTable, setShowTable] = useState(false)
  const handleShowTable = () => setShowTable(true)
  const handleCloseTable = () => setShowTable(false)

  const [showFormulario, setShowFormulario] = useState(false)
  const handleShowFormulario = () => {
    setShowFormulario(true)
    setModoEdicion(false)
    limpiarInput()
  }
  const handleCloseFormulario = () => setShowFormulario(false)

  const [modoEdicion, setModoEdicion] = useState([])

  const [estadoHabitacion, setEstadoHabitacion] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [idEstadoHabitacion, setIdEstadoHabitacion] = useState('')
  const limpiarInput = () => setDescripcion('')
  const { handleSubmit } = useForm()

  useEffect(() => {
    axios.get('http://hostalservidor.herokuapp.com/obtenerEstadoHabitacion')
      .then(response => {
        setEstadoHabitacion(response.data)
      })
  }, [])

  const agregarEstadoHabitacion = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarEstadoHabitacion', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setDescripcion(item.descripcion)
    setIdEstadoHabitacion(item.id_estado_habitacion)
  }

  const editarEstadoHabitacion = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateEstadoHabitacion/${idEstadoHabitacion}`, {
      id_estado_habitacion: idEstadoHabitacion,
      descripcion: descripcion

    })
  }

  const onSubmit = (data) => {
    modoEdicion ? editarEstadoHabitacion() : agregarEstadoHabitacion()
  }

  const eliminarEstadoHabitacion =async (idEstadoHabitacion) => {
    await swal({
      title: 'ELIMINAR ESTADO HABITACIÓN',
      text: 'esta seguro que desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/${idEstadoHabitacion}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
   
  }

  return (
    <div>
      <h5 className="text-center text-white mt-4">Estado Habitación</h5>
      <AiOutlineUnlock
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
        size='xl'
      >
        <Modal.Header className="bg-dark">
          <Modal.Title className="text-white text-uppercase mx-auto">estado Habitación</Modal.Title>
          <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success" onClick={handleShowFormulario}>Agregar estado Habitación</button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-5">
                <table className="table">
                  <thead className="table-dark text-uppercase">
                    <tr>
                      <th>Identificador</th>
                      <th>estado Habitación</th>
                      <th>opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      estadoHabitacion.map(item => {
                        return (
                          <tr key={item.id_estado_habitacion}>
                            <td>{item.id_estado_habitacion}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              <MdDeleteForever size="1.8em" color="red"
                                onClick={() => eliminarEstadoHabitacion(item.id_estado_habitacion)}
                                style={{ cursor:'pointer', marginRight: '12px' }}
                              />
                              <BsPencilSquare
                                size="1.8em"
                                color="orange"
                                onClick={() => activarModoEdicion(item)}
                                style={{ cursor:'pointer' }}
                              />
                            </td>
                          </tr>
                        )
                      })
                    }
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
        <Modal.Header className={modoEdicion ? "bg-warning" : "bg-success"}>
          <Modal.Title className="text-uppercase mx-auto text-white">{modoEdicion ? 'Editar estado Habitación' : 'Agregar estado Habitación'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Estado Habitación</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            />
            <hr />
            <div className="btn-toolbar float-end">
              <button className={modoEdicion ? "btn btn-warning btn-group" : "btn btn-success btn-group"}>{modoEdicion ? 'Editar' : 'Agregar'}</button>
            </div>
          </form>

          <button className="btn btn-danger me-2 btn-group float-end" onClick={handleCloseFormulario}>Cerrar</button>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EstadoHabitacion
