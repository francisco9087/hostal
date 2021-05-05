import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import { AiOutlineUserSwitch } from 'react-icons/ai'
const axios = require('axios')

const Rol = (props) => {

  const [roles, setRoles] = useState([])
  const [descripcion, setDescripcion] = useState("")
  const [id_rol, setId_rol] = useState("")
  const [modoEdicion, setModoEdicion] = useState(false)
  const { handleSubmit } = useForm()
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const handleShowTable = () => setShowTable(true)
  const handleCloseTable = () => setShowTable(false)

  const limpiarInput = () => setDescripcion('')
  const handleShow = () => {
    setShow(true);
    setModoEdicion(false)
  }

  const handleClose = () => {
    setShow(false)
    limpiarInput()
  };
  const fetchData = async () => {
    const request = await axios.get('https://hostalservidor.herokuapp.com/rol')
  
    setRoles(request.data)

    return request
  }
  useEffect(() => {
    fetchData()

  }, [])

  const agregarRol = () => {
    axios.post('http://hostalservidor.herokuapp.com/agregar-rol', {
      id_rol: id_rol,
      descripcion: descripcion
    })

   
    // setRoles([...roles, {id_rol: id_rol, descripcion: descripcion}])
    handleClose()

  }

  const activarModoEdicion = (item) => {
    handleShow()
    setModoEdicion(true)
    setId_rol(item.id_rol)
    setDescripcion(item.descripcion)
  }

  const editarRol = async () => {
    await axios.put(`http://hostalservidor.herokuapp.com/updateRol/${id_rol}`, {
      id_rol: id_rol,
      descripcion: descripcion
    })
    handleClose()
  }

  const onSubmit = (data) => {
    modoEdicion ? editarRol() : agregarRol()
  }

  const eliminarRol = async (id_rol) => {
    await swal({
      title: 'ELIMINAR ROL',
      text: 'esta seguro que desea eliminar',
      icon: 'warning',
      buttons: ['cancelar', 'aceptar']
    }).then(response => {
      if (response) {
        axios.delete(`http://hostalservidor.herokuapp.com/eliminarROl/${id_rol}`)
        swal({ text: 'eliminado con exito', icon: 'success', timer: '2000' })
      }
    })
  }


  return (
    <div>
      <>
        {/* Icono  */}
        <h4 className="text-center text-white mt-4">Rol</h4>
        <AiOutlineUserSwitch
          size="7em"
          color="white"
          title="Presiona para ingresar un rol nuevo"
          className='row mx-auto'
          onClick={handleShowTable}
          
        />

        {/* Modal Table info */}
        <Modal
          show={showTable}
          onHide={handleCloseTable}
          centered
          size='xl'

        >
          <Modal.Header className="bg-dark">

            <Modal.Title className="text-white text-uppercase mx-auto"> Listado Roles </Modal.Title>
            <p className="text-white mt-2" onClick={handleCloseTable} style={{ cursor: 'pointer' }}>X</p>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 offset-lg-8">
                  <button className="btn btn-success " onClick={handleShow}>Agregar rol</button>
                </div>
                <div className="col-lg-10 offset-lg-1 mt-5">
                  <table className="table table-responsive">
                    <thead className="table-dark text-uppercase">
                      <tr>
                        {/* <th>Identificador</th> */}
                        <th>TIpo Rol</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        roles.map(item => {
                          return (
                            <tr key={item.id_rol}>
                              {/* <td>{item.id_rol}</td> */}
                              <td>{item.descripcion}</td>
                              <td>
                                <MdDeleteForever
                                  size="1.8em" 
                                  color="red"
                                  onClick={() => eliminarRol(item.id_rol)}
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
        {/* Modal Formulario ingreso rol */}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          style={{ backdropFilter: 'blur(3px) ' }}
          size=''
          animation={true}
        >
          <Modal.Header className={modoEdicion ? " bg-warning" : " bg-success"}>
            <Modal.Title className="text-white mx-auto text-uppercase">
              {modoEdicion ? 'Editar Rol' : 'Agregar Rol'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">ROl</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
              />
              <hr className="mt-4" />
              <div className="btn-toolbar float-end">
                <div className="btn-group me-2">
                  <button className={modoEdicion ? 'btn btn-warning' : ' btn btn-success'}>
                    {modoEdicion ? 'EDITAR' : 'AGREGAR'}
                  </button>
                </div>
              </div>
            </form>
            <button className="btn btn-danger btn-group me-2 float-end" onClick={handleClose}>CERRAR</button>
          </Modal.Body>
        </Modal>
      </>


      {/* <select onChange={e => setRolesSeleccion(e.target.value)} name="" id="" >
        <option value="0">Seleccione un rol</option>
        {
          roles.map(item => {
            return (
              <option key={item.id_rol} value={item.id_rol}>{item.descripcion}</option>
            )
          })
        }
      </select>

      {
        rolesSeleccion === "0" ? '' : rolesSeleccion === "1" ? 'Administrador' : rolesSeleccion === "2" ? 'cliente' : rolesSeleccion === "3" ? 'proveedor' : 'empleado'


      } */}
    </div>
  )
}

export default Rol
