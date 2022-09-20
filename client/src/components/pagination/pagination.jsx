import React from "react";

const Pagination = ({ countriesPerPage, totalCountries, paginate, page }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const conditional = (page) => {
        if (page <= 3) {
          return pageNumbers.splice(0, 6);
        } else if (page >= pageNumbers.length-3) {
          return pageNumbers.splice(pageNumbers.length - 6, pageNumbers.length);
        } else {
          return pageNumbers.splice(page - 3, page + 3);
        }
      };


    
    return (
      <nav>
        {
          conditional(page).map(number => (<button onClick={() => {paginate(number-1)}}>{number}</button>))
        }
      </nav>
    );
}

export default Pagination;