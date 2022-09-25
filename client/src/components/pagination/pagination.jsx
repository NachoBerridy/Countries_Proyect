import React from "react"
import style from './pagination.module.css'

const Pagination = ({ countriesPerPage, totalCountries, paginate, page }) => {
    const pageNumbers = []
    const totalPages = Math.ceil(totalCountries / countriesPerPage)
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const conditional = (page) => {
        if (page <= 3) {
          return pageNumbers.slice(0, 6)
        } else if (page >= pageNumbers.length-3) {
          return pageNumbers.slice(pageNumbers.length - 6, pageNumbers.length)
        } else {
          return pageNumbers.slice(page - 3, page + 3)
        }
    }


    
    return (
      <nav>
        <button onClick={() => {paginate(0)}}> {'<<'} </button>
        {page > 1 && <button onClick={() => {paginate(page-2)}}> {'<'}</button>}
        {
          conditional(page).map(number => (<button onClick={() => {paginate(number-1)}} className = {(page===number)?style.selected:null}>{number}</button>))
        }
        {page<totalPages && <button onClick={() => {paginate(page)}}> {'>'} </button>}
        <button onClick={() => {paginate(totalPages-1)}}> {'>>'} </button>
      </nav>
    )
}

export default Pagination