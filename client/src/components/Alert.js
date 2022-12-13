import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return(
          // This is to chech the changing
         <div className={`alert alert-${alertType}`}>{alertText}</div>
      )

  
}

export default Alert
