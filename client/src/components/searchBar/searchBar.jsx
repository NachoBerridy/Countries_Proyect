import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../redux/actions";
import style from './searchBar.module.css'
import lupa from './lupa.svg'

const SearchBar = () => {
    const dispatch = useDispatch();


    const [country, setCountry] = useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        try{
          dispatch(searchCountry(country))
        }catch(err){
          alert('Country not found')
        }
      }
    
      const handleChange = (e) => {
        e.preventDefault()
        setCountry(e.target.value)
      }
    return (
        <form action="" method="get" className={style.search} >
            <input type="search" name="" id="" value={country} onChange={handleChange} placeholder = 'Search by name' />
            <button type="submit" onClick={handleSearch}>
                <img src={lupa} alt="lupa"/>
            </button>
        </form>
    );
}

export default SearchBar;