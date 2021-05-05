import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiUserSearchLine } from 'react-icons/ri'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const axios = require('axios')

const Reserva = () => {
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

  //Reserva
  const [listadoReserva, setListadoReserva] = useState([])
  const [estadoReserva, setEstadoReserva] = useState([])
  const [idEstadoReserva, setIdEstadoReserva] = useState(4)
  const [rutEmpleado, setRutEmpleado] = useState('')
  //Filtro
  const [filtro, setFiltro] = useState('')
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)


  const { handleSubmit } = useForm()

  useEffect(() => {
    axios.get('http://hostalservidor.herokuapp.com/obtenerHuesped')
      .then(response => {
        console.log(response.data)
        setListadoHuesped(response.data)
      })
    axios.get('http://hostalservidor.herokuapp.com/obtenerReserva')
      .then(response => {
        setListadoReserva(response.data)
      })
    axios.get('http://hostalservidor.herokuapp.com/obtenerEstadoReserva')
      .then(response => {
        setEstadoReserva(response.data)
        console.log(estadoReserva)
      })
  }, [])

  const agregarReserva = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregarReserva', {
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      estado_reserva_id_detalle_reserva: idEstadoReserva,
      empleado_rut_empleado: rutEmpleado,
      huesped_id_huesped: idHuesped
    })
  }

  const cargarInput = (item) => {
    setRutEmpresa(item.rut)
    setNombreEmpresa(item.nombre)
    setNombreHuesped(item.nombre_huesped)
    setIdHuesped(item.id_huesped)

  }


  const onSubmit = (data) => {
    agregarReserva()
  }

  const [fecha_inicio, setStartDate] = useState(new Date());
  const [fecha_fin, setEndDate] = useState(new Date());



  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-5 ">
        <div className="row">

          <div className="col-lg-6">

            <div className="card bg-dark  ">
              <div className="card-title text-white mt-2"><h3 className="text-white text-center">Registro Reserva</h3></div>
              <hr className="bg-light" />
              <div className="card-body">

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white">Nombre Huesped</label>
                      <input type="text" className="form-control form-control-sm bg-dark text-white" disabled
                        onChange={e => setNombreHuesped(e.target.value)}
                        value={nombreHuesped}
                      />
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="" className="form-label small text-white">ID Huesped</label>
                      <input type="text" className="form-control form-control-sm bg-dark text-white" disabled
                        onChange={e => setIdHuesped(e.target.value)}
                        value={idHuesped}
                      />
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="" className="form-label small text-white">Empresa</label>
                      <input type="text" className="form-control form-control-sm bg-dark text-white" disabled
                        onChange={e => setNombreEmpresa(e.target.value)}
                        value={nombreEmpresa}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white">Rut Empresa</label>
                      <input type="text" className="form-control form-control-sm bg-dark text-white" disabled
                        onChange={e => setRutEmpresa(e.target.value)}
                        value={rutEmpresa}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white d-block mt-2">Fecha Inicio</label>
                      <DatePicker
                        className="bg-dark text-white form-control form-control-sm d-block"
                        selected={fecha_inicio}
                        onChange={date => setStartDate(date)}
                        value={fecha_inicio}

                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white d-block mt-2">Fecha Fin</label>
                      <DatePicker
                        className="bg-dark text-white form-control form-control-sm d-block"
                        selected={fecha_fin}
                        onChange={date => setEndDate(date)}
                        value={fecha_fin}

                      />

                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label small text-white d-block mt-2">rut Empleado</label>
                      <input type="text"
                        className="bg-dark text-white form-control form-control-sm d-block"

                        onChange={e => setRutEmpleado(e.target.value)}
                        value={rutEmpleado}

                      />

                    </div>
                    <div className="col-lg-6">
                  
                     
                    </div>
                  </div>
                  <button className="btn btn-success btn-block btn-sm mt-3">Agregar Reserva</button>
                </form>
              </div>
            </div>

          </div>
          <div className="col-lg-6">
            <div className="card bg-dark">
              <div className="card-title text-white text-center"><h3>Por definir nombre</h3></div>

              <div className="card-body">
                {
                  listadoHuesped.map(item => {
                    return (
                      <ul>
                        <button className="btn btn-success btn-block btn-sm" onClick={() => cargarInput(item)}>{item.nombre_huesped}</button>
                      </ul>

                    )
                  })
                }

              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-5">
            <div className="card bg-dark">
              <div className="card-title bg-dark text-white text-center mt-2"><h2>Listado Reservas</h2></div>

              <div className="card-body table-responsive">
                <div className="table-responsive-sm">
                  <table className="table table-dark table-striped table-hover table-sm">
                    <thead className="table text-capitalize text-white">
                      <tr>
                        <th>Nombre huesped</th>
                        <th>Empresa</th>
                        <th>Rut empresa</th>
                        <th>numero reserva</th>
                        <th>Responsable Ingreso</th>
                        <th></th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        listadoReserva.map(item => {
                          return (
                            <tr key={item.id_huesped}>
                              <td>{item.nombre_huesped}</td>
                              <td>{item.nombre}</td>
                              <td>{item.rut}</td>
                              <td>{item.id_reserva}</td>
                              <td>{item.nombres + ' ' + item.apellidos}</td>

                              <td><button className="btn btn-success btn-sm" onClick={handleShow}>reserva</button></td>
                            </tr>

                          )

                        })
                      }
                    </tbody>
                  </table>
                </div>

                <input type="text" />
                <button><RiUserSearchLine size="1em" /></button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Reserva
