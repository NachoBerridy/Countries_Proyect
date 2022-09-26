import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import style from "./country.module.css";
import home from "./homeButton.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className={style.container}>
      <Link to='/Home' className={style.home}>
        <img src={home} alt="home" />
      </Link>
      <div className={style.card}>
          <h1>{country.name}</h1>
          <img src={country.flag} alt="Country Flag" width="200" />
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Area: {country.area} Km<sup>2</sup></p>
          <p>Subregion: {country.subregion}</p>
          <p>Continent: {country.continent}</p>
          <ul>
            {country.activities?country.activities.map((activity) => (
              <div className={style.activity}>
                <h3>{activity.name}</h3>
                <div>
                  <p>Difficulty level: {activity.difficulty}</p>
                  <p>Duration: {activity.duration} weeks</p>
                  <p>Season: {activity.season}</p>
                </div>
              </div>
            )): null}
          </ul>
      </div>
    </div>
  );
}

export default Country;