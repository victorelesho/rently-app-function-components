import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';
import Input from './common/Input';
import Form from './common/Form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Select from './common/Select';

const MovieForm = () => {
   const movieId = useParams().id;
   const navigate = useNavigate();

   const [genres, setGenres] = useState([]);
   const [movieData, setMovieData] = useState({
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
   });

   const populateGenres = async () => {
      const { data } = await getGenres();
      setGenres(data);
   }

   const populateMovie = async () => {
      try {
         if (movieId === 'new') return; 
         const { data: movie } = await getMovie(movieId); 
         setMovieData(mapToViewModel(movie));
      } catch (error) {
         if(error.response && error.response.status === 404) 
         navigate('/not-found', { replace: true }); // equivalent to history.replace
      } 
   }

   const mapToViewModel = (movie) => {
      return {
         _id: movie._id,
         title: movie.title,
         genreId: movie.genre._id,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate
      };
   }
    
   useEffect(() => {
      populateMovie();
      populateGenres();
   }, []);

   const movieSchema = {
      _id: Joi.string(),
      title: Joi.string().required().label('Title'),
      genreId: Joi.string().required().label('Genre Id'),
      numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
      dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
   };

   const doSubmit = async (movie) => {
      await saveMovie(movie);
      navigate('/movies');
   };
   
   return (
      <div>
         <h1>Movie Form </h1>
         <Form formData={movieData} formSchema={movieSchema} doSubmit={doSubmit} submitButton='Save'>
            <Input 
               label='Title'
               name='title' 
            />
            <Select  
               label='Genre' 
               name='genreId'
               options={genres}
            />
            <Input 
               label='Number in Stock'
               name='numberInStock' 
            />
            <Input  
               label='Rate' 
               name='dailyRentalRate' 
            />
         </Form>
      </div>
   );
}
 
export default MovieForm;