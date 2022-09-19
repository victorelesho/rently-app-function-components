import React, { useState, useEffect }  from 'react';
import Joi from 'joi-browser';
import FormContext from '../../context/formContext';

const Form = (props) => {
   const { children, formData, formSchema, doSubmit, submitButton } = props;
   
   const [data, setData] = useState(formData);
   const [errors, setErrors] = useState({});

   useEffect(() => {
      try {
         setData(formData);
      } catch (error) {}
      
   }, [formData]);

   const schema = formSchema;

   const validate = () => {
      const options = { abortEarly: false };
      const { error } = Joi.validate(data, schema, options);
      if (!error) return null;

      const errorsObject = {};
      for (let item of error.details)
         errorsObject[item.path[0]] = item.message;
      return errorsObject;
   }

   const validateProperty = ({ name, value }) => {
      const propertyObject = { [name]: value };
      const propertySchema = { [name]: schema[name] };
      const { error } = Joi.validate(propertyObject, propertySchema);
      return error ? error.details[0].message : null;
   }

   const handleSubmit = e => {
      e.preventDefault();

      const errorsObject = validate();
      setErrors(errorsObject || {});
      if (errorsObject) return;

      doSubmit(data);
   }

   const handleChange = ({ currentTarget: input }) => {
      const errorsClone = {...errors};
      const errorMessage = validateProperty(input);
      if (errorMessage) errorsClone[input.name] = errorMessage;
      else delete errorsClone[input.name];
      setErrors(errorsClone);

      const dataClone = {...data};
      dataClone[input.name] = input.value;
      setData(dataClone); 
   }
   
   return (
      <form onSubmit={handleSubmit}>
         <FormContext.Provider value={{ 
            data,
            schema,
            errors,
            handleChange
         }}>
            {children}
         </FormContext.Provider>
         <button type="submit" className="btn btn-primary" disabled={validate()}>{submitButton}</button>
      </form>
   );
}
 
export default Form;