import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie, likeMovie } from './../services/movieService';
import Pagination from './common/Pagination';
import paginate from '../utils/paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from './../services/genreService';
import MoviesTable from './MoviesTable';
import SearchBox from './SearchBox';
import _ from 'lodash';

const Movies = ({ user }) => {
    const [pages, setPages] = useState({ 
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        searchQuery: '',
        sortColumn: { path: 'title', order: 'asc'}
    });
    const [allMovies, setAllMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const populateMovies = async () => {
            const { data } = await getMovies();
            setAllMovies(data);
        };

        const populateGenres = async () => {
            const { data } = await getGenres();
            const allGenres = [{_id: '', name: 'All Genres'}, ...data];
            setGenres(allGenres);
        };

        populateGenres();
        populateMovies();
    }, []);

    const handleDelete = async movie => {
        const originalMovies = [...allMovies];
        const filter = originalMovies.filter(m => m._id !== movie._id);
        setAllMovies(filter);

        try {
            await deleteMovie(movie._id);
        } catch (error) {
            if (error.response && error.response.status === 404)
                toast.error('This movie has already been deleted.');

            setAllMovies(originalMovies);
        } 
    };

    const handleLike = movie => {
        const allMoviesClone = [...allMovies];
        const index = allMoviesClone.indexOf(movie);
        allMoviesClone[index] = { ...allMoviesClone[index] };
        allMoviesClone[index].liked = !allMoviesClone[index].liked;
        setAllMovies(allMoviesClone);

        likeMovie(movie._id);
    };

    const handlePageChange = page => {
        const pagesClone = {...pages};
        pagesClone.currentPage = page;
        setPages(pagesClone);
    };

    const handleGenreSelect = genre => {
        const pagesClone = {...pages};
        pagesClone.selectedGenre = genre;
        pagesClone.currentPage = 1;
        pagesClone.searchQuery = '';
        setPages(pagesClone);
    };

    const handleSort = (path, order) => {
        const pagesClone = {...pages};
        pagesClone.sortColumn = { path, order };
        setPages(pagesClone);
    };

    const handleSearch = query => {
        const pagesClone = {...pages};
        pagesClone.searchQuery = query;
        pagesClone.selectedGenre = null;
        pagesClone.currentPage = 1;
        setPages(pagesClone);
    };

    const getPagedData = () => {
        const filteredMovie = () => {
            if (pages.searchQuery) 
                return allMovies.filter(m => m.title.toLowerCase().startsWith(pages.searchQuery.toLowerCase()));
            if (pages.selectedGenre && pages.selectedGenre._id) 
                return allMovies.filter(m => m.genre._id === pages.selectedGenre._id);
            return allMovies;
        };
        const result = filteredMovie();
   
        // used lodash to handle sorting
        const sorted = _.orderBy(result, [pages.sortColumn.path], [pages.sortColumn.order]);
    
        // used lodash to process paginate function
        const movies = paginate(sorted, pages.currentPage, pages.pageSize); 
        
        const countMessage = (result.length === 0) 
            ? 'There are no movies in the database' 
            : `Showing ${result.length} movies in the database.`;

        return { totalCount: result.length, movies, countMessage };
    };

    const { totalCount, movies, countMessage } = getPagedData();

    return (
        <div className="row">
            <div className="col-3">
                <ListGroup 
                    items={genres}
                    selectedItem={pages.selectedGenre}
                    onItemSelect={handleGenreSelect}
                />
            </div>
            
            <div className="col">
                {user && (
                    <Link to='/movies/new' className="btn btn-primary" style={{ marginBottom: 20 }}>
                        New Movie
                    </Link>
                )}
                <p>{countMessage}</p>
                <SearchBox onChange={handleSearch} value={pages.searchQuery}/>
                <MoviesTable 
                    movies={movies}
                    sortColumn={pages.sortColumn}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onSort={handleSort}
                />
                <Pagination 
                    onPageChange={handlePageChange} 
                    itemsCount={totalCount} 
                    pageSize={pages.pageSize}
                    currentPage={pages.currentPage}
                />
            </div> 
        </div>
    );
}
 
export default Movies;



// never update a state without using either the setState method or it’s equivalent method in useState hook
// when performing any task that will involve updating the state: 
// never read the properties of a state directly, it may lead to bugs due to the asynchronous nature of JS and React-
// instead, clone it and do whatever you wish with the cloned version, then update the state afterwards

// the function to handle a event should be implemented in the component that houses the state 