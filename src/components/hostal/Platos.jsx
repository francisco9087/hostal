import React from 'react'

const Platos = () => {
  const minuta = [
    
          { id: 1, tipo: 'Lomo saltado', ensaladas:[{tipo:'lechuga'},{tipo:'Repollo'},{tipo:'tomate'}] },
          { id: 2, tipo: 'Ensalada Cesar' },
          { id: 3, tipo: 'Milanesas con Guarnicion' },
          { id: 4, tipo: 'Pastas con salsa' },
          { id: 5, tipo: 'Pollo deshuesado con guarnición' },
          { id: 6, tipo: 'Carne de vaca o cerdo al horno con guarnición' },
    
  ]

  // ]
  //   {
  //     id:1,
  //     servicio: {
  //       ejecutivo: [
  //         { id: 1, tipo: 'Lomo saltado' },
  //         { id: 2, tipo: 'Ensalada Cesar' },
  //         { id: 3, tipo: 'Milanesas con Guarnicion' },
  //         { id: 4, tipo: 'Pastas con salsa' },
  //         { id: 5, tipo: 'Pollo deshuesado con guarnición' },
  //         { id: 6, tipo: 'Carne de vaca o cerdo al horno con guarnición' },
  //         { id: 7, tipo: 'Suprema de ave marinada a las finas llervas' }
  //       ],
  //       ensalada: {
  //         tipo: [
  //           { id: 1, tipo: "Ensalada Mexica con pollo" },
  //           { id: 2, tipo: "Ensalada Mediterranea" },
  //           { id: 3, tipo: "Ensalada dulce con quinoa" },
  //           { id: 4, tipo: "Ensalada Griega" }
  //         ]
  //       }
  //     }
  //   }
  // ]


  return (
    <div>
      {
        minuta.map((item) => {
          
          return(
            <ul key={item.id}>
            
              <li>{item.id +' ' +item.tipo }</li>
            </ul>
          )


        })
      }
    </div>
  )
}

export default Platos



