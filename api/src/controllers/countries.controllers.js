const axios = require('axios');
const { conn } = require('../db.js');
const { Country } = conn.models;

const getCountries = async (req, res) => {
  try{
    const apiRequest = await axios.get('https://restcountries.com/v3.1/all');
    
    const countries = apiRequest.data.map(c => {
      let {cca3, name, flags, continents, capital = ['No capital'], subregion, area, population } = c

      return {
        id: cca3,
        name: name.common,
        flag: flags.svg,
        continent: continents[0],
        capital: capital[0],
        subregion: subregion,
        area: area,
        population: population, 
      }
    })
    console.log(countries);
    await Country.bulkCreate(countries, {ignoreDuplicates: true});
    res.json(countries);
  }
  catch (error) {
    res.status(500).json(error);
  }



    /* await apiRequest.data.forEach(async (country) => {
      let {cca3, name, flags, continents, capital = ['No capital'], subregion, area, population } = country;
      try{
        let newCountry = await Country.create({
          id: cca3,
          name: name.common,
          flag: flags.svg,
          continent: continents[0],
          capital: capital[0],
          subregion: subregion,
          area: area,
          population: population, 
        })
      }catch(e){}
    }).then(() => {
      let countries = Country.findAll();
      return countries;
    })
  }catch(err){
    return err 
  } */
  
}

const getCountriesByName = async (req, res) => {
  let country = await Country.findAll(
    {
      where: {
        name: req.params.name
      }
    }
  );
  console.log(country.map(c => c.toJSON()));
  res.json(country[1].dataValues);
  
  /*const { name } = req.query;
  const countries = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  res.json(countries.data);*/
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