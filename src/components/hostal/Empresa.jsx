import React, { useEffect, useState } from 'react'
import '../css/empresa.css'
import { useForm } from 'react-hook-form'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import swal from 'sweetalert'
const axios = require('axios')

const Empresa = () => {

  const [empresa, setEmpresa] = useState([])
  const [idEmpresa, setIdEmpresa] = useState('')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [rut, setRut] = useState('')
  const [telefono, setTelefono] = useState('')
  const { handleSubmit } = useForm()


  //Edicion
  const [modoEdicion, setModoEdicion] = useState(false)
  const handleModoEdicionTrue = () => setModoEdicion(true)

  const handleModoEdicionFalse = () => {
    setModoEdicion(false)
    limpiarInput()
  }

  useEffect(() => {
    axios.get('https://hostalservidor.herokuapp.com/obtenerEmpresa')
      .then(response => {
        setEmpresa(response.data)

      })
  }, [])


  const agregarEmpresa = () => {
    axios.post('https://hostalservidor.herokuapp.com/agregarEmpresa', {
      nombre: nombre,
      rut: rut,
      direccion: direccion,
      telefono: telefono
    })
    setEmpresa([...empresa, {nombre:nombre, rut: rut, direccion: direccion, telefono: telefono}])
  }

  const editarEmpresa = () => {
    axios.put(`https://hostalservidor.herokuapp.com/updateEmpresa/${idEmpresa}`, {
      idEmpresa:idEmpresa,
      nombre: nombre,
      rut: rut,
      direccion: direccion,
      telefono: telefono
    })
    handleModoEdicionFalse()
    setEmpresa([{nombre:nombre, rut: rut, direccion: direccion, telefono: telefono}])
  }

  const eliminarEmpresa = (idEmpresa) => {
    swal({
      title: 'ELIMINAR EMPRESA',
      text: 'esta seguro que lo desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/deleteEmpresa/${idEmpresa}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
  }



  const activarModoEdicion = (item) => {
    setModoEdicion(true)
    setIdEmpresa(item.id_empresa)
    setNombre(item.nombre)
    setRut(item.rut)
    setDireccion(item.direccion)
    setTelefono(item.telefono)

  }

  const limpiarInput = () => {

    setNombre('')
    setRut('')
    setDireccion('')
    setTelefono('')

  }


  const onSubmit = (data) => {
    modoEdicion ? editarEmpresa() : agregarEmpresa()
  }


  return (
    <div>

      <div className="container mt-5 contenedor-add-empresa">
        <div className="row">
          <div className="col-lg-5  mt-5 contenedor-card-empresa">
            <div className="card card-empresa">
              <div className="card-title text-white text-center mt-3"><h3>{modoEdicion ? 'Editar Empresa' : 'Agregar Empresa'}</h3></div>
              <div className="card-body">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <label className="form-label small text-white">Nombre</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    onChange={e => setNombre(e.target.value)}
                    value={nombre}
                  />
                  <label className="form-label small text-white">Rut</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    onChange={e => setRut(e.target.value)}
                    value={rut}
                  />
                  <label className="form-label small text-white">Direccion</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    onChange={e => setDireccion(e.target.value)}
                    value={direccion}
                  />
                  <label className="form-label small text-white">Telefono</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    onChange={e => setTelefono(e.target.value)}
                    value={telefono}
                  />
                  <button className={modoEdicion ? 'btn btn-warning btn-block btn-sm mt-3' : 'btn btn-success btn-block  btn-sm mt-3'}>
                    {modoEdicion ? 'Editar' : 'Agregar'}
                  </button>
            
                </form>
                {
                  modoEdicion ?   <button className="btn btn-secondary btn-block btn-sm mt-3 text-white" onClick={() => handleModoEdicionFalse()} >Cancelar</button> : null
                }
                
              </div>
            </div>
          </div>
          <div className="col-lg-7  contenedor-tabla mt-5">
            <div className="contenedor-tabla-empresa">
              <div className="card card-tabla-empresa">
                <div className="card-title text-white text-center mt-3"><h3>Listado Empresa</h3></div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="table-dark ">
                        <tr>
                          <th>Nombre</th>
                          <th>Rut</th>
                          <th>Direccion</th>
                          <th>Telefono</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          empresa.map(item => {
                            return (
                              <tr className="text-white">
                                <td>{item.nombre}</td>
                                <td>{item.rut}</td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>
                                  <MdDeleteForever size="1.8em" color="red"
                                    onClick={() => eliminarEmpresa(item.id_empresa)}
                                    style={{ cursor: 'pointer', marginRight: '12px' }}
                                  />
                                  <BsPencilSquare
                                    size="1.8em"
                                    color="orange"
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
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Empresa
