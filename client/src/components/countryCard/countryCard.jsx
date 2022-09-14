import React from "react";

const CountryCard = (country) => {
    
    console.log("🚀 ~ file: country.jsx ~ line 7 ~ Country ~ country", country)
    return (
        <div>
        <h3>{country.name}</h3>
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

export default CountryCard;