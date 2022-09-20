import React from "react";
import { useEffect } from "react";
import CountryCard from "../countryCard/countryCard";
import styles from './countries.module.css'


const Countries = ({countries, firstCountry, lastCountry}) => {

  useEffect(() => {
  }, [countries, countries.length, firstCountry, lastCountry]);
  
  return (
      <div className={styles.countries}>
        {countries.length?countries.slice(firstCountry,lastCountry).map((country) => (
          <CountryCard country={country}/>
        )): <h1>Loading...</h1>}
      </div>
  );
}

export default Countries