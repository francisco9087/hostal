import React, { useEffect, useState } from 'react'
import '../css/huesped.css'
const { useForm } = require('react-hook-form')
const axios = require('axios')

const Huesped = () => {
  //empresa
  const [empresa, setEmpresa] = useState([])
  const [nombreEmpresa, setNombreEmpresa] = useState('')
  const [rutEmpresa, setRutEmpresa] = useState('')
  const [direccionEmpresa, setDireccionEmpresa] = useState('')
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('')
  const [idEmpresa, setIdEmpresa] = useState('')
  //huesped
  const [idHuesped, setIdHuesped] = useState('')
  const [nombreHuesped, setNombreHuesped] = useState('')
  const [listadoHuesped, setListadoHuesped] = useState([])

  //Filtro
  const [filtro, setFiltro] = useState('')




  const { handleSubmit } = useForm()

  useEffect(() => {
    axios.get('https://hostalservidor.herokuapp.com/obtenerEmpresa')
      .then(response => {
        setEmpresa(response.data)

      })
    axios.get('http://hostalservidor.herokuapp.com/obtenerHuesped')
      .then(response => {
        console.log(response.data)
        setListadoHuesped(response.data)
      })
  }, [])

  const agregarHuesped = () => {
    axios.post('https://hostalservidor.herokuapp.com/agregarHuesped', {
      id_huesped: idHuesped,
      nombre_huesped: nombreHuesped,
      empresa_id_empresa: idEmpresa
    })
    limpiaInput()
  }

  const cargarInput = (item) => {
    setIdEmpresa(item.id_empresa)
    setNombreEmpresa(item.nombre)
    setRutEmpresa(item.rut)
    setDireccionEmpresa(item.direccion)
    setTelefonoEmpresa(item.telefono)
  }


  const onSubmit = (data) => {
    agregarHuesped()
  }

  const limpiaInput = () => {
    setIdEmpresa('')
    setNombreEmpresa('')
    setRutEmpresa('')
    setDireccionEmpresa('')
    setTelefonoEmpresa('')
    setNombreHuesped('')
    setIdHuesped('')
  }


  return (

    <div>
      <div className="container mt-5 contenedor-form-huesped">
        <div className="row">
          <div className="col-lg-5 offset-lg-1 contenedor-card-huesped">
            <div className="card card-huesped">
              <div className="card-title text-center mt-3 text-white"><h3>Huesped</h3></div>
              <div className="card-body">
                <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="hidden"
                        value={idEmpresa}
                        onChange={e => { setIdEmpresa(e.target.value) }}
                        className="form-control form-control-sm text-white input-huesped"
                      />

                      <label htmlFor="" className="form-label small text-white">ID Huesped</label>
                      <input
                        type="text"
                        value={idHuesped}
                        onChange={e => { setIdHuesped(e.target.value) }}
                        className="form-control form-control-sm bg-dark text-white input-huesped"

                      />

                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white">Nombre Huesped</label>
                      <input
                        type="text"
                        value={nombreHuesped}
                        onChange={e => { setNombreHuesped(e.target.value) }}
                        className="form-control form-control-sm bg-dark text-white input-huesped"
                      />
                    </div>
                    <div className="col-lg-6">

                      <label htmlFor="" className="form-label small text-white">Empresa</label>
                      <input
                        type="text"
                        value={nombreEmpresa}
                        onChange={e => { setNombreEmpresa(e.target.value) }}
                        disabled
                        className="form-control form-control-sm bg-dark text-white input-huesped"
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white">Rut Empresa</label>
                      <input
                        type="text"
                        value={rutEmpresa}
                        onChange={e => { setRutEmpresa(e.target.value) }}
                        disabled
                        className="form-control form-control-sm bg-dark text-white input-huesped"
                      />
                    </div>
                    <div className="col-lg-6">

                      <label htmlFor="" className="form-label small text-white">Direccion Empresa</label>
                      <input
                        type="text"
                        value={direccionEmpresa}
                        onChange={e => { setDireccionEmpresa(e.target.value) }}
                        disabled
                        className="form-control form-control-sm bg-dark text-white input-huesped"
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white">Telefono Empresa</label>
                      <input
                        type="text"
                        value={telefonoEmpresa}
                        onChange={e => { setTelefonoEmpresa(e.target.value) }}
                        disabled
                        className="form-control form-control-sm bg-dark text-white"
                      />
                    </div>

                  </div>

                  <button className="btn btn-success form-control mt-3">Agregar </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-5 contenedor-card-sel-empresa">
            <div className="card card-sel-empresa">
              <div className="card-title text-center mt-2 text-white  text-capitalize"><h3>Selecciona Empresa</h3></div>
              <div className="card-body" >

                {
                  empresa.map(item => {
                    return (
                      <ul>
                        <button className="btn btn-primary form-control" onClick={() => cargarInput(item)}>{item.nombre} </button>

                      </ul>
                    )

                  })
                }
              </div>
            </div>

          </div>

          <div className="col-lg-6 offset-lg-3 mt-5">

          </div>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="card bg-dark">
              <div className="card-title text-white"></div>

              <div className="card-body">
                <div className="table=responsive-xl">
                  <table className="table table-dark table-striped table-hover table-sm">
                    <thead className="table text-capitalize text-white">
                      <tr>
                        <th>Identificador huesped</th>
                        <th> Nombre</th>
                        <th>Empresa</th>
                        <th>Rut empresa</th>
                        <th>direccion empresa</th>
                        <th>telefono empresa</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        listadoHuesped.map(item => {
                          return (
                            <tr key={item.id_huesped}>
                              <td>{item.id_huesped}</td>
                              <td>{item.nombre_huesped}</td>
                              <td>{item.nombre}</td>
                              <td>{item.rut}</td>
                              <td>{item.direccion}</td>
                              <td>{item.telefono}</td>
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
  )
}

export default Huesped
