import React from 'react';

const ListGroup = ({ items, onItemSelect, selectedItem, textProperty, valueProperty }) => {
   return (
      <ul className="list-group">
         {items.map(item => (
            <li className={(item === selectedItem) ? "clickable list-group-item active" : "clickable list-group-item"} 
               key={item[valueProperty]} 
               onClick={() => onItemSelect(item)}>
                  {item[textProperty]}
            </li>
         ))}  
      </ul>
   );
}

// setting the properties to be used more flexibly with this reusable component
ListGroup.defaultProps = {
   textProperty: 'name',
   valueProperty: '_id'
};
 
export default ListGroup;
