import React, { useEffect, useState } from 'react'
import { RiReservedLine } from 'react-icons/ri'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import swal from 'sweetalert'
const axios = require('axios')

const EstadoReserva = () => {
  const [showTable, setShowTable] = useState(false)
  const handleShowTable = () => setShowTable(true)
  const handleCloseTable = () => setShowTable(false)
  const [showFormulario, setShowFormulario] = useState(false)
  const handleShowFormulario = () => {
    setShowFormulario(true)
    setModoEdicion(false)
  }

  const limpiarInput = () => setDescripcion('')
  const handleCloseFormulario = () => {
    setShowFormulario(false)
    limpiarInput()
  }

  const [estadoReserva, setEstadoReserva] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [idEstadoReserva, setIdEstadoReserva] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const { handleSubmit } = useForm()


  useEffect(() => {
    axios.get('https://hostalservidor.herokuapp.com/obtenerEstadoReserva')
      .then(response => {
        setEstadoReserva(response.data)
      })
  }, [])

  const agregarEstadoReserva = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarEstadoReserva', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setIdEstadoReserva(item.id_tipo_usuario)
    setDescripcion(item.descripcion)
  }

  const editarEstadoReserva = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateEstadoReserva/${idEstadoReserva}`, {
      id_detalle_reserva: idEstadoReserva,
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarEstadoReserva() : agregarEstadoReserva()
  }


  const eliminarEstadoReserva = (idEstadoReserva) => {
    swal({
      title: 'ELIMINAR ESTADO RESERVA',
      text: 'esta seguro que lo desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteEstadoReserva/${idEstadoReserva}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
  }


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
        size="xl"
      >
        <Modal.Header className="bg-dark">
          <Modal.Title className="text-white mx-auto text-uppercase">Estado Reserva</Modal.Title>
          <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success" onClick={handleShowFormulario}>Agregar estado reserva</button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-3">
                <table className="table">
                  <thead className="table-dark text-uppercase">
                    <tr>
                      <th>Identificador</th>
                      <th>Estado Reserva</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      estadoReserva.map(item => {
                        return (
                          <tr key={item.id_detalle_reserva}>
                            <td>{item.id_detalle_reserva}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              <MdDeleteForever
                                size="2em" color="red"
                                onClick={() => eliminarEstadoReserva(item.id_detalle_reserva)}
                                style={{ cursor: 'pointer', marginRight: '12px' }}
                              />
                              <BsPencilSquare
                                size="1.8em" color="orange"
                                onClick={() => activarModoEdicion(item)}
                                style={{ cursor: 'pointer' }}
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
        <Modal.Header className={modoEdicion ? 'bg-warning' : 'bg-success'}>
          <Modal.Title className="text-white mx-auto text-uppercase">{modoEdicion ?  'Editar Estado Reserva' :'Agregar Estado Reserva' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor=""></label>
            <input
              type="text"
              className="form-control"
              onChange={e => setDescripcion(e.target.value)}
              value={descripcion}
            />
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
