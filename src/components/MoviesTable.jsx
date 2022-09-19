import React from 'react';
import { Link } from 'react-router-dom';
import Like from './common/Like';
import Table from './common/Table';
import auth from '../services/authService';

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
   const columns = [
      { 
         path: 'title', 
         label: 'Title',
         content: movie => (
            <Link className='custom-link' to={`/movies/${movie._id}`}>{movie.title}</Link>
         )
      },
      { path: 'genre.name', label: 'Genre'},
      { path: 'numberInStock', label: 'Stock'},
      { path: 'dailyRentalRate', label: 'Rate'},
      { 
         key: 'liked', 
         content: movie => (
            <Like liked={movie.liked} onLikeToggle={() => onLike(movie)}/> 
         )
      }
   ];

   const deleteColumn = {
      key: 'delete', 
      content: movie => (
         <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie)}>Delete</button>
      )
   };

   const showDeleteColumn = movie => {
      const user = auth.getCurrentUser();
      if (user && user.isAdmin) return columns.push(deleteColumn);
   }
   showDeleteColumn();

   return (
      <Table 
         data={movies}
         columns={columns}
         onSort={onSort}
         sortColumn={sortColumn}
      />
   );
}
 
export default MoviesTable;