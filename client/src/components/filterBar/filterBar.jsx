import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getActivities, filterCountriesByActivity, filterCountriesByContinent, removeFilter} from "../../redux/actions"
import CountryCard from "../countryCard/countryCard"

const FilterBar = () => {
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activities).map(a => a.name)
  const continents = useSelector(state => state.countries).map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i)
  
  
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])
  
  const filterByActivity = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      dispatch(removeFilter())
    } else if (e.target.value !== 'all') {
      dispatch(filterCountriesByActivity(e.target.value))
    }
  }
  


  const filterByContinent = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      dispatch(removeFilter())
    } else if (e.target.value !== 'all') {
      dispatch(filterCountriesByContinent(e.target.value))
    }
  }

 

  
  return (
      <div>
        <ul>
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
        </ul>
      </div>
    )
}

export default FilterBar