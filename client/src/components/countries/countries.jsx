import React from "react";
import { useEffect, useState } from "react";
import { getAllCountries } from "../../actions";
import axios from "axios";
import { Connect } from "react-redux";

const Countries = ({ filteredCountries }) => {
    
    //const [countries, setCountries] = useState([]);
    
    //let dispatch = React.useDispatch();
    //const data = dispatch(props.getAllCountries())
    /* useEffect(() => {
      const fetchCountry = async () => { 
        const { data } = await axios.get('http://localhost:3001/countries');
        setCountries(data);
      }
      fetchCountry();
      
      setCountries(data);

    }, []) */

    getAllCountries();

    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {filteredCountries.map((country) => (
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


function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
    };
}

function mapStateToProps(state){
  return {
    countries: state.filteredCountries,
  };
};

export default Connect(mapStateToProps, mapDispatchToProps)(Countries);