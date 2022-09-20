import React from "react"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import Countries from "../countries/countries"
import FilterBar from "../filterBar/filterBar.jsx"
import { getCountries, sortCountries, searchCountry} from "../../redux/actions"
import Pagination from "../pagination/pagination.jsx"
import style from './home.module.css'


const Home = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.filteredCountries)
  const [firstCountry, setFirstCountry] = useState(0)
  const [lastCountry, setLastCountry] = useState(9)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const [country, setCountry] = useState('')
  const [order, setOrder] = useState('disorder')
  
  const ordenar = (e) => {
    
    e.preventDefault()
    
    if (order !== e.target.value) {
      dispatch(sortCountries(e.target.value))
      setOrder([e.target.value])
    }else {
      setOrder('disorder')
      dispatch(sortCountries('disorder'))
    }
  }


  const paginate = (number) => {
    setFirstCountry(number * 10 )
    setLastCountry((number + 1) * 10)
    setPage(number + 1)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setCountry(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    try{
      dispatch(searchCountry(country))
    }catch(err){
      alert('Country not found')
    }
  }
  

  useEffect(() => {
    setFirstCountry(0)
    setLastCountry(10)
    setPage(1)
  }, [countries, countries.length])

  useEffect(() => {
  }, [firstCountry, lastCountry, page])

  
  return (
    <div className={style.container}>
      <h1>Countries</h1>
      <form action="" method="get">
            <input type="search" name="" id="" value={country} onChange={handleChange}/>
            <button type="submit" onClick={handleSearch}>Search</button>
      </form>
      <select name="" id="" onChange={ordenar}>
            <option value="disorder">Sort By</option>
            <option value="A-Z" >↑ A-Z</option>
            <option value="Z-A" >↓ Z-A</option>
            <option value="morePopulation" >↑ Population</option>
            <option value="lessPopulation" >↓ Population</option>
      </select>
      <FilterBar />
      <Pagination countriesPerPage={10} totalCountries={countries.length} page = {page} paginate = {paginate}/>
      <Countries countries={countries} firstCountry={firstCountry} lastCountry={lastCountry}/>                            
    </div>
  )
}

export default Home