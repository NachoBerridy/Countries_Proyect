import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import style from "./country.module.css";
import home from "../../assets/homeButton.svg";
import back from "../../assets/back.svg";
import capital from "../../assets/capital.svg";
import population from "../../assets/population.svg";
import area from "../../assets/area.png";
import continent from "../../assets/continent.svg";

const Country = () => {

  //Obtengo el nombre del país
  const { countryName } = useParams();
  
  const defaultImage = useSelector(state => state.defaultActivityImage)
  
  //Estados locales
  const [country, setCountry] = useState([]);
  const [flip, setFlip] = useState(true);

  //Función que obtiene los datos cuando se renderiza el componente

  useEffect(() => {  
    const fetchCountry = async () => { 
      const { data } = await axios.get(`http://localhost:3001/countries/${countryName}`)
      setCountry(data[0]);
    }
    fetchCountry();
  }, [countryName]);


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
                  </div>
                {Boolean(activity.image)? 
                  <img src={activity.image} alt="Activity" width="200" />
                  :<img src={defaultImage} alt="imagen" />
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