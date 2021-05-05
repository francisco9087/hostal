import React, { useEffect, useState } from 'react'
import { BsCardHeading } from 'react-icons/bs'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import swal from 'sweetalert' 
const axios = require('axios')


const Rubro = () => {

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
  const { handleSubmit } = useForm()
  const [modoEdicion, setModoEdicion] = useState([])

  const [rubro, setRubro] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [idRubro, setIdRubro] = useState('')

  const limpiarInput = () => setDescripcion('')

  useEffect(() => {
    axios.get('http://hostalservidor.herokuapp.com/obtenerRubro')
      .then(response => {
        setRubro(response.data)
      })
  }, [])

  const agregarRubro = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarRubro', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setIdRubro(item.id_rubro)
    setDescripcion(item.descripcion)
  }

  const editarRubro = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateRubro/${idRubro}`, {
      id_rubro: idRubro,
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarRubro() : agregarRubro()
  }

  const eliminarRubro = async (idRubro) => {
    await swal({
      title: 'ELIMINAR RUBRO',
      text: 'esta seguro que desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteRubro/${idRubro}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
    
  }

  return (
    <div>
      <h4 className="text-center text-white mt-4">Rubro</h4>
      <BsCardHeading
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
        <Modal.Header className="bg-dark ">
          <Modal.Title className="text-white text-uppercase mx-auto">Rubro</Modal.Title>
          <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success" onClick={handleShowFormulario}>Agregar Rubro</button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-5">
                <table className="table">
                  <thead className="table-dark text-uppercase">
                    <tr>
                      <th>Identificador</th>
                      <th>Rubro</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      rubro.map(item => {
                        return (
                          <tr key={item.id_rubro}>
                            <td>{item.id_rubro}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              <MdDeleteForever
                                size="2em" color="red"
                                onClick={() => eliminarRubro(item.id_rubro)}
                                style={{ cursor:'pointer', marginRight: '12px' }}
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
        <Modal.Header className={modoEdicion ? "bg-warning" : "bg-success"}>
          <Modal.Title className="text-white text-uppercase mx-auto">{modoEdicion ? 'Editar Rubro' :  'Agregar Rubro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} >
            <label htmlFor=""></label>
            <input 
              type="text" 
              className="form-control" 
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}

            />
            <hr />
            <div className="btn-toolbar float-end">
              <button className={modoEdicion ? "btn btn-warning btn-group" : "btn btn-success btn-group"}>
                {modoEdicion ? 'Editar' : 'Agregar'}
              </button>
            </div>
          </form>

          <button className="btn btn-danger me-2 btn-group float-end" onClick={handleCloseFormulario}>Cerrar</button>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Rubro
