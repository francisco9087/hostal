import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
const axios = require('axios')

const Login = () => {

  const [nombre_usuario, setNombre_usuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const { handleSubmit } = useForm()


  const login = async () => {
   await axios.post('https://hostalservidor.herokuapp.com/login', {
      nombre_usuario: nombre_usuario,
      contrasena: contrasena
    }).then(response => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      }else {
        setLoginStatus(response.data[0].nombre_usuario)
      }
      console.log(response)
    })
  }

  
  const onSubmit = (data) => {
    login()
  }

  return (
    <div style={{ marginTop: "350px"}}>
    
      <div className="container" >
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header"><h1>{loginStatus}</h1>
                <h2 className="text-center">Login</h2>
              </div>
              <div className="card-body">
                <form action="" className="form-control" onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="">Usuario</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => setNombre_usuario(e.target.value)}
                  />
                  <label htmlFor="">Contraseña</label>
                  <input 
                    type="text" 
                    className="form-control"
                    onChange={e => setContrasena(e.target.value)}
                  />

                  <button 
                    className="btn btn-primary form-control mt-3 mb-3"
                    
                  >
                    Ingresar
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Login
