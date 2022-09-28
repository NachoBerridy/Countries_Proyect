import React from "react"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import Countries from "../countries/countries"
import FilterBar from "../filterBar/filterBar.jsx"
import { getCountries, sortCountries} from "../../redux/actions"
import Pagination from "../pagination/pagination.jsx"
import style from './home.module.css'
import { Link  } from "react-router-dom"
import About from "../about/about"
import moto from '../../assets/moto.svg'
import ActivitiesList from "../activitiesList/activitiesList"


const Home = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.filteredCountries)
  const [firstCountry, setFirstCountry] = useState(0)
  const [lastCountry, setLastCountry] = useState(9)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

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
  

  useEffect(() => {
    setFirstCountry(0)
    setLastCountry(10)
    setPage(1)
  }, [countries, countries.length])

  useEffect(() => {
  }, [firstCountry, lastCountry, page])

  
  return (
    <div>
      <div className={style.container}>
        <span className={style.title}>LET'S TRAVEL</span>
        <Link to= '/createActivity' className={style.post}>
          <img src={moto} alt="qwe" />
          <h3>Create Activity</h3>
        </Link>  
        <div>
          <FilterBar />
          <div className={style.nav}>
            <select name="" id="" onChange={ordenar}>
              <option value="disorder">Sort By</option>
              <option value="A-Z" >↑ A-Z</option>
              <option value="Z-A" >↓ Z-A</option>
              <option value="morePopulation" >↑ Population</option>
              <option value="lessPopulation" >↓ Population</option>
            </select>
            <Pagination className={style.pagination} countriesPerPage={10} totalCountries={countries.length} page = {page} paginate = {paginate}/>
          </div>
        </div>
        <Countries countries={countries} firstCountry={firstCountry} lastCountry={lastCountry}/>   
        <About />               
      </div>
    </div>
  )
}

export default Home