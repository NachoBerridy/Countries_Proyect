import React from "react";

const Pagination = ({ countriesPerPage, totalCountries, paginate }) => {
    
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav>
        <ul className="pagination">
           {pageNumbers.map(number => (<button onClick={() => {paginate(number-1)}}>{number}</button>))}
        </ul>
        </nav>
    );
}

export default Pagination;