import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({country}) => {
    let path = `/countries/${country.name}`
    return (
      <React.Fragment>
        <li key={country.id}>
          <h3>{country.name}</h3>
          <p>Continent: {country.continent}</p>
          <Link to = {path}>
            <img src={country.flag} alt="Country Flag" width="200" />
          </Link>
        </li>  
      </React.Fragment>
    );
}

export default CountryCard;