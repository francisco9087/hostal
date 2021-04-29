import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
const IngresoCliente = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div>
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-10 offset-lg-2">
        <Button variant="primary" onClick={handleShow}>
        INGRESAR CLIENTES
      </Button>
        </div>
      </div>
    </div>
     

      <Modal size="lg"
        show={show}
        onHide={handleClose}
        animation={true}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header >
          <Modal.Title >INGRESO CLIENTES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="card shadow">
                  <div className="card-body">
                    <form action="">
                      <div className="row">
                        <div className="col-lg-6">
                          <label htmlFor="" className="">Nombre</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-6">
                          <label htmlFor="" className="">Apellido</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-lg-6 mt-2">
                          <label htmlFor="" className="">Rut</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                          <label htmlFor="" className="">Username</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12 mt-2">
                          <label htmlFor="" className="">Contraseña</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-12 mt-2">
                        <button className="form-control btn btn-outline-primary">Agregar</button>
                      </div>

                    </form>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CERRAR
        </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default IngresoCliente
