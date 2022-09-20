import React from "react";
import { Link } from "react-router-dom";
import style from "./countryCard.module.css";

const CountryCard = ({country}) => {
    let path = `/countries/${country.name}`
    return (
      <Link to = {path} className={style.container}>
          <div>
            <li key={country.id} className = {style.li}>
              <h3>{country.name.toUpperCase()}</h3>
                <img src={country.flag} alt="Country Flag" width="200" />
                <h5>{country.continent.toUpperCase()}</h5>
            </li>  
          </div>
      </Link>
    );
}

export default CountryCard;