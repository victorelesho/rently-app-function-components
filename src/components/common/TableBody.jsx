import React from 'react';
import _ from 'lodash';

const TableBody = ({ data, columns, valueProperty }) => {
   const renderCell = (item, column) => {
      if (column.content)
         return column.content(item);

      // used lodash to get nested properties of an object dynamically; 
      // the square notation works for only non-nested properties
      return _.get(item, column.path); 
   };

   const createKey = (item, column) => {
      return item[valueProperty] + (column.path || column.key)
   };

   return (
      <tbody>
         {data.map(item => (
            <tr key={item._id}>
               {columns.map(column => (<td key={createKey(item, column)}>{renderCell(item, column)}</td>))}
            </tr>
         ))}
      </tbody>
   );
}

// setting the property to be used more flexibly with this reusable component
TableBody.defaultProps = {
   valueProperty: '_id'
};
 
export default TableBody;