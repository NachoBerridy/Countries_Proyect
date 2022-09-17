import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { sortCountries, filterCountriesByActivity, filterCountriesByContinent} from "../../redux/actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const continents = useSelector(state => state.countries).map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i);
  const activities = useSelector((state) => state.activities).map(a => a.name);

  const [order, setOrder] = useState('disorder');
  
  
  const ordenar = (e) => {
    
    e.preventDefault()
    
    if (order !== e.target.value) {
      dispatch(sortCountries(e.target.value))
      setOrder(e.target.value)
    }else {
      //dispatch(getCountries())
      setOrder('disorder')
    }
  };
  
  const filterByActivity = (e) => {
    e.preventDefault()
    if (activities.includes(e.target.value)) {
      dispatch(filterCountriesByActivity(e.target.value))
    }else {
      //dispatch(getCountries())
    }
  }

  const filterByContinent = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      console.log(e.target.value)
      //dispatch(getCountries())
    }else{
      dispatch(filterCountriesByContinent(e.target.value))
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
            <option value="Default">Filter By</option>
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