import "./index.css"
import TextField from '@mui/material/TextField';
const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className='form-row'>
        {/* <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label> */}
        {/* <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-input'
        /> */}
         <TextField style={{marginBottom:"40px"}} fullWidth label={labelText} id="fullWidth"   type={type}
          value={value}
          name={name}
          onChange={handleChange}
           />
      </div>
    )
  }
  
  export default FormRow
  