import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Country = () => {
    const [country, setCountry] = useState([]);
    

    useEffect(() => {
      const fetchCountry = async () => { 
        const { data } = await axios.get('http://localhost:3001/countries/Chile');
        console.log("🚀 ~ file: App.js ~ line 12 ~ fetchCountry ~ data", data)
        setCountry(data[0]);
      }
  
      fetchCountry();
    }, []);
    console.log("🚀 ~ file: country.jsx ~ line 7 ~ Country ~ country", country)
    return (
        <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Continent: {country.continent}</p>
        <img src={country.flag} alt="Country Flag" width="200" />
        </div>
    );
}

/*
- [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
- [ ] Código de país de 3 letras (id)
- [ ] Capital
- [ ] Subregión
- [ ] Área (Mostrarla en km2 o millones de km2)
- [ ] Población
- [ ] Actividades turísticas con toda su información asociada
*/

export default Country;