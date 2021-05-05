import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
const axios = require('axios')

const TipoEmpleado = (props) => {

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

  const [tipoEmpleado, setTipoEmpleado] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [idTipoEmpleado, setIdTipoEmpleado] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const { handleSubmit } = useForm()

  
  useEffect(() => {
    axios.get('https://hostalservidor.herokuapp.com/obtenerTipoEmpleado')
      .then(response => {
        setTipoEmpleado(response.data)
      })
  }, [])

  const agregarTipoEmpleado = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarTipoEmpleado', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setIdTipoEmpleado(item.id_tipo_usuario)
    setDescripcion(item.descripcion)
  }

  const editarTipoEmpleado = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateTipoEmpleado/${idTipoEmpleado}`, {
      id_tipo_usuario: idTipoEmpleado,
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarTipoEmpleado() : agregarTipoEmpleado()
  }


  const eliminarTipoEmpleado = (idTipoEmpleado) => {
    swal({
      title: 'ELIMINAR TIPO EMPLEADO',
      text: 'esta seguro que lo desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteTipoEmpleado/${idTipoEmpleado}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
  }

 

  return (
    <div>

      <>
        <h4 className="text-center text-white mt-4">Tipo empleado</h4>
        <BsPersonBoundingBox
          size="6em"
          color="white"
          className="row mx-auto text-white mt-3"
          onClick={handleShowTable}
        />

        <Modal 
          show={showTable} 
          onHide={handleCloseTable} 
          centered 
          size="xl" 
        >
          <Modal.Header className="bg-dark ">
            <Modal.Title className="text-white text-uppercase mx-auto">Listado Tipo Empleado</Modal.Title>
            <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 offset-lg-8">
                  <button className="btn btn-success" onClick={handleShowFormulario}>Agregar Tipo Empleado</button>
                </div>
                <div className="col-lg-10 offset-lg-1 mt-5">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th className="text-uppercase">Identificador</th>
                        <th className="text-uppercase">Tipo empleado</th>
                        <th className="text-uppercase">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        tipoEmpleado.map(item => {
                          return (
                            <tr key={item.id_tipo_usuario}>
                              <td>{item.id_tipo_usuario}</td>
                              <td>{item.descripcion}</td>
                              <td>
                                <MdDeleteForever
                                  size="1.8em" color="red"
                                  onClick={() => eliminarTipoEmpleado(item.id_tipo_usuario)}
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
          style={{ backdropFilter: 'blur(3px) ' }}
          className="shadow"
        >
          <Modal.Header className={modoEdicion ? 'bg-warning' : 'bg-success' }>
            <Modal.Title className="mx-auto text-uppercase text-white">{modoEdicion ? 'Editar Tipo Empleado' : 'Agregar Tipo Empleado'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label >Tipo Empleado</label>
              <input
                type="text"
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
                className="form-control"
              />
              <hr />
              <div className="btn-toolbar float-end">
                <div className="btn-group me-2">
                  <button className={modoEdicion ? 'btn btn-warning' : 'btn btn-success'}>
                    {modoEdicion ? 'Editar' : 'Agregar'}
                  </button>
                </div>
              </div>
            </form>
            <div className="btn-group me-2 float-end">
              <button className="btn btn-danger" onClick={handleCloseFormulario}>CERRAR</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  )
}

export default TipoEmpleado
