import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Countries = () => {
    
    const [countries, setCountries] = useState([]);
    

    useEffect(() => {
      const fetchCountry = async () => { 
        const { data } = await axios.get('http://localhost:3001/countries');
        setCountries(data);
      }
  
      fetchCountry();
    }, [])

    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.id}>
                        <h3>{country.name}</h3>
                        <p>Continent: {country.continent}</p>
                        <img src={country.flag} alt="Country Flag" width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Countries;