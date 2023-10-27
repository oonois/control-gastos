import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"



const ControlPresupuesto = ({presupuesto, gastos}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(()=>{
    const totalGastado = gastos.reduce((total, gastos) => gastos.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado


    const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto)* 100).toFixed(2)

    
    
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)

  }, [gastos])


  const formatearPresupuesto = (cantidad)=> {
    return cantidad.toLocaleString('en-US',{
      style: 'currency',
      currency: 'EUR'
    }) 


  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
          <CircularProgressbar 
            styles={buildStyles({
              pathColor: '#3b82f6', 
              trailColor:'#f5f5f5', 
              textColor: '#3b82f6'
            })}
            value= {porcentaje}
            text = {`${porcentaje}% Gastado`}
          
          />

          
        </div>
        <div className="contenido-presupuesto">
          <p>
            <span>Presupuesto: </span>{formatearPresupuesto(presupuesto)}
          </p>
          <p>
            <span>Disponible: </span>{formatearPresupuesto(disponible)}
          </p>
          <p>
            <span>Gastado: </span>{formatearPresupuesto(gastado)}
          </p>
        </div>
      </div>
  )
}

export default ControlPresupuesto