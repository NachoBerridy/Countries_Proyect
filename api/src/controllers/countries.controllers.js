const axios = require('axios');
const { conn } = require('../db.js');
const { Country } = conn.models;

const getCountries = async (req, res) => {
  const apiRequest = await axios.get('https://restcountries.com/v3.1/all');
  let countriesList = []
  await apiRequest.data.forEach(async (country) => {
    let {cca3, name, flags, continents, capital, subregion, area, population } = country;
    if (capital){
      capital = capital[0];
    }else{
      capital = 'No capital';
    
    }
    let newCountry = await Country.create({
      id: cca3,
      name: name.common,
      flag: flags.svg,
      continent: continents[0],
      capital: capital,
      subregion: subregion,
      area: area,
      population: population, 
    });
    /*let newCountry = {
      id: cca3,
      name: name.common,
      flag: flags.svg,
      continent: continents[0],
      capital: capital,
      subregion: subregion,
      area: area,
      population: population, 
    }*/
    //countriesList.push(newCountry);
    //console.log(newCountry.name);
    
  });
  console.log('Despues');
  let list =await Country.findAll()
  res.json(list);
  
}

const getCountriesByName = async (req, res) => {
  const { name } = req.query;
  const countries = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  res.json(countries.data);
}

const getCountriesByCode = async (req, res) => {
  const { code } = req.params;
  const countries = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
  res.json(countries.data);
}

module.exports = {
  getCountries,
  getCountriesByName,
  getCountriesByCode,
};