import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const Country = () => {
  const [country, setCountry] = useState([]);
  const { countryName } = useParams();


  
  useEffect(() => {  
    const fetchCountry = async () => { 
      const { data } = await axios.get(`http://localhost:3001/countries/${countryName}`)
      setCountry(data[0]);
    }
    fetchCountry();
  }, [countryName]);

  console.log("🚀 ~ file: country.jsx ~ line 7 ~ Country ~ country", country)
  
  return (
    <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Continent: {country.continent}</p>
        <ul>
          {country.activities?.map((activity) => (
            <li>
              <h4>{activity.name}</h4>
              <p>{activity.difficulty}</p>
              <p>{activity.duration}</p>
              <p>{activity.season}</p>
            </li>
          ))}
        </ul>
        <img src={country.flag} alt="Country Flag" width="200" />
    </div>
  );
}

export default Country;