import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import CountryCard from "../countryCard/countryCard";
import FilterBar from "../filterBar/filterBar.jsx";
import { getCountries, getActivities} from "../../redux/actions";
import Pagination from "../pagination/pagination.jsx";


const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.filteredCountries);
  const [firstCountry, setFirstCountry] = useState(0);
  const [lastCountry, setLastCountry] = useState(9);

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities());

  }, [dispatch]);

  useEffect(() => {
    console.log(countries.length)
    
  }, [countries]);

  const paginate = (number) => {
    setFirstCountry(number * 10);
    setLastCountry((number + 1) * 10);
  };

  return (
    <div>
      <h1>Countries</h1>
      <FilterBar/>
      <Pagination countriesPerPage={10} totalCountries={countries.length} paginate = {paginate}/>
      <div className="countries">
        {countries.slice(firstCountry,lastCountry).map((country) => (
            <CountryCard country={country}/>
        ))}
      </div>
    </div>
  );
}

export default Countries