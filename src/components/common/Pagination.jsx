import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1); // we use lodash to generate an array from 1... to pagesCount. 
    // remember to add previous and next button here as a personal excercise
    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {
                    pages.map(page => (
                        <li className={ page === currentPage ? 'clickable page-item active' : 'clickable page-item'} key={page}>
                            <a className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

// property type checking using prop-types liberary
Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired, 
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired
};
 
export default Pagination;