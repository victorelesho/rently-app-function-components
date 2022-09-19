import React from 'react';

const TableHeader = ({ columns, sortColumn, onSort }) => {
   const raiseSort = path => {
      const sortOrder = () => {
         if (sortColumn.path === path)
            return (sortColumn.order === 'asc') ? 'desc' : 'asc';
         return 'asc';
      };

      onSort(path, sortOrder());
   };

   const renderSortIcon = (column) => {
      if (column.path === sortColumn.path && !column.key) {
         if (sortColumn.order === 'asc') 
            return <i className="fa fa-sort-asc" />;
         return <i className="fa fa-sort-desc" />;
      };
   };

   return (
      <thead>
         <tr>{columns.map(column => (
            <th className="clickable" onClick={() => raiseSort(column.path)} key={column.path || column.key}>
               {column.label} {renderSortIcon(column)}
            </th>
         ))}
         </tr>
      </thead>
   );
}
 
export default TableHeader;