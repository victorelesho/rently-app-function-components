import React, { useContext } from 'react';
import FormContext from '../../context/formContext';

const Select = ({ label, name, options })  => {
   const { data, errors, handleChange } = useContext(FormContext);

   const editingData = () => {
      const targetProperty = data[name];
      if (!targetProperty) return {
         optionName: '',
         optionId: ''
      };  

      const targetOption = options.find(option => option._id === targetProperty);
      return {
         optionName: targetOption.name,
         optionId: targetOption._id
      };
   };

   const { optionName, optionId } = editingData();

   return (
      <div className="mb-3">
         <label htmlFor={name} className="form-label">{label}</label>
         <select className="form-select" name={name} id={name} onChange={handleChange}>
            <option value={optionId}>{optionName}</option>
            {options.filter(option => option._id !== optionId).map(option => <option value={option._id} key={option._id}>{option.name}</option>)}
         </select>
         {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
   );
}
 
export default Select;


