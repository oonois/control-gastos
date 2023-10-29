import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"



const ControlPresupuesto = ({
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto,
  gastos, 
  setGastos
}) => {

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

  const handleResetApp = () => {
    const resultado = confirm('deseas reiniciar presupuesto y los gastos?');

    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
      
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
          <CircularProgressbar 
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6', 
              trailColor:'#f5f5f5', 
              textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6'
            })}
            value= {porcentaje}
            text = {`${porcentaje}% Gastado`}
          
          />

          
        </div>
        <div className="contenido-presupuesto">
          <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
          >
            Resetear planificador
          </button>
          <p>
            <span>Presupuesto: </span>{formatearPresupuesto(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? 'negativo' : ''}`}>
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