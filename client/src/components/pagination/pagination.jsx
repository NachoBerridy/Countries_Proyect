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
        <input type="button" onClick={() => {paginate(1)}} value='<<'/>
        {page > 1 && <input type="button" onClick={() => {paginate(page-1)}} value='<'/>}
        {
          conditional(page).map(number => (<button onClick={() => {paginate(number)}} className = {(page===number)?style.selected:style.numbers}>{number}</button>))
        }
        {page<totalPages && <input type="button" onClick={() => {paginate(page+1)}} value='>'/>}
        {/* <button onClick={() => {paginate(totalPages-1)}}> {'>>'} </button> */}
        <input type="button" onClick={() => {paginate(totalPages)}} value='>>'/>
      </nav>
    )
}

export default Pagination