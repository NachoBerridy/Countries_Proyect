import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import style from "./country.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import home from "../../assets/homeButton.svg";
import back from "../../assets/back.svg";
import capital from "../../assets/capital.svg";
import population from "../../assets/population.svg";
import area from "../../assets/area.png";
import continent from "../../assets/continent.svg";

const Country = () => {
  const [country, setCountry] = useState([]);
  const { countryName } = useParams();
  const [flip, setFlip] = useState(true);


  
  useEffect(() => {  
    const fetchCountry = async () => { 
      const { data } = await axios.get(`http://localhost:3001/countries/${countryName}`)
      setCountry(data[0]);
    }
    fetchCountry();
  }, [countryName]);

  console.log("🚀 ~ file: country.jsx ~ line 7 ~ Country ~ country", country)
  console.log(country.activities)

  return (
    <div className={style.container}>
      <Link to='/Home' className={style.home}>
        <img src={home} alt="home" />
      </Link>
      <div className={style.card}>
        {flip?
          <div>
              <h1>{country.name}</h1>
              <img src={country.flag} alt="Country Flag" width="200" />
              <div className={style.info}>
                <div>
                  <img src={capital} alt="capital" />
                  <h4>Capital: </h4>
                  <p>{country.capital}</p>
                </div>
                <div>
                  <img src={population} alt="population" />
                  <h4>Population: </h4>
                  <p>{country.population}</p>
                </div>
                <div>
                  <img src={area} alt="area" />
                  <h4>Area: </h4>
                  <p>{country.area} km<sup>2</sup></p>
                </div>
                <div>
                  <img src={continent} alt="continent" />
                  <h4>Continent: </h4>
                  <p>{country.continent}</p>
                </div>

                {((country.subregion !== country.continent) && country.subregion)?
                  <div>
                    <h4>Subregion: </h4>
                    <p>{country.subregion}</p>
                  </div>
                :null}
              </div>
              <button onClick={()=>setFlip(!flip)} className={style.actBtn}>Activities</button>
          </div>:
          <div className={style.back}>
            <h1>{country.name}</h1>
            <h3>Activities</h3>
            {country.activities?country.activities.map((activity) => (
              <div className={style.activity}>
                  <h3>{activity.name}</h3>
                  <div className={style.actInfo}>
                    <p>Difficulty level: {activity.difficulty}</p>
                    <p>Duration: {activity.duration} weeks</p>
                    <p>Season: {activity.season}</p>
                    <p>like: {activity.like}</p>
                  </div>
                {Boolean(activity.image)? 
                  <img src={activity.image} alt="Activity" width="200" />
                  :<img src="https://images.unsplash.com/photo-1523867904486-8153c8afb94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDA3MzkxNQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" alt="imagen" />
                }
              </div>
            )): null}
          <button onClick={()=>setFlip(!flip)} className={style.return}>
            <img src={back} alt="back" />
          </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Country;