import React, { useEffect, useState } from 'react'
import { FaHotel } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
const axios = require('axios')

const TipoHabitacion = () => {

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

  const [tipoHabitacion, setTipoHabitacion] = useState([])
  const [descripcion, setDescripcion] = useState("")
  const [idTipoHabitacion, setIdTipoHabitacion] = useState("")

  const [modoEdicion, setModoEdicion] = useState([])

  const { handleSubmit } = useForm()

  useEffect(() => {
    axios.get('http://hostalservidor.herokuapp.com/obtenerTipoHabitacion')
      .then(response => {
        setTipoHabitacion(response.data)
      })
      
  }, [])

  const agregarTipoHabitacion = async () => {
    await axios.post('http://hostalservidor.herokuapp.com/agregarTipoHabitacion', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setDescripcion(item.descripcion)
    setIdTipoHabitacion(item.id_tipo_habitacion)
  }

  const editarTipoHabitacion = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateTipoHabitacion/${idTipoHabitacion}`, {
      id_tipo_habitacion: idTipoHabitacion,
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarTipoHabitacion() : agregarTipoHabitacion()
  }

  const deleteTipoHabitacion = async (idTipoHabitacion) => {
    await swal({
      title: 'ELIMINAR TIPO HABITACIÓN',
      text: 'esta seguro que desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteTipoHabitacion/${idTipoHabitacion}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
   
  }

  return (
    <div>
      <h4 className="text-center text-white mt-4">Tipo Habitación</h4>
      <FaHotel
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
          <Modal.Title className="text-uppercase text-white mx-auto">Listado Tipo Habitación</Modal.Title>
          <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success " onClick={handleShowFormulario}>Agregar Tipo Habitación</button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-5">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-uppercase">Identificador</th>
                      <th className="text-uppercase">Tipo Habitación</th>
                      <th className="text-uppercase">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tipoHabitacion.map(item => {
                        return (
                          <tr key={item.id_tipo_habitacion}>
                            <td>{item.id_tipo_habitacion}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              <MdDeleteForever
                                size="2em"
                                color="red"
                                style={{ cursor: 'pointer', marginRight: '12px' }}
                                onClick={() => deleteTipoHabitacion(item.id_tipo_habitacion)}

                              />
                              <BsPencilSquare
                                size="2em"
                                color="orange"
                                style={{ cursor: 'pointer' }}
                                onClick={() => activarModoEdicion(item)}
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
          <Modal.Title className="text-uppercase text-white mx-auto">{modoEdicion ? 'Editar Tipo Habitación' : 'Agregar Tipo Habitación'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Tipo Habitación</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            />
            <hr className="mt-4" />
            <div className="btn-toolbar float-end">
              <div className="btn-group">
                <button className={modoEdicion ? "btn btn-warning" : "btn btn-success"}>{modoEdicion ? 'Editar' : 'Agregar'}</button>
              </div>
            </div>
          </form>
          <div className="btn-group float-end me-2">
            <button className="btn btn-danger">Cerrar</button>
          </div>

        </Modal.Body>
      </Modal>

    </div>
  )
}

export default TipoHabitacion
