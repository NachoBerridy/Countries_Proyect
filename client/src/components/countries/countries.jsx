import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import CountryCard from "../countryCard/countryCard";
import FilterBar from "../filterBar/filterBar.jsx";
import { getCountries, getActivities} from "../../redux/actions";


const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.filteredCountries);
  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
  }, [countries]);

  return (
    <div>
      <h1>Countries</h1>
      <FilterBar/>
      <ul>
        {countries.map((country) => (<CountryCard country={country}/>))}
        
      </ul>
    </div>
  );
}

export default Countries