import React from 'react';

const FormContext = React.createContext({
   data: {},
   schema:{},
   errors: {},
   handleChange: () => {}
});  
FormContext.displayName = 'FormContext';

export default FormContext;