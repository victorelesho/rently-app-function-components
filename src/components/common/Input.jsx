import React, { useContext } from 'react';
import FormContext from '../../context/formContext';

const Input = ({ label, name, type = 'text' }) => {
   const { data, errors, handleChange } = useContext(FormContext);

   return (
      <div className="mb-3">
         <label htmlFor={name} className="form-label">{label}</label>
         <input value={data[name]} onChange={handleChange} type={type} className="form-control" id={name} name={name} />
         {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
   );
}
 
export default Input;