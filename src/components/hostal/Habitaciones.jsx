import React, { useState } from 'react'
import { BiBed } from 'react-icons/bi'
import '../css/habitaciones.css'
const Habitaciones = () => {
  const habitacion = [

    { numero: "101", disponible: true },
    { numero: "102", disponible: true },
    { numero: "103", disponible: false },
    { numero: "104", disponible: true },
    { numero: "105", disponible: true },
    { numero: "201", disponible: true },
    { numero: "202", disponible: false },
    { numero: "203", disponible: true },
    { numero: "204", disponible: true },
    { numero: "205", disponible: false },
    { numero: "301", disponible: true },
    { numero: "302", disponible: true },
    { numero: "303", disponible: false },
    { numero: "304", disponible: true },
    { numero: "305", disponible: false },
  ]


  return (

    <div>
      <div className="container contenedor-habitaciones ">

        <div className="row justify-content-center">

        
          {
        habitacion.map(item => {
         return (
          <div className={ item.disponible === true ? "col-lg-2 mt-2 text-center contenedor-habi-num" : "col-lg-2 mt-2 text-center contenedor-habi-num-ocupado"} key={item.numero} >
          <h5>Habitacion</h5>
          <h6 className="text-center">{item.numero }</h6>
          
            <BiBed className="ico-habitacion" />
            <h6 className="text-center" >{item.disponible === true ? 'Disponible' : 'Ocupado'}</h6>
          </div>
         )
        })
      }
           
      </div>
      </div>

      {/* <div className="container text-center mt-5">
        <h1>Habitaciones</h1>
      </div>

      <div className="container contenedor-habitaciones ">

        <div className="row justify-content-center">

          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">101</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">102</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">103</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">104</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">105</h4>
            <BiBed className="ico-habitacion" />
          </div>

        </div>
        <div className="row justify-content-center mt-2">

          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">201</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">202</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">203</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">204</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">205</h4>
            <BiBed className="ico-habitacion" />
          </div>

        </div>
        <div className="row justify-content-center mt-2">

          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">301</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">302</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">303</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">304</h4>
            <BiBed className="ico-habitacion" />
          </div>
          <div className="col-lg-2 text-center contenedor-habi-num">
            <h4 className="text-center">305</h4>
            <BiBed className="ico-habitacion" />
          </div>

        </div>
      </div> */}


    </div>
  )
}

export default Habitaciones
