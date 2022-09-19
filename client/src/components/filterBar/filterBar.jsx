import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { sortCountries, filterCountriesByActivity, filterCountriesByContinent, removeFilter} from "../../redux/actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const continents = useSelector(state => state.countries).map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i);
  const activities = useSelector((state) => state.activities).map(a => a.name);

  const [continent, setContinent] = useState('');
  const [activity, setActivity] = useState('');
  
  const [order, setOrder] = useState('disorder');
  
  const ordenar = (e) => {
    
    e.preventDefault()
    
    if (order !== e.target.value) {
      dispatch(sortCountries(e.target.value))
      setOrder([e.target.value])
    }else {
      setOrder('disorder')
      dispatch(sortCountries('disorder'))
    }
  };
  
  const filterByActivity = (e) => {
    e.preventDefault()
    dispatch(removeFilter('activity'))
    if (e.target.value === 'all' && e.target.value === activity) {
      setActivity('')
    } else if (e.target.value !== 'all' && e.target.value !== activity) {
      dispatch(filterCountriesByActivity(e.target.value))
      setActivity(e.target.value)
    }
  }
  

  const filterByContinent = (e) => {
    e.preventDefault()
    dispatch(removeFilter('continent'))
    if (e.target.value === 'all' && e.target.value === continent) {
      setContinent('')
    } else if (e.target.value !== 'all' && e.target.value !== continent) {
      dispatch(filterCountriesByContinent(e.target.value))
      setContinent(e.target.value)
    }
  }
  
  return (
      <div>
        <ul>
          <select name="" id="" onChange={ordenar}>
            <option value="disorder">Sort By</option>
            <option value="A-Z" >↑ A-Z</option>
            <option value="Z-A" >↓ Z-A</option>
            <option value="morePopulation" >↑ Population</option>
            <option value="lessPopulation" >↓ Population</option>
          </select>
          <select name="" id="" onChange={filterByActivity}>
          <option value="all">Filter By Activity</option>
            {activities.map((activity) => (
              <option value={activity}>{activity}</option>
            ))}
          </select>
          <select name="" id="" onChange={filterByContinent}>
            <option value="all">Filter By Continent</option>
            {continents.map((continent) => (
              <option value={continent}>{continent}</option>
            ))}
    </select>
        </ul>
      </div>
    );
}

export default FilterBar