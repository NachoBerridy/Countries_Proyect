import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import africa from '../../assets/africa.svg'
import north_america from '../../assets/north_america.svg'
import south_america from '../../assets/south_america.svg'
import asia from '../../assets/asia.svg'
import europe from '../../assets/europe.svg'
import oceania from '../../assets/australia.svg'
import antartica from '../../assets/Antarctica.svg'
import SearchBar from "../searchBar/searchBar"
import style from './filterBar.module.css'
import Select from 'react-select'
import {getActivities, 
        filterCountriesByActivity, 
        filterCountriesByContinent, 
        removeFilter} from "../../redux/actions"

const FilterBar = () => {
  const dispatch = useDispatch()

  //Estados globales
  const filter = useSelector(state => state.filter)
  const currentContinent = useSelector(state => state.currentContinent)
  const currentActivity = useSelector(state => state.currentActivity)
  const activities = useSelector((state) => state.activities).map(a => a.name)
  const continents = useSelector(state => state.countries).map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i)


  //Referencias
  const selectContinentRef = useRef()
  const selectActivityRef = useRef()
  
  //UseEffect

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  useEffect(() => {
    currentActivity?((selectActivityRef.current.value = currentActivity)): selectActivityRef.current.value = "all"
    // currentContinent?(selectContinentRef.current.value = currentContinent): selectContinentRef.current.value = "all"
    selectContinentRef.current.value = "all"
  }, [currentActivity, currentContinent])

  //Funciones de filtrado

  const filterByActivity = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      dispatch(removeFilter())
    }else if (e.target.value !== 'all') {
      dispatch(filterCountriesByActivity(e.target.value))
    }
  }

  const removeFilters = (e) => {
    e.preventDefault()
    dispatch(removeFilter())
  }
  

  const filterByContinent = (e) => {
    e.preventDefault(e.target.value)
    if (e.target.value === 'all') {
      console.log('all')
      dispatch(removeFilter('continent'))
    } else if (e.target.value !== 'all') {
      dispatch(filterCountriesByContinent(e.target.value))
    }
  }



  return (
      <div className={style.bar}>
        <SearchBar/>
        <div className={style.filters}>
          <div className={style.continents}>
            <input type="image" src={africa} value = 'Africa' alt="africa" onClick={filterByContinent}/>
            <input type="image" src={north_america} value = 'North America' alt="north_america" onClick={filterByContinent}/>
            <input type="image" src={south_america} value = 'South America' alt="south_america" onClick={filterByContinent}/>
            <input type="image" src={asia} value = 'Asia' alt="asia" onClick={filterByContinent}/>
            <input type="image" src={europe} value = 'Europe' alt="europe" onClick={filterByContinent}/>
            <input type="image" src={oceania} value = 'Oceania' alt="oceania" onClick={filterByContinent}/>
            <input type="image" src={antartica} value = 'Antarctica' alt="antartica" onClick={filterByContinent}/>
          </div>
          <div className={style.selectors}>
            <div className={style.groupFilter}>
              <select name="" id="" onChange={filterByActivity} ref={selectActivityRef}>
                <option value="all">Filter By Activity</option>
                  {activities.length?activities.map((activity) => (
                    <option value={activity}>{activity}</option>
                  )):null}
              </select>
              {currentActivity?<button onClick={filterByActivity} value='all'>{currentActivity} | X</button>:null}
            </div>
            <div className={style.groupFilter}>
              <select name="" id="" onChange={filterByContinent} ref={selectContinentRef}>
                <option value="all">Filter By Continent</option>
                {continents.length?continents.map((continent) => (
                  <option value={continent}>{continent}</option>
                )):null}
              </select>
              {currentContinent?<button onClick={filterByContinent} value = 'all'>{currentContinent} | X</button>:null}
            </div>
            <input type='button' value='Remove Filters' onClick={removeFilters} className={style.remove} disabled={filter}/>
          </div>
        </div>
      </div>
    )
}

export default FilterBar


