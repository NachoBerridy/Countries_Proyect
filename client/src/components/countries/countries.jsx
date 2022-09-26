import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CountryCard from "../countryCard/countryCard";
import load from '../../assets/loading.svg'
import styles from './countries.module.css'


const Countries = ({countries, firstCountry, lastCountry}) => {

  const loading = useSelector((state) => state.loading)
  useEffect(() => {
  }, [countries, countries.length, firstCountry, lastCountry, loading]);
  
  return (
    
      <div className={styles.countries}>
        {countries.length?countries.slice(firstCountry,lastCountry).map((country) => (
          <CountryCard country={country}/>
        )): loading? 
        <div className={styles.loading}>
          <img src={load} alt="Loading..." />
        </div>
        :<h1>No countries found</h1>}
      </div>
  );
}

export default Countries