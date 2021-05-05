import React, { useEffect, useState } from 'react'
import {GiHotMeal} from 'react-icons/gi'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import swal from 'sweetalert'
const axios = require('axios')

const TipoPlato = () => {
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

  const [tipoPlato, setTipoPlato] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [idTipoPlato, setIdTipoPlato] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const { handleSubmit } = useForm()

  
  useEffect(() => {
    axios.get('http://hostalservidor.herokuapp.com/obtenerTipoPlato')
      .then(response => {
        setTipoPlato(response.data)
      })
  }, [])

  const agregarTipoPlato = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarTipoPlato', {
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const activarModoEdicion = (item) => {
    handleShowFormulario()
    setModoEdicion(true)
    setIdTipoPlato(item.id_tipo)
    setDescripcion(item.descripcion)
  }

  const editarTipoPlato = () => {
    axios.put(`http://hostalservidor.herokuapp.com/updateTipoPlato/${idTipoPlato}`, {
      id_tipo: idTipoPlato,
      descripcion: descripcion
    })
    handleCloseFormulario()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarTipoPlato() : agregarTipoPlato()
  }


  const eliminarTipoPlato = (idTipoPlato) => {
    swal({
      title: 'ELIMINAR TIPO PLATO',
      text: 'esta seguro que lo desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteTipoPlato/${idTipoPlato}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
  }

  return (
    <div>
     <h4 className="text-center text-white mt-4">Tipo Plato</h4>
      <GiHotMeal
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
          <Modal.Title className="text-white mx-auto tex-uppercase">Tipo Plato</Modal.Title>
          <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-8">
                <button className="btn btn-success float-end" onClick={handleShowFormulario}>Agregar tipo plato</button>
              </div>
              <div className="col-lg-10 offset-lg-1 mt-3">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-uppercase">Identificador</th>
                      <th className="text-uppercase">tipo plato</th>
                      <th className="text-uppercase">opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tipoPlato.map(item => {
                        console.log(item)
                        return(
                          <tr key={item.id_tipo}>
                            <td>{item.id_tipo}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              <MdDeleteForever 
                                size="1.8em" 
                                color="red" 
                                onClick={() => eliminarTipoPlato(item.id_tipo)}
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
        <Modal.Header closeButton className={ modoEdicion ? "bg-warning" : "bg-success"}>
          <Modal.Title className="text-uppercase mx-auto text-white">{modoEdicion ? 'Editar Tipo Plato' : 'Agregar Tipo Plato'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {modoEdicion ? 'Editar' :  'Agregar'}
                </button>
            </div>
          </form>
         
            <button className="btn btn-danger me-2 btn-group float-end" onClick={handleCloseFormulario}>Cerrar</button>
     
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TipoPlato
