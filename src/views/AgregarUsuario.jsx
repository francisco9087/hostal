import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
const axios = require('axios')

const AgregarUsuario = () => {

  const [roles, setRoles] = useState([])
  const [ROL_id_rol, setROL_id_rol] = useState('')
  const [nombre_usuario, setNombre_usuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const { handleSubmit } = useForm()

  useEffect(() => {
    axios.get('https://hostalservidor.herokuapp.com/rol')
      .then(response => {
        console.log(response.data)
        setRoles(response.data)
      })

  }, [])

  const agregaUsuario = () => {
    axios.post('https://hostalservidor.herokuapp.com/regitrarUsuario', {
      nombre_usuario: nombre_usuario,
      contrasena: contrasena,
      ROL_id_rol: ROL_id_rol
    })
  }

  const onSubmit = (data) => {
    agregaUsuario()
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form action="" className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="" className="text-white">Nombre Usuario</label>
              <input type="text"
                className="form-control"
                onChange={e => setNombre_usuario(e.target.value)}
                value={nombre_usuario}
              />
              <label htmlFor="" className="text-white">Password</label>
              <input type="text"
                className="form-control"
                onChange={e => setContrasena(e.target.value)}
                value={contrasena}
              />
              <label htmlFor="" className="text-white">Rol</label>
              <select name="" id="" className=" form-control"
                onChange={(e) => {
                  let id = JSON.parse(e.target.value)
                  setROL_id_rol(id.id_rol)

                }}
              >
                <option selected className="text-center">
                  --Seleccionar--
                </option>
                {
                  roles.map(item => {
                    return (
                      <option
                        className="text-center"
                        value={JSON.stringify(item)}
                        key={item.id_rol}
                      >
                        { item.descripcion}
                      </option>
                    )
                  })
                }
              </select>

              <div className="mt-3">
                <button className="btn btn-success form-control">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AgregarUsuario
