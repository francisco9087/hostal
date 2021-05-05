import React, { useState } from 'react'



const Home = () => {

  const [numero, setNumero] = useState(0)
  const [factura, setFactura] = useState(0)
  const [ bloquea, setBloquea] = useState(true)
  const handleClick = () => {
    setNumero(numero + 1)
    handleBloquea()
  }
  const handleBloquea = () => setBloquea(false)
  const handleDesbloquea = () => setBloquea(true)
   
  return (
    <div>
    <div className="container">
    {
      bloquea ? <button onClick={() => handleClick() }>agregar</button> : <button onClick={() => handleClick()} disabled>agregar</button>
    }
    
        <input type="text" value={numero}  disabled/>
        <button onClick={() => handleDesbloquea()}>Enviar</button>
    </div>
      
    </div>
    
  )
}

export default Home
