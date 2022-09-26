import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getActivities, 
        filterCountriesByActivity, 
        filterCountriesByContinent, 
        removeFilter} from "../../redux/actions"
import africa from '../../assets/africa.svg'
import north_america from '../../assets/north_america.svg'
import south_america from '../../assets/south_america.svg'
import asia from '../../assets/asia.svg'
import europe from '../../assets/europe.svg'
import oceania from '../../assets/australia.svg'
import antartica from '../../assets/Antarctica.svg'


import SearchBar from "../searchBar/searchBar"
import style from './filterBar.module.css'

const FilterBar = () => {
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activities).map(a => a.name)
  const continents = useSelector(state => state.countries).map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i)
  const [remove, setRemove] = React.useState(true)
  
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])
  
  const filterByActivity = (e) => {
    e.preventDefault()
    if (e.target.value === 'all' || e.target.value === 'Remove Filters') {
      dispatch(removeFilter())
    } else if (e.target.value !== 'all') {
      dispatch(filterCountriesByActivity(e.target.value))
      setRemove(false)
    }
  }
  


  const filterByContinent = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      dispatch(removeFilter())
      setRemove(true)
    } else if (e.target.value !== 'all') {
      dispatch(filterCountriesByContinent(e.target.value))
      setRemove(false)
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
          <div>
            <select name="" id="" onChange={filterByActivity}>
              <option value="all">Filter By Activity</option>
                {activities.length?activities.map((activity) => (
                  <option value={activity}>{activity}</option>
                )):null}
            </select>
            <select name="" id="" onChange={filterByContinent}>
              <option value="all">Filter By Continent</option>
              {continents.length?continents.map((continent) => (
                <option value={continent}>{continent}</option>
              )):null}
            </select>
            <input type='button' value='Remove Filters' onClick={filterByActivity} className={style.remove} disabled={remove}/>
          </div>
        </div>
      </div>
    )
}

export default FilterBar